import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Default to dark theme (cyberpunk style)
    const initialDark = stored ? stored === 'dark' : true;
    setIsDark(initialDark);
    document.documentElement.classList.toggle('light', !initialDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('light', !next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="h-8 w-8"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}


