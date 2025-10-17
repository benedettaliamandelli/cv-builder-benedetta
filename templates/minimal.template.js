(function(){
  const id = 'minimal';
  const name = 'Minimal';
  const desc = 'Clean spacing, fewer lines, simple headings.';

  function seed(){
    const d = window.CV_TEMPLATES.get('default').seed();
    return {...d, _theme:{...d._theme, accent:"#475569"}};
  }
  function migrate(old){ return seed(); }

  window.CV_TEMPLATES._all[id] = {id,name,desc,seed,migrate};
})();