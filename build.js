import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

Promise.all([
  readFile(path.join(__dirname, '/src/page.html')),
  readFile(path.join(__dirname, '/src/navigation.html')),
  readFile(path.join(__dirname, '/src/footer.html')),
  readFile(path.join(__dirname, '/src/golden-circle.html')),
  readFile(path.join(__dirname, '/src/contact-form.html')),
  readFile(path.join(__dirname, '/src/apps.html')),
  readFile(path.join(__dirname, '/src/imprint.html')),
  readFile(path.join(__dirname, '/src/terms.html')),
  readFile(path.join(__dirname, '/src/privacy.html')),
  readFile(path.join(__dirname, '/src/partners.html')),
]).then(([page, nav, footer, goldencircle, contactForm, apps, imprint, terms, privacy, partners]) => {
  // Partials
  Handlebars.registerPartial('navigation', nav.toString());
  Handlebars.registerPartial('footer', footer.toString());
  Handlebars.registerPartial('golden-circle', goldencircle.toString());
  Handlebars.registerPartial('contact-form', contactForm.toString());
  Handlebars.registerPartial('golden-circle', goldencircle.toString());
  Handlebars.registerPartial('apps', apps.toString());
  Handlebars.registerPartial('partners', partners.toString());

  // Template
  const template = Handlebars.compile(page.toString());

  // Data
  const context = 'https://wuda.io'; //'http://127.0.0.1:8080/dest';
  const websites = [
    {
      context,
      url: '/index.html',
      title: 'Innovative Software-Lösungen für mehr Freiheit | Wuda Software',
      description:
        'Individuelle webbasierte Applikationen für eine schnellere und effizientere Abarbeitung Ihrer Geschäftsprozesse. Starten Sie jetzt ein Projekt mit uns!',
      content: Handlebars.compile('{{> golden-circle}}{{> contact-form}}')({ context }),
    },
    {
      context,
      url: '/modules/index.html',
      title: 'Apps',
      description: 'Applications which are developed and offered by Wuda Software.',
      content: Handlebars.compile('{{> apps}}{{> contact-form}}')({ context }),
    },
    {
      context,
      url: '/contact/index.html',
      title: 'Contact',
      description: 'Contact us an we will respond as soon as possible.',
      content: Handlebars.compile('{{> contact-form}}{{> partners}}')({ context }),
    },
    {
      context,
      url: '/terms/index.html',
      title: 'Terms and Conditions',
      description: 'Terms and Conditions',
      content: terms.toString(),
    },
    {
      context,
      url: '/imprint/index.html',
      title: 'Imprint',
      description: 'Imprint',
      content: imprint.toString(),
    },
    {
      context,
      url: '/privacy/index.html',
      title: 'Privacy',
      description: 'Privacy',
      content: privacy.toString(),
    },
  ];

  Promise.all(
    websites.map((website) => {
      const output = template(website);
      // Check if dir exists
      const destFilePath = path.join(__dirname, '/docs' + website.url);
      ensureDirectoryExistence(destFilePath);
      return writeFile(destFilePath, output);
    })
  ).then(() => console.log('Done!'));
});
