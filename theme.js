document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
  
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️ Светлая тема';
    }
  
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeToggle.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
  