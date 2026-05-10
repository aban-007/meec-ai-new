const API_KEY = prompt("Masukkan OpenRouter API Key:");

async function kirimPesan() {
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const pesan = input.value;

    if (!pesan) return;

    chat.innerHTML += `<p><b>Kamu:</b> ${pesan}</p>`;

    input.value = "";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
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

        chat.innerHTML += `<p><b>AI:</b> ${jawaban}</p>`;

    } catch (error) {
        chat.innerHTML += `<p><b>AI:</b> Error koneksi API.</p>`;
    }
}
