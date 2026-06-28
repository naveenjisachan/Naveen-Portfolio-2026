import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { buildResumeContext, NAVEEN } from "@/lib/naveen-data";

export const runtime = "nodejs";

const EMERGENT_BASE_URL = "https://integrations.emergentagent.com/llm";

// ---------- Mongo (lazy) ----------
let _mongo;
async function getDb() {
  if (!_mongo) {
    _mongo = new MongoClient(process.env.MONGO_URL).connect();
  }
  const client = await _mongo;
  return client.db(process.env.DB_NAME || "naveen_portfolio");
}

// ---------- CORS ----------
function cors(res) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}
export async function OPTIONS() { return cors(new NextResponse(null, { status: 204 })); }

// ---------- GET ----------
export async function GET(_req, ctx) {
  const params = await ctx.params;
  const path = params?.path || [];
  const route = path.join("/");

  if (route === "" || route === "health") {
    return cors(NextResponse.json({ ok: true, name: NAVEEN.name }));
  }
  if (route === "profile") {
    return cors(NextResponse.json({ name: NAVEEN.name, title: NAVEEN.title, email: NAVEEN.email }));
  }
  if (route === "contributions") {
    // Deterministic pseudo-random heatmap (53 weeks x 7 days) seeded by date string
    const today = new Date();
    const cells = [];
    for (let w = 0; w < 53; w++) {
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - ((52 - w) * 7) - (6 - d));
        // Deterministic intensity 0..4 with a weekday bias
        const seed = (date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()) % 97;
        const weekend = d === 0 || d === 6 ? 0.5 : 1;
        const v = Math.min(4, Math.floor((seed % 6) * weekend));
        cells.push({ date: date.toISOString().slice(0, 10), level: v });
      }
    }
    return cors(NextResponse.json({ cells, total: cells.reduce((a, c) => a + c.level * 2, 0) }));
  }
  return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
}

// ---------- LLM call ----------
async function callEmergentLLM(messages) {
  const apiKey = process.env.EMERGENT_LLM_KEY;
  if (!apiKey) throw new Error("Missing EMERGENT_LLM_KEY");

  const candidates = [
    { url: `${EMERGENT_BASE_URL}/v1/chat/completions`, model: "gpt-4o-mini" },
    { url: `${EMERGENT_BASE_URL}/chat/completions`, model: "gpt-4o-mini" },
    { url: `${EMERGENT_BASE_URL}/openai/v1/chat/completions`, model: "gpt-4o-mini" },
  ];

  let lastErr = null;
  for (const c of candidates) {
    try {
      const r = await fetch(c.url, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: c.model, messages, temperature: 0.8, max_tokens: 400 }),
      });
      if (!r.ok) { lastErr = `HTTP ${r.status} from ${c.url}: ${(await r.text()).slice(0, 200)}`; continue; }
      const data = await r.json();
      const content = data?.choices?.[0]?.message?.content?.trim() || data?.choices?.[0]?.text?.trim() || "";
      if (content) return content;
      lastErr = `Empty content from ${c.url}: ${JSON.stringify(data).slice(0, 200)}`;
    } catch (e) { lastErr = `${c.url} -> ${e.message}`; }
  }
  throw new Error(lastErr || "All emergent endpoints failed");
}

// ---------- POST ----------
export async function POST(req, ctx) {
  const params = await ctx.params;
  const path = params?.path || [];
  const route = path.join("/");

  try {
    if (route === "chat") {
      const body = await req.json();
      const userMessage = (body?.message || "").toString().trim();
      const history = Array.isArray(body?.history) ? body.history : [];
      const sessionId = (body?.sessionId || uuidv4()).toString();

      if (!userMessage) {
        return cors(NextResponse.json({ error: "message is required" }, { status: 400 }));
      }

      const messages = [
        { role: "system", content: buildResumeContext() },
        ...history.slice(-8).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content || "").slice(0, 1500),
        })),
        { role: "user", content: userMessage.slice(0, 1500) },
      ];

      const answer = await callEmergentLLM(messages);

      // Best-effort log (don't block the response if Mongo is down)
      try {
        const db = await getDb();
        await db.collection("chat_logs").insertOne({
          id: uuidv4(), sessionId, question: userMessage, answer, createdAt: new Date(),
        });
      } catch (e) { console.error("[chat] mongo log failed:", e?.message); }

      return cors(NextResponse.json({ answer, sessionId }));
    }

    if (route === "contact") {
      const body = await req.json();
      const { name, email, message } = body || {};
      if (!name || !email || !message) {
        return cors(NextResponse.json({ error: "name, email and message are required" }, { status: 400 }));
      }
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        message: String(message).slice(0, 4000),
        createdAt: new Date(),
      };
      try {
        const db = await getDb();
        await db.collection("contact_messages").insertOne(doc);
      } catch (e) { console.error("[contact] mongo failed:", e?.message); }
      return cors(NextResponse.json({ ok: true, id: doc.id }));
    }

    return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  } catch (err) {
    console.error("[api] error:", err);
    return cors(NextResponse.json(
      { error: "Something went sideways. Please try again in a moment!", detail: err?.message },
      { status: 500 }
    ));
  }
}
