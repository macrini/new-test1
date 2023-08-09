const fs = require('fs');
const path = require('path');

const generateDirectoryContent = (dirPath) => {
    const items = fs.readdirSync(dirPath).filter(item => item !== '.gitkeep');  // Exclude .gitkeep
    let content = '<ul>';

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            content += `
            <li>
                <span class="collapsible">${item}</span>
                <div class="content">${generateDirectoryContent(itemPath)}</div>
            </li>`;
        } else {
            content += `<li><a href="${path.relative('dist', itemPath)}">${item}</a></li>`;
        }
    }

    content += '</ul>';
    return content;
};

const generateIndex = (dirPath = '.') => {
    const htmlTemplate = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                ul {
                    list-style-type: none;
                }
                a {
                    text-decoration: none;
                    color: #0366d6;
                }
                a:hover {
                    text-decoration: underline;
                }
                .collapsible {
                    cursor: pointer;
                    color: #24292e;
                }
                .content {
                    display: none;
                }
            </style>
        </head>
        <body>
            ${generateDirectoryContent(dirPath)}

            <script>
                const collapibles = document.querySelectorAll('.collapsible');
                collapibles.forEach(collapsible => {
                    collapsible.addEventListener('click', function() {
                        this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';
                    });
                });
            </script>
        </body>
    </html>
    `;

    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlTemplate);
};

generateIndex('dist');  // Assuming 'dist' is the target directory
