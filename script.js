const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value;

    if (!message) return;

    chatBox.innerHTML += `<p><b>Kamu:</b> ${message}</p>`;

    userInput.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message
            }),
        });

        const data = await response.json();

        if (data.reply) {
            chatBox.innerHTML += `<p><b>MEEC AI:</b> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p><b>MEEC AI:</b> Error</p>`;
        }

    } catch (error) {
        chatBox.innerHTML += `<p><b>MEEC AI:</b> Failed connect</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
