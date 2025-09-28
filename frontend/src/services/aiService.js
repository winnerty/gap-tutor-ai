export async function generateQuizOnServer(subject) {
  const res = await fetch("http://localhost:8000/ai/generate_quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "AI generation failed");
  }
  return res.json();
}