(function(){
  var box=document.getElementById('newsList');
  if(!box) return;
  var MODE=box.getAttribute('data-view')||'recent';
  var MONTHS=['January','February','March','April','May','June','July','August',
              'September','October','November','December'];
  function nice(d){var p=d.split('-');
    return MONTHS[parseInt(p[1],10)-1]+' '+parseInt(p[2],10)+', '+p[0];}
  function esc(s){return String(s==null?'':s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  var c=new Date(); c.setMonth(c.getMonth()-12);
  var CUT=c.toISOString().slice(0,10);
  fetch('news.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(items){
    items.sort(function(a,b){return a.date<b.date?1:-1;});
    items=items.filter(function(it){
      return MODE==='archive' ? it.date<CUT : it.date>=CUT;
    });
    var out='', year='';
    items.forEach(function(it){
      var y=it.date.slice(0,4);
      if(y!==year){ out+='<h2>'+esc(y)+'</h2>'; year=y; }
      out+='<article class="newsitem">';
      out+='<p class="meta"><span class="newstag">'+esc(it.tag)+'</span> '+nice(it.date)+'</p>';
      out+='<h3>'+esc(it.title)+'</h3><p>'+esc(it.body)+'</p>';
      if(it.image){ out+='<figure class="fig photo newsfig"><img src="'+esc(it.image)+
        '" alt="'+esc(it.alt)+'" loading="lazy"></figure>'; }
      if(it.link){ out+='<p><a href="'+esc(it.link)+'">'+esc(it.linkText||'Read more')+'</a></p>'; }
      out+='</article>';
    });
    box.innerHTML=out||'<p class="meta">'+(MODE==='archive'
      ? 'Nothing has moved to the archive yet.'
      : 'Nothing recorded in the past twelve months.')+'</p>';
  }).catch(function(){ box.innerHTML='<p class="meta">The news list could not be loaded.</p>'; });
})();
