import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useInitTheme from "@/hooks/useInitTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useInitTheme();

  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#intro", label: "فيديو تعريفي" },
    { href: "#about", label: "عن التطبيق" },
    { href: "#features", label: "المميزات" },
    { href: "#for-who", label: "لمن مسار؟" },
    { href: "#be-rep", label: "كن كمندوب" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <header className="w-full border-b border-border bg-background dark:bg-background-dark fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between flex-row-reverse">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#home">
              <img
                src="/masar-logo.png"
                alt="masar-logo"
                className="h-20 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-row-reverse items-center gap-8 text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark">
            <ul className="flex flex-row-reverse gap-8 text-right">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition dark:hover:text-primary-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Theme Switch Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="relative w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300 bg-gray-300 dark:bg-gray-700"
            >
              <span
                className={`
                  absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-500
                  flex items-center justify-center
                  ${theme === "dark" ? "translate-x-8 rotate-0" : "translate-x-0 rotate-0"}
                `}
              >
                {theme === "dark" ? (
                  <Moon size={20} className="text-gray-800" />
                ) : (
                  <Sun size={20} className="text-yellow-400" />
                )}
              </span>
            </Switch>

            <Button className="h-10 px-6 text-sm dark:bg-primary-dark dark:text-background-dark dark:hover:bg-primary-light dark:hover:text-background">
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center transition-all duration-300"
            >
              <span
                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                } flex items-center justify-center text-yellow-500`}
              >
                {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
              </span>
            </Switch>

            <button
              onClick={() => setIsOpen(true)}
              className="text-muted-foreground dark:text-muted-foreground-dark"
            >
              <Menu size={28} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-3/4 max-w-xs p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 left-3 text-gray-700 dark:text-gray-200"
            >
              <X size={24} />
            </button>

            {/* Links */}
            <ul className="flex flex-col gap-4 text-center text-gray-800 dark:text-gray-200">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary dark:hover:text-primary-dark transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <Button
                  className="w-full h-10"
                  onClick={() => setIsOpen(false)}
                >
                  تسجيل الدخول
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;