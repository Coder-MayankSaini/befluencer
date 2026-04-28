
const fs = require('fs');
const filepath = 'e:/befluencer-bee/frontend/src/pages/InfluencerDashboard.jsx';
let code = fs.readFileSync(filepath, 'utf8');

code = code.replace(/import useThemeMode from '\.\.\/hooks\/useThemeMode';\n/g, '');
code = code.replace(/const \{ isDarkMode, toggleTheme \} = useThemeMode\(\);\n/g, '');
code = code.replace(/const theme = isDarkMode \? themeClasses\.dark : themeClasses\.light;/g, '');
code = code.replace(/const themeClasses = \{[\s\S]*?\};\n\n/g, '');

code = code.replace(/\$\{theme\.page\}/g, 'bg-white text-slate-900');
code = code.replace(/\$\{theme\.shell\}/g, 'bg-slate-50 border-slate-200');
code = code.replace(/\$\{theme\.card\}/g, 'bg-white border-slate-200 shadow-sm');
code = code.replace(/\$\{theme\.subtle\}/g, 'text-slate-500');
code = code.replace(/\$\{theme\.heading\}/g, 'text-slate-900');
code = code.replace(/\$\{theme\.input\}/g, 'bg-white border-slate-200 text-slate-900 focus:border-slate-900');
code = code.replace(/\$\{theme\.chip\}/g, 'bg-slate-100 border-slate-200 text-slate-800');

code = code.replace(/dark:[a-zA-Z0-9\/\[\]\-]+/g, '');

const colorMap = [
    ['violet-600', 'slate-900'],
    ['violet-500', 'slate-800'],
    ['violet-400', 'slate-700'],
    ['emerald-500', 'slate-800'],
    ['emerald-400', 'slate-700'],
    ['sky-500', 'slate-700'],
    ['amber-400', 'slate-600'],
    ['amber-500', 'slate-700'],
    ['amber-400', 'slate-700'],
    ['rose-500', 'slate-800'],
    ['rose-400', 'slate-700']
];

for (const [v, s] of colorMap) {
    code = code.replace(new RegExp('bg-' + v, 'g'), 'bg-' + s);
    code = code.replace(new RegExp('text-' + v, 'g'), 'text-' + s);
    code = code.replace(new RegExp('border-' + v, 'g'), 'border-' + s);
    code = code.replace(new RegExp('shadow-' + v, 'g'), 'shadow-slate-200'); // make shadows lighter
}

code = code.replace(/<button[^>]*onClick=\{toggleTheme\}[^>]*>[\s\S]*?<\/button>/g, '');

fs.writeFileSync(filepath, code, 'utf8');
console.log('Fixed InfluencerDashboard.jsx');

