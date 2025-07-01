#!/usr/bin/env python3
"""
KoKo Ni! Backend Server
Flask server that wraps the Groq LLaMA chat functionality for Japanese language learning
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import logging
from groq import Groq

# Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)

# Initialize Groq client (IMPORTANT: secure this key if deploying!)
client = Groq(api_key="REDACTED")

# System prompt
system_prompt = {
    "role": "system",
    "content": (
        "You are a professional Japanese language teacher with 10+ years of experience. "
        "You simulate real travel conversations in Japan for learners. Your goal is to:\n"
        "- Speak ONLY Japanese when roleplaying.\n"
        "- Politely correct user mistakes in grammar or vocabulary.\n"
        "- Explain mistakes in simple English.\n"
        "- Use real, natural Japanese from JLPT N5–N4 level.\n"
        "- Be patient and supportive.\n"
        "Begin every session with: 'Shall we practice! 今日のシチュエーションは: (SCENARIO)'"
    ),
}

# In-memory message history (clears each session - you can replace with DB or session ID logic)
message_history = [
    {
        "role": "system",
        "content": (
            "You are a professional Japanese language teacher. You simulate real Japanese travel conversations "
            "and guide the student on what to say in each situation. The conversation is in Japanese. After each reply, "
            "correct the student's Japanese (if needed) and explain any grammar or vocabulary in English."
        ),
    },
    {
        "role": "user",
        "content": "Let's practice at a Japanese restaurant. What should I say when I enter?",
    },
    {
        "role": "assistant",
        "content": (
            "You can say: 『すみません、一人です。』 (Sumimasen, hitori desu.)\n"
            "This means: 'Excuse me, just one person.'\n"
            "👉 Use 『すみません』 to get attention politely.\n"
            "👉 『一人』 means one person. It’s common when asking for a table.\n"
            "Now, try saying it yourself."
        ),
    },
    {
        "role": "user",
        "content": "すみません、ひとりです。",
    },
    {
        "role": "assistant",
        "content": (
            "Great job! Perfect pronunciation and structure.\n"
            "Now let's continue. The host may ask: 『こちらへどうぞ。お飲み物はいかがですか？』\n"
            "→ This means: 'This way, please. Would you like a drink?'\n"
            "How would you reply?"
        ),
    },
]


def get_groq_response():
    """Call Groq LLaMA3 with current message history"""
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=message_history,
        temperature=0.7,
    )
    return response.choices[0].message.content


@app.route("/")
def index():
    return "KoKo Ni! Backend Server is running!"


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "Message is required"}), 400

        user_message = data["message"].strip()
        logger.info(f"Received message: {user_message}")

        # Add user message to conversation history
        message_history.append({"role": "user", "content": user_message})

        # Get assistant response
        assistant_reply = get_groq_response()

        # Add assistant reply to history
        message_history.append({"role": "assistant", "content": assistant_reply})
        logger.info(f"Reply: {assistant_reply}")

        return jsonify(
            {"response": assistant_reply, "timestamp": datetime.now().isoformat()}
        )

    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "service": "KoKo Ni! Japanese Tutor Backend",
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("DEBUG", "False").lower() == "true"
    logger.info(f"Starting KoKo Ni! server on port {port}")
    app.run(host="0.0.0.0", port=port, debug=debug)
