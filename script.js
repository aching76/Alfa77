
async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const image = document.getElementById("image");
  image.classList.add("hidden");

  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // token publik demo
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt })
  });

  if (!response.ok) {
    alert("Failed to generate image.");
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  image.src = url;
  image.classList.remove("hidden");
}
