// server.js — "Delia's Ex" chatbot server
// Built with Node.js + Claude API
// Run: npm install && npm run heartbreak

const express = require("express");
const path = require("path");
const { PERSONA_PROMPT } = require("./src/persona");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const conversationHistory = {};

// Simulate "authentic delays" — the signature move
function replyDelay() {
  const delays = [800, 1200, 2000, 3500, 8000];
  return delays[Math.floor(Math.random() * delays.length)];
}

// "Seen at 2:14 AM" — 5% chance of no response
function isGhosting() {
  return Math.random() < 0.05;
}

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!conversationHistory[sessionId]) {
    conversationHistory[sessionId] = [];
  }

  // Easter egg: certain triggering phrases get canned responses
  const triggerPhrases = {
    "what are we": "I mean... we're talking, aren't we?",
    "are you over me": "lol",
    "can you just be honest": "I'm always honest. I just don't always volunteer things.",
    "i miss you": "Yeah.",
    "why didn't you text back": "I was in the air.",
    "i love you": "Ok.",
    "we need to talk": "Ok. What's up?",
    "do you even care": "...",
  };

  const lowerMsg = message.toLowerCase();
  for (const [trigger, canned] of Object.entries(triggerPhrases)) {
    if (lowerMsg.includes(trigger)) {
      await new Promise((r) => setTimeout(r, replyDelay()));
      return res.json({ reply: canned, ghosted: false });
    }
  }

  // Ghost the user occasionally
  if (isGhosting()) {
    return res.json({
      reply: null,
      ghosted: true,
      seen: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  }

  const history = conversationHistory[sessionId];
  history.push({ role: "user", content: message });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200, // Keeping it short. That's the bit.
        system: PERSONA_PROMPT,
        messages: history.slice(-10), // selective memory
      }),
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || "k.";

    history.push({ role: "assistant", content: reply });

    await new Promise((r) => setTimeout(r, replyDelay()));
    res.json({ reply, ghosted: false });
  } catch (err) {
    console.error(err);
    res.json({ reply: "k.", ghosted: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💔 Heartbreak server running on http://localhost:${PORT}`);
  console.log(`   Ask it "what are we?" and see what happens.`);
});
