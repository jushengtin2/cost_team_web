import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 使用 useEffect 來確保 localStorage 只在客戶端讀取
  useEffect(() => {
    const darkModeFromStorage = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModeFromStorage);
    
    // 初始化時應用 dark-mode 樣式
    const allElements = document.querySelectorAll('body, body *');
    allElements.forEach((element) => {
      element.classList.toggle('dark-mode', darkModeFromStorage);
    });
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode); // 將新狀態保存到 localStorage

    // 切換 dark-mode 樣式
    const allElements = document.querySelectorAll('body, body *');
    allElements.forEach((element) => {
      element.classList.toggle('dark-mode', newMode);
    });
  };

  return { isDarkMode, toggleDarkMode };
}
