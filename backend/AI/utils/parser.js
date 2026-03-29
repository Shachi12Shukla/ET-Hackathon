export function safeParse(content) {
  try {
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.log("LLM RAW OUTPUT:", content);
    return {
      type: "question",
      updatedProfile: {},
      question: "Let’s continue — can you tell me more?"
    }
  }
}