export const handleNavClick = (e, targetId) => {
  e.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}