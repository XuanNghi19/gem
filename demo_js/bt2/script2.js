
document.getElementById("click2").addEventListener("click", () => {
  const text = document.getElementById("text").value;
  const p = document.createElement("p");
  p.textContent = text;
  document.getElementById("text").value = "";
  document.getElementById("content").append(p);
});