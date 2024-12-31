const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const mainElement = document.querySelector("main");
const headerTitle = document.querySelector("header h2"); 
const headerRight = document.querySelector(".header-right");

const themes = {
  calmNight: "linear-gradient(45deg, hsl(240deg 100% 20%) 6%, hsl(281deg 100% 21%) 21%, hsl(304deg 100% 23%) 32%, hsl(319deg 100% 30%) 41%, hsl(329deg 100% 36%) 49%, hsl(336deg 100% 41%) 57%, hsl(346deg 83% 51%) 64%, hsl(3deg 95% 61%) 71%, hsl(17deg 100% 59%) 77%, hsl(30deg 100% 55%) 83%, hsl(40deg 100% 50%) 89%, hsl(48deg 100% 50%) 95%, hsl(55deg 100% 50%) 100%)",
  mutedOcean: "linear-gradient(320deg, hsl(141deg 82% 25%) 0%, hsl(114deg 48% 30%) 4%, hsl(95deg 53% 28%) 8%, hsl(81deg 55% 27%) 14%, hsl(70deg 55% 26%) 23%, hsl(60deg 52% 26%) 37%, hsl(51deg 50% 28%) 52%, hsl(43deg 47% 30%) 63%, hsl(37deg 44% 32%) 71%, hsl(31deg 39% 34%) 77%, hsl(26deg 35% 36%) 82%, hsl(21deg 30% 37%) 87%, hsl(16deg 26% 38%) 91%, hsl(11deg 21% 38%) 94%, hsl(6deg 17% 39%) 97%, hsl(0deg 13% 39%) 100%)",
  calmSunset: "linear-gradient(-110deg, #581707, #445f64, #4d7e7e)",
  darkForest: "linear-gradient(150deg, hsl(0deg 89% 50%) 0%, hsl(16deg 100% 45%) 0%, hsl(24deg 100% 42%) 2%, hsl(32deg 100% 39%) 6%, hsl(39deg 100% 36%) 13%, hsl(48deg 100% 33%) 21%, hsl(58deg 100% 29%) 32%, hsl(69deg 100% 30%) 45%, hsl(79deg 100% 31%) 59%, hsl(97deg 62% 40%) 75%, hsl(123deg 47% 46%) 89%, hsl(149deg 84% 38%) 100%)",
  duskyLavender: "linear-gradient(45deg, hsl(240deg 100% 20%) 0%, hsl(256deg 83% 21%) 8%, hsl(263deg 64% 22%) 14%, hsl(270deg 48% 22%) 19%, hsl(281deg 34% 23%) 23%, hsl(300deg 21% 24%) 28%, hsl(334deg 16% 27%) 31%, hsl(15deg 17% 28%) 35%, hsl(38deg 25% 28%) 38%, hsl(50deg 35% 27%) 41%, hsl(53deg 40% 25%) 45%, hsl(51deg 39% 23%) 48%, hsl(49deg 38% 21%) 51%, hsl(46deg 38% 20%) 55%, hsl(42deg 37% 18%) 60%, hsl(38deg 36% 16%) 65%, hsl(32deg 34% 14%) 71%, hsl(24deg 33% 12%) 78%, hsl(15deg 33% 10%) 87%, hsl(0deg 38% 8%) 100%)",
  mistyDawn: "linear-gradient(-25deg, #153049, #5188aa, #133c3f)",
  urbanSlate: "linear-gradient(-75deg, #1b2229, #858585, #1b2629)",
  foggyRiver: "linear-gradient(340deg, hsl(250deg 98% 18%) 0%, hsl(265deg 100% 18%) 5%, hsl(275deg 100% 18%) 10%, hsl(284deg 100% 18%) 14%, hsl(293deg 100% 18%) 19%, hsl(302deg 100% 18%) 24%, hsl(309deg 100% 20%) 29%, hsl(315deg 100% 22%) 33%, hsl(320deg 100% 24%) 38%, hsl(324deg 100% 26%) 43%, hsl(328deg 100% 28%) 48%, hsl(332deg 100% 30%) 52%, hsl(335deg 100% 31%) 57%, hsl(338deg 100% 32%) 62%, hsl(340deg 100% 34%) 67%, hsl(343deg 100% 35%) 71%, hsl(345deg 100% 36%) 76%, hsl(347deg 100% 37%) 81%, hsl(350deg 100% 38%) 86%, hsl(352deg 100% 38%) 90%, hsl(357deg 94% 40%) 95%, hsl(9deg 99% 39%) 100%)",
  deepStorm: "linear-gradient(-25deg, #0f3646, #4d0707, #7d868d)",
  eclipse: "linear-gradient(-9deg, #000000, #000000)"
};

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
  menuToggle.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const themeOptions = document.querySelectorAll(".theme-option");
  const savedTheme = localStorage.getItem("selectedTheme");
  
  menuToggle.addEventListener("click", () => {
    if (mainElement) {
      mainElement.classList.toggle("active");
    }
    if (headerTitle) {
      headerTitle.style.display = headerTitle.style.display === "none" ? "block" : "none";
    }
    headerRight.classList.toggle("align-right");
  });

  if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme);
    markSelectedTheme(savedTheme);
  }

  themeOptions.forEach(option => {
    option.addEventListener("click", () => {
      const selectedTheme = option.dataset.theme;
      setTheme(selectedTheme);
      markSelectedTheme(selectedTheme);
    });
  });

  function setTheme(theme) {
    if (themes[theme]) {
      document.documentElement.style.setProperty("--background-color", themes[theme]);
      localStorage.setItem("selectedTheme", theme);

      if (theme === 'eclipse' || theme === 'darkForest' || theme === 'deepStorm') {
        document.body.classList.add("black-and-white");
      } else {
        document.body.classList.remove("black-and-white");
      }
    }
  }

  function markSelectedTheme(theme) {
    themeOptions.forEach(option => {
      option.classList.remove("selected");
      if (option.dataset.theme === theme) {
        option.classList.add("selected");
      }
    });
  }
});

