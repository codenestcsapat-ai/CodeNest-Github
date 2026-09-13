const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

function buildVersion(root = __dirname) {
  const hash = createHash('sha256');
  const files = ['index.html', 'script.js', 'firebaseConfig.js', 'style.css', 'brand.css'];
  function visit(directory) {
    for (const item of fs.readdirSync(path.join(root, directory), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      const relative = `${directory}/${item.name}`;
      if (item.isDirectory()) visit(relative);
      else if (item.isFile()) files.push(relative);
    }
  }
  visit('assets');
  for (const file of files) {
    hash.update(file).update('\0').update(fs.readFileSync(path.join(root, file))).update('\0');
  }
  return { version: hash.digest('hex').slice(0, 24) };
}
if (require.main === module) {
  const manifest = buildVersion();
  fs.writeFileSync(path.join(__dirname, 'version.json'), `${JSON.stringify(manifest)}\n`);
  console.log(`HoloFyrn release: ${manifest.version}`);
}
module.exports = { buildVersion };
