const fs = require('fs');
const path = require('path');

const generateIndex = (dirPath = '.') => {
    const files = fs.readdirSync(dirPath);

    let htmlContent = '<html><body>';

    files.forEach(file => {
        htmlContent += `<a href="${file}">${file}</a><br/>`;
    });

    htmlContent += '</body></html>';

    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlContent);
};

generateIndex('dist');  // Assuming 'dist' is the target directory
