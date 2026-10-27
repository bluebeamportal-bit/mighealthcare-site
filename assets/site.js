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
    var f=b.dataset.f;document.querySelectorAll('#arts .art').forEach(function(a){a.hidden=!(f==='all'||a.dataset.c===f);});
  });});
  document.querySelectorAll('.copy').forEach(function(b){b.addEventListener('click',function(){
    var el=document.getElementById(b.dataset.copy);
    function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected';}
    try{navigator.clipboard.writeText(el.textContent).then(function(){b.textContent='Copied';},sel);}catch(err){sel();}
    setTimeout(function(){b.textContent='Copy';},1800);
  });});
  if(window.MIGForm)window.MIGForm();
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
