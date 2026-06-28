import { NextResponse } from "next/server";
import { buildResumeContext, NAVEEN } from "@/lib/naveen-data";

export const runtime = "nodejs";

const EMERGENT_BASE_URL = "https://integrations.emergentagent.com/llm";

function cors(res) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

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
  return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
}

async function callEmergentLLM(messages) {
  const apiKey = process.env.EMERGENT_LLM_KEY;
  if (!apiKey) throw new Error("Missing EMERGENT_LLM_KEY");

  // Try multiple known emergent gateway paths until one works.
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
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: c.model,
          messages,
          temperature: 0.7,
          max_tokens: 400,
        }),
      });
      if (!r.ok) {
        const t = await r.text();
        lastErr = `HTTP ${r.status} from ${c.url}: ${t.slice(0, 200)}`;
        continue;
      }
      const data = await r.json();
      const content =
        data?.choices?.[0]?.message?.content?.trim() ||
        data?.choices?.[0]?.text?.trim() ||
        "";
      if (content) return content;
      lastErr = `Empty content from ${c.url}: ${JSON.stringify(data).slice(0, 200)}`;
    } catch (e) {
      lastErr = `${c.url} -> ${e.message}`;
    }
  }
  throw new Error(lastErr || "All emergent endpoints failed");
}

export async function POST(req, ctx) {
  const params = await ctx.params;
  const path = params?.path || [];
  const route = path.join("/");

  try {
    if (route === "chat") {
      const body = await req.json();
      const userMessage = (body?.message || "").toString().trim();
      const history = Array.isArray(body?.history) ? body.history : [];

      if (!userMessage) {
        return cors(NextResponse.json({ error: "message is required" }, { status: 400 }));
      }

      const systemPrompt = buildResumeContext();
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.slice(-8).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content || "").slice(0, 1500),
        })),
        { role: "user", content: userMessage.slice(0, 1500) },
      ];

      const answer = await callEmergentLLM(messages);
      return cors(NextResponse.json({ answer }));
    }

    return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  } catch (err) {
    console.error("[api/chat] error:", err);
    return cors(
      NextResponse.json(
        { error: "Sorry, Naveen's Buddy is taking a quick break. Try again in a moment!", detail: err?.message },
        { status: 500 }
      )
    );
  }
}
