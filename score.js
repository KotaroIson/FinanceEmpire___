// score.js

function getScore() {
    return parseInt(localStorage.getItem("score") || "0");
  }
  
  function setScore(value) {
    localStorage.setItem("score", value);
    updateProgressDisplay();
  }
  
  function addPoints(points) {
    const current = getScore();
    setScore(current + points);
  }
  
  function getLevel(score) {
    if (score >= 150) return "⭐ Эксперт";
    if (score >= 100) return "🟣 Продвинутый";
    if (score >= 50) return "🔵 Ученик";
    return "🟢 Новичок";
  }
  
  function updateProgressDisplay() {
    const score = getScore();
    const level = getLevel(score);
    const progressBar = document.getElementById("score-progress");
    const label = document.getElementById("score-label");
    if (progressBar) {
      progressBar.value = score;
      progressBar.max = 200; 
    }
    if (label) {
      label.innerText = `Уровень: ${level} | Баллы: ${score}`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", updateProgressDisplay);
  