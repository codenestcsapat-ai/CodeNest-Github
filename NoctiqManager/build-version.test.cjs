const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { buildVersion } = require('./build-version.cjs');

test('release is stable and changes for every deployed application dependency', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'holo-version-'));
  const files = ['index.html', 'script.js', 'firebaseConfig.js', 'style.css', 'brand.css', 'assets/nested/logo.png'];
  fs.mkdirSync(path.join(root, 'assets/nested'), { recursive: true });
  try {
    files.forEach(file => fs.writeFileSync(path.join(root, file), `original ${file}`));
    const initial = buildVersion(root).version;
    assert.match(initial, /^[a-f0-9]{24}$/);
    assert.equal(buildVersion(root).version, initial);
    fs.writeFileSync(path.join(root, 'version.json'), '{"version":"ignored"}');
    assert.equal(buildVersion(root).version, initial);
    for (const file of files) {
      fs.appendFileSync(path.join(root, file), ' changed');
      assert.notEqual(buildVersion(root).version, initial, file);
      fs.writeFileSync(path.join(root, file), `original ${file}`);
      assert.equal(buildVersion(root).version, initial);
    }
  } finally {
    // Exact files in this freshly created test directory; no recursive deletion.
    files.forEach(file => fs.unlinkSync(path.join(root, file)));
    fs.unlinkSync(path.join(root, 'version.json'));
    fs.rmdirSync(path.join(root, 'assets/nested'));
    fs.rmdirSync(path.join(root, 'assets'));
    fs.rmdirSync(root);
  }
});
