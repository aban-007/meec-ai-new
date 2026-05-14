async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if (userText === "") return;

  chatBox.innerHTML += `
    <div class="message user">
      <b>Kamu:</b> ${userText}
    </div>
  `;

  input.value = "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer API_KEY_KAMU",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await response.json();

  const aiReply = data.choices[0].message.content;

  chatBox.innerHTML += `
    <div class="message ai">
      <b>AI:</b> ${aiReply}
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
}
