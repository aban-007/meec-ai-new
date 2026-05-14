async function kirimPesan() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value;

  chat.innerHTML += `<p><b>Kamu:</b> ${pesan}</p>`;

  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer MASUKKAN_API_KEY_DISINI"
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

    console.log(data);

    if (data.choices && data.choices.length > 0) {
      const jawaban = data.choices[0].message.content;

      chat.innerHTML += `<p><b>MEEC AI:</b> ${jawaban}</p>`;
    } else {
      chat.innerHTML += `<p><b>MEEC AI:</b> Error API</p>`;
    }

  } catch (error) {
    console.log(error);

    chat.innerHTML += `<p><b>MEEC AI:</b> Gagal konek</p>`;
  }
}
