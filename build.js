const fs = require('fs');
const path = require('path');

function build() {
  console.log('Building project for Google Apps Script deployment...');

  const srcDir = __dirname;
  const gasDir = path.join(__dirname, 'gas');

  // Make sure directories exist
  if (!fs.existsSync(gasDir)) {
    fs.mkdirSync(gasDir);
  }

  // 1. Read index.html
  let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

  // 2. Read and inline styles.css
  const styles = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
  html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>\n${styles}\n</style>`
  );

  // 3. Compile and inline JavaScript
  let qrDefaultsJs = fs.readFileSync(path.join(srcDir, 'qr_defaults.js'), 'utf8');
  // Strip out export statement from qrDefaultsJs
  qrDefaultsJs = qrDefaultsJs.replace('export default QR_DEFAULTS;', '');

  let appJs = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');
  // Strip out import statement from appJs
  appJs = appJs.replace("import QR_DEFAULTS from './qr_defaults.js';", '');

  const bundledJs = `
    (function() {
      ${qrDefaultsJs}
      ${appJs}
    })();
  `;

  html = html.replace(
    '<script type="module" src="app.js"></script>',
    `<script>\n${bundledJs}\n</script>`
  );

  // 4. Save to gas/Index.html
  fs.writeFileSync(path.join(gasDir, 'Index.html'), html, 'utf8');
  console.log('Successfully created gas/Index.html!');
  console.log('You can now deploy the files in the gas/ folder to Google Apps Script.');
}

build();
