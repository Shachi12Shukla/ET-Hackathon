export function safeParse(content) {
  try {
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.log("LLM RAW OUTPUT:", content);
    return { error: "Invalid JSON", raw: content };
  }
}