import { useEffect } from 'react';

const ThemeToggle = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      Zmień motyw
    </button>
  );
};

export default ThemeToggle;
