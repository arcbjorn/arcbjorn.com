// Early theme application to avoid FOUC
// Check localStorage first
(function () {
  try {
    var storedTheme = localStorage.getItem('theme');
    var root = document.documentElement;

    function applyDarkTheme() {
      document.body.classList.add('dark');
      root.style.setProperty('--bg', '#1b1d1e');
      root.style.setProperty('--color', '#dddddd');
    }

    function applyLightTheme() {
      document.body.classList.remove('dark');
      root.style.setProperty('--bg', '#f9f5ef');
      root.style.setProperty('--color', '#1b1d1e');
    }

    if (storedTheme === 'dark') {
      applyDarkTheme();
    } else if (storedTheme === 'light') {
      applyLightTheme();
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyDarkTheme();
    } else {
      var hour = new Date().getHours();
      if (hour <= 6 || hour >= 20) {
        applyDarkTheme();
      } else {
        applyLightTheme();
      }
    }
  } catch (_) {
    // no-op
  }
})();

