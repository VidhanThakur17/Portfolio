(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  /* ---------------------------------------------------------
     Terminal typing sequence
  --------------------------------------------------------- */
  var terminalBody = document.getElementById('terminalBody');
  var script = [
    { type: 'prompt', text: 'whoami' },
    { type: 'name',   text: 'Vidhan Thakur' },
    { type: 'prompt', text: 'cat role.txt' },
    { type: 'out',    text: 'Junior Security Engineer @ Intelliroot Technologies' },
    { type: 'out',    text: 'AppSec · Security Researcher' },
    { type: 'prompt', text: 'wc -l assessments/*.pdf' },
    { type: 'out',    text: '70+ client products assessed' },
    { type: 'prompt', text: 'nmap -sV vidhanthakur.dev' },
    { type: 'out',    text: 'PORT     STATE  SERVICE' },
    { type: 'out',    text: '22/tcp   open   ssh          (available for hire)' },
    { type: 'out',    text: '443/tcp  open   secure-comms (open to Product Security roles)' }
  ];

  function renderStatic(){
    var html = '';
    script.forEach(function(line){
      if (line.type === 'prompt'){
        html += '<div><span class="line-prompt">$ ' + line.text + '</span></div>';
      } else if (line.type === 'name'){
        html += '<div class="line-name">&gt; ' + line.text + '</div>';
      } else {
        html += '<div class="line-out">' + line.text + '</div>';
      }
    });
    terminalBody.innerHTML = html;
  }

  function typeSequence(){
    var lineIndex = 0;
    var charIndex = 0;
    var container = document.createElement('div');
    terminalBody.appendChild(container);

    function typeChar(){
      if (lineIndex >= script.length){
        var cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        terminalBody.appendChild(cursor);
        return;
      }
      var line = script[lineIndex];
      var prefix = line.type === 'prompt' ? '$ ' : (line.type === 'name' ? '> ' : '');
      var full = prefix + line.text;

      if (charIndex === 0){
        container = document.createElement('div');
        if (line.type === 'prompt') container.classList.add('line-prompt');
        if (line.type === 'name') container.classList.add('line-name');
        if (line.type === 'out') container.classList.add('line-out');
        terminalBody.appendChild(container);
      }

      charIndex++;
      container.textContent = full.slice(0, charIndex);

      if (charIndex < full.length){
        setTimeout(typeChar, line.type === 'out' ? 8 : 26);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, line.type === 'prompt' ? 260 : 160);
      }
    }
    typeChar();
  }

  if (terminalBody){
    if (reduceMotion){
      renderStatic();
    } else {
      typeSequence();
    }
  }

  /* ---------------------------------------------------------
     Scroll reveal (IntersectionObserver)
  --------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    '.section-eyebrow, .section-title, .section-sub, .about-text, .about-meta, ' +
    '.timeline-item, .skill-card, .proficiency, .finding-card, .cert-card, .education-card, .contact-card'
  );
  revealTargets.forEach(function(el){ el.classList.add('reveal'); });

  var statNums = document.querySelectorAll('.stat-num');
  var profFills = document.querySelectorAll('.prof-fill');
  var findFills = document.querySelectorAll('.finding-fill');

  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;
    function step(ts){
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = (target * eased);
      el.textContent = (Number.isInteger(target) && suffix.indexOf('.') === -1)
        ? Math.round(current)
        : current.toFixed(1);
      el.textContent += suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function(el){ observer.observe(el); });

    var statsObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          statNums.forEach(animateCount);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    var statsWrap = document.querySelector('.hero-stats');
    if (statsWrap) statsObserver.observe(statsWrap);

    var barObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('animate');
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    profFills.forEach(function(el){ barObserver.observe(el); });
    findFills.forEach(function(el){ barObserver.observe(el); });
  } else {
    revealTargets.forEach(function(el){ el.classList.add('visible'); });
    statNums.forEach(animateCount);
    profFills.forEach(function(el){ el.classList.add('animate'); });
    findFills.forEach(function(el){ el.classList.add('animate'); });
  }

  /* ---------------------------------------------------------
     Active nav link highlighting
  --------------------------------------------------------- */
  var sections = document.querySelectorAll('main .section, .hero');
  var navAnchors = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length){
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          var id = entry.target.id;
          navAnchors.forEach(function(a){
            a.style.color = a.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function(s){ navObserver.observe(s); });
  }

})();
