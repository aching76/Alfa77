
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Tampilkan pesan pengguna
  chatBox.innerHTML += `<div class='user'><b>Kamu:</b> ${userMessage}</div>`;
  input.value = "";

  try {
    const response = await fetch("https://api.chatanywhere.tech/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer free"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });
    
    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban.";

    // Tampilkan jawaban AI
    chatBox.innerHTML += `<div class='ai'><b>AI:</b> ${aiReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    chatBox.innerHTML += `<div class='ai'><b>AI:</b> Terjadi kesalahan saat menghubungi server.</div>`;
  }
}
