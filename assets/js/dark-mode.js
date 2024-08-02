const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function setTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = !body.classList.contains('dark-mode');
    setTheme(isDarkMode);
});

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
    setTheme(true);
} else {
    setTheme(false);
}

// Listen for changes in system color scheme
prefersDarkScheme.addListener((e) => {
    if (localStorage.getItem('theme') === null) {
        setTheme(e.matches);
    }
});