export async function generateMockReply(userText) {
const preview = userText.length > 80 ? `${userText.slice(0, 80)}...` : userText;
return (
`[Mock reply] This is a placeholder, not a real AI answer. ` +
`A real language model is connected in Phase 4.\n\n` +
`You said: "${preview}"`
);
}