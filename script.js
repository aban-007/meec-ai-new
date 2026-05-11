const API_KEY = "";

async function kirimPesan() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const pesan = input.value;

    if (pesan.trim() === "") return;

    chatBox.innerHTML += `<p><b>Kamu:</b> ${pesan}</p>`;

    input.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: pesan
                    }
                ]
            })
        });

        const data = await response.json();

        const jawaban = data.choices[0].message.content;

        chatBox.innerHTML += `<p><b>AI:</b> ${jawaban}</p>`;

    } catch (error) {
        chatBox.innerHTML += `<p><b>AI:</b> Error koneksi.</p>`;
    }
}
