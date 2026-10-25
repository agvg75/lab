(function(){
  if(!document.body) return;
  var btn=document.createElement('button');
  btn.type='button';
  btn.className='totop';
  btn.setAttribute('aria-label','Back to top of page');
  btn.hidden=true;
  btn.innerHTML='<span aria-hidden="true">↑</span> Top';
  document.body.appendChild(btn);

  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  btn.addEventListener('click',function(){
    try{ window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}); }
    catch(e){ window.scrollTo(0,0); }
    var h=document.querySelector('h1')||document.body;
    h.setAttribute('tabindex','-1'); h.focus({preventScroll:true});
  });

  var ticking=false;
  function update(){
    var y=window.pageYOffset||document.documentElement.scrollTop||0;
    var tall=(document.documentElement.scrollHeight-window.innerHeight)>900;
    btn.hidden=!(tall && y>600);
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ ticking=true; window.requestAnimationFrame(update); }
  },{passive:true});
  window.addEventListener('resize',update,{passive:true});
  update();
})();
