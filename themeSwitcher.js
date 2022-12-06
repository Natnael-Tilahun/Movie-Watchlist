const lightModeIcon = document.getElementById("light-mode-icon");
const nightModeIcon = document.getElementById("night-mode-icon");

// theme checker
function checkTheme() {
  // Whenever the user explicitly chooses light mode
  // localStorage.theme = "light";

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    nightModeIcon.classList.remove("hidden");
    lightModeIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    lightModeIcon.classList.remove("hidden");
    nightModeIcon.classList.add("hidden");
  }
}

// theme toogle btn handler
function toogleTheme() {
  if (localStorage.theme === "light") {
    lightModeIcon.classList.remove("hidden");
    nightModeIcon.classList.add("hidden");
    localStorage.theme = "dark";
  } else {
    nightModeIcon.classList.remove("hidden");
    lightModeIcon.classList.add("hidden");
    localStorage.theme = "light";
  }
  checkTheme();
}

lightModeIcon.addEventListener("click", toogleTheme);
nightModeIcon.addEventListener("click", toogleTheme);

export { checkTheme, toogleTheme };
