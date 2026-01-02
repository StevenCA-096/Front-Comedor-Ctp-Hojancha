// src/components/ThemeToggle.tsx
import { IconButton } from '@mui/material';
import { useState } from 'react';
import useThemeStore from '@/stores/theme/themeStore';
import { IconMoon, IconSun } from '@tabler/icons-react';

function ThemeToggle() {
  const { mode, setMode } = useThemeStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setTimeout(() => setIsAnimating(false), 600); 
  };

  return (
    <IconButton
      onClick={handleClick}
      color="inherit"
      sx={{
        transition: 'transform 0.6s ease-in-out',
        transform: isAnimating ? 'scale(1.2) rotate(360deg)' : 'scale(1) rotate(0deg)',
      }}
    >
      {mode === 'dark' ? <IconMoon /> : <IconSun />}
    </IconButton>
  );
}

export default ThemeToggle;