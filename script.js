async function kirimPesan() {
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const pesan = input.value;

    if (pesan.trim() === "") return;

    chat.innerHTML += `<p><b>Kamu:</b> ${pesan}</p>`;

    input.value = "";
  
  const apiKey = "sk-xxxxxxxxxxxxxxxx";

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
