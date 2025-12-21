const getInitialTheme = () => {
  const saved = localStorage.getItem("color-theme");

  if (saved === "dark") return "dark";
  if (saved === "light") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialTheme = getInitialTheme();

if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
