const fs = require('fs');
const path = require('path');

const generateIndex = (dirPath = '.') => {
    const files = fs.readdirSync(dirPath);

    let htmlContent = `<html>
        <head><script type="module" src="https://cdn.skypack.dev/twind/shim"></script></head>
        <body>
            <main class="h-screen bg-purple-400 flex items-center justify-center">
              <h1 class="font-bold text(center 5xl white sm:gray-800 md:pink-700)">Index</h1>
            </main>
            <a href="./tutorial"
              class="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200">
              View tutorial
            </a>`;

    files.forEach(file => {
        htmlContent += `<a href="${file}">${file}</a><br/>`;
    });

    htmlContent += '</body></html>';

    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlContent);
};

generateIndex('dist');  // Assuming 'dist' is the target directory
