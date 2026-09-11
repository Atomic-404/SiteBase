class StyleIcon extends HTMLElement {
    connectedCallback() {
        // 1. Get attributes from the HTML tag, or use defaults
        const color = this.getAttribute('color') || 'var(--primary)';
        const size = this.getAttribute('size') || '1em'; // Default to relative size
        const dark = 'var(--dark)';

        this.innerHTML = `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display: block;">
        <circle cx="50" cy="50" r="50" fill="${color}" />
        <line x1="0" y1="50" x2="100" y2="50" style="stroke:${dark};stroke-width:5" />
        <line x1="50" y1="0" x2="50" y2="100" style="stroke:${dark};stroke-width:5" />
        <line x1="0" y1="0" x2="100" y2="100" style="stroke:${dark};stroke-width:5" />
        <line x1="100" y1="0" x2="0" y2="100" style="stroke:${dark};stroke-width:5" />
        <circle cx="50" cy="50" r="35" fill="${dark}" />

        <polygon points="50,50 50,0 100,0 100,50" style="fill:${dark};" />
        <polygon points="45,52 48,55 60,55 100,15 100,3 97,0 85,0 45,40" style="fill:${color};" />
        <polygon points="48,50 50,52 59,52 85,26 75,14 48,41" style="fill:${dark};" />
        <polygon points="66,2 66,13 87,34 98,34 98,23 77,2" style="fill:${color};" />
        </svg>`;
    }
}

class MenuIcon extends HTMLElement {
    connectedCallback() {
        // 1. Get attributes from the HTML tag, or use defaults
        const color = this.getAttribute('color') || 'var(--primary)'; // Default to relative size/colors
        const secondary = this.getAttribute('secondary') || 'var(--light)';
        const shadow = this.getAttribute('shadow') || 'var(--dark)';
        const size = this.getAttribute('size') || '1em';

        this.innerHTML = `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display: block;">

        <rect x="3" y="3" width="90" height="16" fill="var(--dark)" stroke="${color}" stroke-width="6" style="filter: drop-shadow(4px 4px 0 ${color});"/>

        <rect x="3" y="40" width="90" height="16" fill="var(--dark)" stroke="${color}" stroke-width="6" style="filter: drop-shadow(4px 4px 0 ${color});"/>

        <rect x="3" y="77" width="70" height="16" fill="var(--dark)" stroke="${secondary}" stroke-width="6" style="filter: drop-shadow(4px 4px 0 ${secondary});" />

        </svg>`;
    }
}

customElements.define('style-icon', StyleIcon);
customElements.define('menu-icon', MenuIcon);

//Theme Engine card code.
// 1. Single source for colors
const themes = {
    default: { name: 'Red & Red', primary: '#cf3624', secondary: '#df8266', extra: '#ffeeea', light: '#f7eef4'},
        yellow:   { name: "Orange & Yellow",  primary: '#ff5722', secondary: '#ffc107', extra: '#fff8e7', light: '#f4f1eb'},
        purple:   { name: 'Purple & Green',  primary: '#7209b7', secondary: '#6ec900', extra: '#f4fff0', light: '#f4f4f8'},
        pink:  { name: 'Pink & Blue', primary: '#ff3366', secondary: '#00f0ff', extra: '#e8f9ff', light: '#f5f0f6'}
};

// 2. Function to build buttons dynamically from JS object
function renderThemePicker() {
    const container = document.getElementById('palette-options'); //checks for a 'palette-options' class and if it does not exits quits the function.
    if (!container) return;

    container.innerHTML = ''; // Clear container

    Object.entries(themes).forEach(([key, theme]) => {
        const btn = document.createElement('button');
        btn.title = theme.name; // Tooltip on hover

        // Base button styling
        btn.style.width = '1.5rem';
        btn.style.height = '1.5rem';
        btn.style.cursor = 'pointer';

        // Dynamic background styling directly pulling JS values:
        // Creates a cool split preview showing both Primary & Secondary colors!
        btn.style.background = `linear-gradient(135deg, ${theme.primary} 50%, ${theme.secondary} 50%)`;

        // Click handler
        btn.addEventListener('click', () => setTheme(key));

        container.appendChild(btn);
    });
}

// 3. Apply theme variables to root
function setTheme(themeKey) {
    const theme = themes[themeKey];
    if (!theme) return;

    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--extra', theme.extra);
    document.documentElement.style.setProperty('--light', theme.light);

    localStorage.setItem('ridge_theme', themeKey);
}

// 4. Run on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderThemePicker();

    // Restore saved theme if available
    const savedTheme = localStorage.getItem('ridge_theme');
    if (savedTheme && themes[savedTheme]) {
        setTheme(savedTheme);
    }
});
