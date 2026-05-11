function kirimPesan() {

  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value;

  if (pesan.trim() === "") {
    return;
  }

  chat.innerHTML += `
    <div class="user">
      <b>Anda:</b> ${pesan}
    </div>
  `;

  setTimeout(() => {

    chat.innerHTML += `
      <div class="ai">
        <b>MEEC AI:</b> Halo, saya sedang aktif. Pesan Anda: ${pesan}
      </div>
    `;

  }, 500);

  input.value = "";
}
