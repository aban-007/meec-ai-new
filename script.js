const apiKey = "PASTE_API_KEY_OPENAI_DI_SINI";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const userMessage = input.value;

    if (!userMessage) return;

    chatBox.innerHTML += `<p><b>Kamu:</b> ${userMessage}</p>`;

    input.value = "";

    try {
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
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.error) {
            chatBox.innerHTML += `<p style="color:red;"><b>Error:</b> ${data.error.message}</p>`;
            return;
        }

        const botReply = data.choices[0].message.content;

        chatBox.innerHTML += `<p><b>MEEC AI:</b> ${botReply}</p>`;

    } catch (error) {
        chatBox.innerHTML += `<p style="color:red;">Gagal terhubung API</p>`;
        console.error(error);
    }
}
