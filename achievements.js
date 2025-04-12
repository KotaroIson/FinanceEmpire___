const achievements = {
    'first_test': { name: 'Первый шаг', icon: '👣', unlocked: false },
    'score_100': { name: 'Финансовый герой', icon: '🏅', unlocked: false },
    'simulator_3': { name: 'Мастер решений', icon: '🧠', unlocked: false },
    'read_article': { name: 'Исследователь знаний', icon: '📘', unlocked: false },
    'challenge_done': { name: 'Челленджер', icon: '🔥', unlocked: false }
  };
  
  function loadAchievements() {
    const saved = JSON.parse(localStorage.getItem('achievements') || '{}');
    for (const key in achievements) {
      if (saved[key]) {
        achievements[key].unlocked = true;
      }
    }
    updateAchievementsDisplay();
  }
  
  function unlockAchievement(key) {
    if (achievements[key] && !achievements[key].unlocked) {
      achievements[key].unlocked = true;
      alert(`🏆 Новое достижение: ${achievements[key].name}!`);
      localStorage.setItem('achievements', JSON.stringify(achievements));
      updateAchievementsDisplay();
    }
  }
  
  function updateAchievementsDisplay() {
    const container = document.getElementById('achievements-list');
    if (!container) return;
    container.innerHTML = '';
    for (const key in achievements) {
      const { name, icon, unlocked } = achievements[key];
      const item = document.createElement('div');
      item.style.marginBottom = '0.5rem';
      item.innerHTML = unlocked ? `${icon} <b>${name}</b>` : `🔒 ${name}`;
      container.appendChild(item);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadAchievements);
  