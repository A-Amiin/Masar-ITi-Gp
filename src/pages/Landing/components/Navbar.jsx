import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full border-b border-border bg-background dark:bg-background-dark">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between flex-row-reverse">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/masar-logo.png"
              alt="masar-logo"
              className="h-20 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex flex-row-reverse items-center gap-8 text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark">
            <ul className="flex flex-row-reverse gap-8 text-right">
              <li>
                <a href="#home" className="hover:text-primary transition dark:hover:text-primary-dark">الرئيسية</a>
              </li>
              <li>
                <a href="#intro" className="hover:text-primary transition dark:hover:text-primary-dark">فيديو تعريفي</a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition dark:hover:text-primary-dark">عن التطبيق</a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition dark:hover:text-primary-dark">المميزات</a>
              </li>
              <li>
                <a href="#for-who" className="hover:text-primary transition dark:hover:text-primary-dark">لمن مسار؟</a>
              </li>
              <li>
                <a href="#be-rep" className="hover:text-primary transition dark:hover:text-primary-dark">كن كمندوب</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition dark:hover:text-primary-dark">تواصل معنا</a>
              </li>
            </ul>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Button className="h-10 px-6 text-sm dark:bg-primary-dark dark:text-background-dark dark:hover:bg-primary-light dark:hover:text-background">
              تسجيل الدخول
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;