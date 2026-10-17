export type AiStatus = { configured: boolean; model: string }
export type AiResult = { content: string; model: string; usage: unknown }

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string
  }
  if (!response.ok)
    throw new Error(data.error || `AI request failed (${response.status}).`)
  return data
}

export async function getAiStatus(): Promise<AiStatus> {
  return readJson<AiStatus>(await fetch("/api/ai/status"))
}

async function generate(
  task: "explain" | "generate-test",
  context: unknown,
): Promise<AiResult> {
  const response = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, context }),
  })
  return readJson<AiResult>(response)
}

export function explainWithGroq(context: unknown): Promise<AiResult> {
  return generate("explain", context)
}

export function generateTestWithGroq(context: unknown): Promise<AiResult> {
  return generate("generate-test", context)
}
