// ThemeToggle.jsx
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
    setIsDark(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
    </div>
  );
}
