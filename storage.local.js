(function(){
  function key(n){ return 'cvdoc:'+n; }
  function list(){
    return Object.keys(localStorage)
      .filter(k=>k.startsWith('cvdoc:'))
      .map(k=>k.replace('cvdoc:',''))
      .sort();
  }
  async function save(name, data){ localStorage.setItem(key(name), JSON.stringify(data)); return true; }
  async function load(name){ const raw = localStorage.getItem(key(name)); return raw ? JSON.parse(raw) : null; }
  async function remove(name){ localStorage.removeItem(key(name)); return true; }
  async function removeAll(){ list().forEach(n=> localStorage.removeItem(key(n))); return true; }

  window.StorageAPI = { list, save, load, remove, removeAll, mode:'local' };
})();