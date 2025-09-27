export async function generateQuizOnServer(subject, nQuestions = 3) {
  const res = await fetch("http://localhost:8000/ai/generate_quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, n_questions: nQuestions }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "AI generation failed");
  }
  return res.json();
}