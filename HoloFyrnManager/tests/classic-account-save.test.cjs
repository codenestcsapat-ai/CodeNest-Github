const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

test('saving an incomplete browser list preserves other Firebase profiles', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
  const save = source.slice(source.indexOf('async function saveStore('), source.indexOf('async function persistStore('));
  const docs = new Map([
    ['users/admin', { id: 'admin', serverField: true }],
    ['users/zyonikk', { id: 'zyonikk', name: 'Zyonikk' }],
  ]);
  const context = {
    cleanStoreForSave: s => s, normalizeStore: s => s,
    storageMode: 'remote', storeRef: 'main', usersRef: 'users', db: {}, console,
    remoteApi: {
      doc: (_, collection, id) => `${collection}/${id}`,
      serverTimestamp: () => 'now',
      setDoc: async (ref, data, options) => docs.set(ref, options?.merge ? { ...docs.get(ref), ...data } : data),
      getDocs: async () => ({ docs: [...docs.keys()].filter(k => k.startsWith('users/')).map(k => ({ id: k.slice(6) })) }),
      deleteDoc: async ref => docs.delete(ref),
    },
  };
  vm.createContext(context);
  vm.runInContext(save, context);
  await context.saveStore({ users: [{ id: 'admin', name: 'Admin' }] });
  assert.deepEqual(docs.get('users/zyonikk'), { id: 'zyonikk', name: 'Zyonikk' });
  assert.equal(docs.get('users/admin').serverField, true);
});
