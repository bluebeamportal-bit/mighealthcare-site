/* ============================================================
   MIG Healthcare site settings
   WEB3FORMS_KEY: paste the access key from web3forms.com so the
   contact form sends inquiries straight to your inbox. Until it is
   set, the form opens the visitor's email app addressed to
   INQUIRY_EMAIL instead, so no inquiry is lost.
   ============================================================ */
var WEB3FORMS_KEY = "1bf11acf-b599-4fae-9c86-e4275a1a032d";
var INQUIRY_EMAIL = "partnerships@mighealthcare.com";

window.MIGForm=function(){
  var f=document.getElementById('cform');if(!f)return;
  var note=document.getElementById('fnote'),btn=f.querySelector('button[type=submit]'),orig=note.textContent;
  function v(n){var el=f.elements[n];return el?el.value.trim():''}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(f.elements.botcheck&&f.elements.botcheck.checked)return;
    var name=(v('first_name')+' '+v('last_name')).trim(),email=v('email');
    if(!v('first_name')||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){note.className='fnote ferr';note.textContent='Please add your first name and a valid work email.';return}
    var subject='Website inquiry: '+v('interest')+(v('organization')?' ('+v('organization')+')':'');
    if(!WEB3FORMS_KEY){
      var body='Name: '+name+'\nEmail: '+email+'\nOrganization: '+v('organization')+'\nContacting as: '+v('role')+'\nInterested in: '+v('interest')+'\n\n'+v('message');
      location.href='mailto:'+INQUIRY_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      note.className='fdone';note.textContent='Your email app should open with your message ready to send. If it does not, email us at '+INQUIRY_EMAIL+'.';return}
    btn.disabled=true;btn.textContent='Sending…';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:subject,from_name:'MIG Healthcare website',name:name,email:email,organization:v('organization'),contacting_as:v('role'),interested_in:v('interest'),message:v('message')})})
    .then(function(r){return r.json()}).then(function(d){if(!d.success)throw 0;f.reset();note.className='fdone';note.textContent='Thank you. Your inquiry was sent, and a member of our team will reply within one business day.'})
    .catch(function(){note.className='fnote ferr';note.textContent='Something went wrong sending your inquiry. Please email us at '+INQUIRY_EMAIL+'.'})
    .finally(function(){btn.disabled=false;btn.textContent='Send inquiry'});
  });
};

(function(){
  var pages=["home","clinical-education","clinical-network","professional-training","workforce","schools","healthcare-organizations","why-us","locations","resources","portal","contact"];
  var division=["clinical-education","clinical-network","professional-training","workforce"];
  var nav=document.getElementById('nav'),menuBtn=document.getElementById('menuBtn'),dd=document.getElementById('dd'),ddBtn=document.getElementById('ddBtn');
  function closeAll(){nav.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false');});nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='Menu';}
  (function(){
    var id=document.body.getAttribute('data-page')||'home';
    nav.querySelectorAll(':scope > a').forEach(function(a){a.classList.toggle('cur',a.getAttribute('href')==='/'+id+'/'&&!a.classList.contains('btn'));});
    dd.classList.toggle('cur',division.indexOf(id)>=0);
    var d2=document.getElementById('dd2');if(d2)d2.classList.toggle('cur',id==='why-us'||id==='resources');
  })();
  menuBtn.addEventListener('click',function(){var o=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o?'true':'false');menuBtn.textContent=o?'Close':'Menu';});
  var dds=nav.querySelectorAll('.dd');
  function shut(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false');}
  dds.forEach(function(d){var b=d.querySelector('button');b.addEventListener('click',function(e){e.stopPropagation();dds.forEach(function(o){if(o!==d)shut(o)});var o=d.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});});
  document.addEventListener('click',function(e){dds.forEach(function(d){if(!d.contains(e.target))shut(d)});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')dds.forEach(shut);});
  document.querySelectorAll('.filters button').forEach(function(b){b.addEventListener('click',function(){
    document.querySelectorAll('.filters button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    var f=b.dataset.f;document.querySelectorAll('#arts .art').forEach(function(a){var on=(f==='all'||a.dataset.c===f);a.hidden=!on;a.style.display=on?'':'none';});
  });});
  document.querySelectorAll('.copy').forEach(function(b){b.addEventListener('click',function(){
    var el=document.getElementById(b.dataset.copy);
    function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected';}
    try{navigator.clipboard.writeText(el.textContent).then(function(){b.textContent='Copied';},sel);}catch(err){sel();}
    setTimeout(function(){b.textContent='Copy';},1800);
  });});
  if(window.MIGForm)window.MIGForm();
  (function(){var s=document.getElementById('f-int');if(s&&/interest=pocus/.test(location.search))s.value='Professional Training and POCUS';})();
})();

  (function(){var path=document.getElementById('path');if(!path)return;var fill=document.getElementById('railFill');
    path.querySelectorAll('.stage').forEach(function(st){function on(){var i=+getComputedStyle(st).getPropertyValue('--i');fill.style.width=(i/3*100)+'%';}
      st.addEventListener('mouseenter',on);st.addEventListener('focus',on);});
    path.addEventListener('mouseleave',function(){fill.style.width='0';});
    path.addEventListener('focusout',function(e){if(!path.contains(e.relatedTarget))fill.style.width='0';});})();

document.querySelectorAll('[data-cx]').forEach(function(box){function show(k){box.querySelectorAll('.cx-tabs button').forEach(function(b){b.setAttribute('aria-selected',b.dataset.t===k)});
box.querySelectorAll('.cx-hub .pick').forEach(function(g){g.classList.toggle('on',g.dataset.k===k)});box.querySelectorAll('[data-pane]').forEach(function(p){p.hidden=p.dataset.pane!==k});}
box.querySelectorAll('.cx-tabs button').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.t)})});
box.querySelectorAll('.cx-hub .pick').forEach(function(g){g.addEventListener('click',function(){show(g.dataset.k)});g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();show(g.dataset.k)}})});});

(function(){var g=document.querySelector('[data-proof]');if(!g||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var cs=g.querySelectorAll('.cu');cs.forEach(function(c){c.textContent='0'});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.disconnect();cs.forEach(function(c){var to=+c.dataset.to,t0=null;function st(t){if(!t0)t0=t;var p=Math.min((t-t0)/1700,1);p=1-Math.pow(1-p,3);c.textContent=Math.round(to*p);if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)})})},{threshold:.6});io.observe(g);})();

document.querySelectorAll('.dd-mega').forEach(function(m){var im=m.querySelector('.ddp img'),cur=im.getAttribute('src');
m.querySelectorAll('.ddl a').forEach(function(a){var pre=new Image();pre.src=a.dataset.img;a.addEventListener('mouseenter',function(){m.querySelectorAll('.ddl a').forEach(function(x){x.classList.toggle('act',x===a)});
if(a.dataset.img===cur)return;cur=a.dataset.img;im.classList.add('fade');setTimeout(function(){im.src=cur;im.classList.remove('fade')},180);});});});

(function(){var svg=document.querySelector('.cx-heart');if(!svg||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var NS='http://www.w3.org/2000/svg',P=2400,core=svg.querySelector('[data-core]'),pg=svg.querySelector('.pulses'),o={};
['s','h'].forEach(function(k){var p=svg.querySelector('[data-p='+k+']');o[k]={p:p,L:p.getTotalLength(),n:svg.querySelector('.pick[data-k='+k+']'),tr:[]};
 for(var i=0;i<12;i++){var c=document.createElementNS(NS,'circle');c.setAttribute('class','pd');c.setAttribute('r',(5.2-i*.38).toFixed(2));c.setAttribute('opacity',0);pg.appendChild(c);o[k].tr.push(c)}});
function sc(t){return 1+Math.exp(-Math.pow((t-60)/45,2))*.06+Math.exp(-Math.pow((t-300)/50,2))*.04}
var vis=true;new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(svg);
function f(now){if(vis){var t=now%P;core.setAttribute('transform','translate(350 180) scale('+sc(t).toFixed(4)+') translate(-350 -180)');core.classList.toggle('glow',t<420);
 var pt=(t-80)/1150;['s','h'].forEach(function(k){var x=o[k];
  x.tr.forEach(function(c,i){var q=pt-i*.022;if(q<0||q>1){c.setAttribute('opacity',0);return}var e=1-Math.pow(1-q,1.8),p=x.p.getPointAtLength(e*x.L);c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('opacity',((1-i/12)*(q>.93?(1-q)/.07:1)).toFixed(2))});
  x.n.classList.toggle('lit',pt>.93&&pt<1.7)})}
 requestAnimationFrame(f)}requestAnimationFrame(f);})();

(function(){var w=document.getElementById('shelves');if(!w)return;var sh=w.querySelectorAll('.shelf');
function upd(r){var s=r.closest('.shelf'),b=s.querySelectorAll('.sb');b[0].disabled=r.scrollLeft<4;b[1].disabled=r.scrollLeft+r.clientWidth>=r.scrollWidth-4;}
sh.forEach(function(s){var r=s.querySelector('.srail');s.querySelectorAll('.sb').forEach(function(b){b.addEventListener('click',function(){r.scrollBy({left:(+b.dataset.d)*r.clientWidth*.9,behavior:'smooth'})})});r.addEventListener('scroll',function(){upd(r)},{passive:true});upd(r);});
addEventListener('resize',function(){sh.forEach(function(s){upd(s.querySelector('.srail'))})});
document.querySelectorAll('.filters button').forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f;w.classList.toggle('one',f!=='all');sh.forEach(function(s){var on=f==='all'||s.dataset.c===f;s.hidden=!on;s.style.display=on?'':'none';});});});
})();

(function(){var w=document.getElementById('shelves');if(!w)return;var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
w.querySelectorAll('.shelf').forEach(function(s){s.querySelectorAll('.sc').forEach(function(c,i){c.style.setProperty('--k',Math.min(i,5))})});
function tick(el,to,ms){var t0=null;el.textContent='0';(function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/ms,1);el.textContent=Math.max(p>0?1:0,Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)})(performance.now())}
if(!rm){document.documentElement.classList.add('js-anim');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var s=e.target;io.unobserve(s);s.classList.add('go');var c=s.querySelector('.cnt');if(c)tick(c,+c.dataset.to,1000);s.querySelectorAll('.ct').forEach(function(x,i){if(i<6)setTimeout(function(){tick(x,+x.dataset.to,1100)},250+i*100)})})},{threshold:.2});
w.querySelectorAll('.shelf').forEach(function(s){io.observe(s)});
if(matchMedia('(hover:hover)').matches){w.querySelectorAll('.tilt').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform='rotateY('+((x-.5)*7)+'deg) rotateX('+((.5-y)*7)+'deg) translateY(-3px)';c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});c.addEventListener('mouseleave',function(){c.style.transform=''})})}}
document.querySelectorAll('.filters button').forEach(function(b){b.addEventListener('click',function(){w.querySelectorAll('.shelf').forEach(function(s){s.classList.add('go')})})});
})();

(function(){var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,d=document,hdr=d.querySelector('.hdr'),pg=d.body.getAttribute('data-page');
var top=d.createElement('button');top.className='totop';top.type='button';top.setAttribute('aria-label','Back to top');top.innerHTML='<svg viewBox="0 0 16 16"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg>';d.body.appendChild(top);
top.addEventListener('click',function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})});
var art=d.querySelector('.abody'),bar=null;if(art){bar=d.createElement('div');bar.className='rprog';d.body.appendChild(bar)}
function onS(){var y=scrollY;if(hdr)hdr.classList.toggle('scrolled',y>24);var long=d.documentElement.scrollHeight>innerHeight*2.4;top.classList.toggle('on',long&&y>innerHeight*1.2);
 if(bar){var r=art.getBoundingClientRect(),t=r.top+y-innerHeight*.35,p=Math.min(1,Math.max(0,(y-t+innerHeight*.35)/(r.height)));bar.style.transform='scaleX('+p+')'}}
addEventListener('scroll',onS,{passive:true});addEventListener('resize',onS);onS();
if(!rm){d.documentElement.classList.add('js-reveal');
 if(pg!=='home'){d.querySelectorAll('main .band .wrap > .head, main .band .grid3, main .band .grid2, main .band .aud, main .band .note, main .cta .wrap').forEach(function(e){if(e.getBoundingClientRect().top>innerHeight*.9)e.classList.add('rv')})}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var t=e.target;if(t.classList.contains('rv'))t.classList.add('in');if(t.classList.contains('tl'))t.classList.add('go');if(t.classList.contains('mapband'))t.classList.add('drawn')})},{threshold:.18});
 d.querySelectorAll('.rv,.tl,.mapband').forEach(function(e){io.observe(e)});
}
var cm=d.querySelector('.cmap');if(cm){function hl(k){cm.querySelectorAll('[data-r]').forEach(function(e){e.classList.toggle('hl',e.dataset.r===k)})}
 cm.querySelectorAll('[data-r]').forEach(function(e){e.addEventListener('mouseenter',function(){hl(e.dataset.r)});e.addEventListener('focus',function(){hl(e.dataset.r)});e.addEventListener('click',function(){hl(e.dataset.r)})});
 cm.addEventListener('mouseleave',function(){hl('sd')});hl('sd')}
})();
