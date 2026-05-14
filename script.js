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

    const aiReply = data.choices[0].message.content;

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
