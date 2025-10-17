(function(){
  const hasFirebase = !!(window.firebase && firebase.apps && firebase.apps.length);
  const db = hasFirebase? firebase.firestore() : null;

  async function list(uid){
    if(!db || !uid){  // fallback or anonymous → local list
      return window.StorageAPI ? window.StorageAPI._local_list() : [];
    }
    const snap = await db.collection('users').doc(uid).collection('cvdocs').get();
    return snap.docs.map(d=>d.id).sort();
  }
  async function save(name, data, uid){
    if(!db || !uid){
      return window.StorageAPI? window.StorageAPI._local_save(name,data) : false;
    }
    await db.collection('users').doc(uid).collection('cvdocs').doc(name).set(data);
    return true;
  }
  async function load(name, uid){
    if(!db || !uid){
      return window.StorageAPI? window.StorageAPI._local_load(name) : null;
    }
    const doc = await db.collection('users').doc(uid).collection('cvdocs').doc(name).get();
    return doc.exists? doc.data() : null;
  }
  async function remove(name, uid){
    if(!db || !uid){
      return window.StorageAPI? window.StorageAPI._local_remove(name) : false;
    }
    await db.collection('users').doc(uid).collection('cvdocs').doc(name).delete();
    return true;
  }

  // Expose a unified API; if Firebase present, these use Firestore; else they delegate to local
  window.StorageAPI = {
    list, save, load, remove,
    // local helpers used by fallback path
    _local_list(){ return Object.keys(localStorage).filter(k=>k.startsWith('cvdoc:')).map(k=>k.replace('cvdoc:','')).sort(); },
    _local_save(name,data){ localStorage.setItem('cvdoc:'+name, JSON.stringify(data)); return true; },
    _local_load(name){ const raw=localStorage.getItem('cvdoc:'+name); return raw? JSON.parse(raw): null; },
    _local_remove(name){ localStorage.removeItem('cvdoc:'+name); return true; }
  };
})();