import { useEffect } from "react";
import useThemeStore from "@/store/themeStore";

const useInitTheme = () => {
  const {theme, toggleTheme} = useThemeStore((state) => state);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return {theme,toggleTheme};
};

export default useInitTheme;