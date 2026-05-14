async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if (userText === "") return;

  // Tampilkan pesan user
  chatBox.innerHTML += `
    <div class="message user">
      <b>Kamu:</b> ${userText}
    </div>
  `;

  // Kosongkan input
  input.value = "";

  // Tampilkan loading
  chatBox.innerHTML += `
    <div class="message ai" id="loading">
      <b>AI:</b> Sedang berpikir...
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    // GANTI API KEY DI BAWAH
    const apiKey = "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";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },

      body: JSON.stringify({
        model: "gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: "Kamu adalah MEEC AI, asisten pintar."
          },
          {
            role: "user",
            content: userText
          }
        ]

      })

    });

    const data = await response.json();

    // Hapus loading
    document.getElementById("loading").remove();

    // Ambil jawaban AI
    const aiReply = data.choices[0].message.content;

    // Tampilkan jawaban
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
