(function(){
  const hasFirebase = !!(window.firebase && firebase.apps && firebase.apps.length);
  const db = hasFirebase ? firebase.firestore() : null;

  // --- In-memory fallback if localStorage is blocked (Safari private mode, etc.)
  const MEM = {};

  function _local_list(){
    try {
      return Object.keys(localStorage)
        .filter(k => k.startsWith('cvdoc:'))
        .map(k => k.replace('cvdoc:', ''))
        .sort();
    } catch (e) {
      // localStorage unavailable → use memory store
      return Object.keys(MEM).sort();
    }
  }

  function _local_save(name, data){
    try {
      localStorage.setItem('cvdoc:' + name, JSON.stringify(data));
    } catch (e) {
      // QuotaExceededError / SecurityError → memory fallback
      MEM[name] = data;
    }
    return true;
  }

  function _local_load(name){
    try {
      const raw = localStorage.getItem('cvdoc:' + name);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore, try memory
    }
    return MEM[name] || null;
  }

  function _local_remove(name){
    try { localStorage.removeItem('cvdoc:' + name); } catch (e) { /* ignore */ }
    delete MEM[name];
    return true;
  }

  // --- Public API (Firestore if signed-in, else local)
  async function list(uid){
    if (!db || !uid) return _local_list();
    const snap = await db.collection('users').doc(uid).collection('cvdocs').get();
    return snap.docs.map(d => d.id).sort();
  }

  async function save(name, data, uid){
    if (!db || !uid) return _local_save(name, data);
    await db.collection('users').doc(uid).collection('cvdocs').doc(name).set(data);
    return true;
  }

  async function load(name, uid){
    if (!db || !uid) return _local_load(name);
    const doc = await db.collection('users').doc(uid).collection('cvdocs').doc(name).get();
    return doc.exists ? doc.data() : null;
  }

  async function remove(name, uid){
    if (!db || !uid) return _local_remove(name);
    await db.collection('users').doc(uid).collection('cvdocs').doc(name).delete();
    return true;
  }

  window.StorageAPI = {
    list, save, load, remove,
    // expose locals for completeness
    _local_list, _local_save, _local_load, _local_remove
  };
})();