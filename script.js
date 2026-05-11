function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if (userText === "") return;

  chatBox.innerHTML += `
    <div class="message user">
      <b>Kamu:</b> ${userText}
    </div>
  `;

  let aiReply = "Maaf, saya masih AI sederhana.";

  if (userText.toLowerCase().includes("halo")) {
    aiReply = "Halo juga!";
  }

  if (userText.toLowerCase().includes("nama")) {
    aiReply = "Nama saya MEEC AI.";
  }

  chatBox.innerHTML += `
    <div class="message ai">
      <b>AI:</b> ${aiReply}
    </div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
