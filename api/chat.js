# MEEC AI — FILE FINAL SIAP COPY PASTE

Kerjakan pelan-pelan.

Anda hanya perlu:

1. Copy
2. Paste
3. Commit changes

---

# FILE 1 — script.js

Buka file `script.js`

Hapus SEMUA isi file.

Paste semua kode di bawah ini:

```javascript
async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if (userText === "") return;

  // Show user message
  chatBox.innerHTML += `
    <div class="message user">
      <b>Kamu:</b> ${userText}
    </div>
  `;

  input.value = "";

  // Loading message
  chatBox.innerHTML += `
    <div class="message ai" id="loading">
      <b>AI:</b> Sedang berpikir...
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userText
      })
    });

    const data = await response.json();

    // Remove loading
    document.getElementById("loading").remove();

    const aiReply = data.reply;

    // Show AI message
    chatBox.innerHTML += `
      <div class="message ai">
        <b>AI:</b> ${aiReply}
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {

    document.getElementById("loading").remove();

    chatBox.innerHTML += `
      <div class="message ai">
        <b>AI:</b> Error koneksi API.
      </div>
    `;

    console.log(error);

  }
}
```

Lalu klik:

`Commit changes`

---

# FILE 2 — api/chat.js

Buka file:

`api/chat.js`

Hapus SEMUA isi file.

Paste semua kode di bawah ini:

```javascript
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "API connection error"
    });
  }
}
```

Lalu klik:

`Commit changes`

---

# LANGKAH TERAKHIR

1. Tunggu 1–2 menit
2. Buka website Vercel
3. Ketik:

```text
hello
```

AI seharusnya sudah membalas.
