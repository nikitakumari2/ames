(function() {
  'use strict';

  var styles = document.createElement('style');
  styles.textContent = [
    '.ames-progress-bar {',
    '  position: fixed; top: 0; left: 0; height: 3px; background: rgba(201,169,110,0.3);',
    '  width: 100%; z-index: 9999;',
    '}',
    '.ames-progress-fill {',
    '  height: 100%; background: #C9A96E; width: 0%; transition: width 0.1s ease;',
    '}',
    '.ames-scroll-top {',
    '  position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px;',
    '  background: rgba(201,169,110,0.95); color: #3D3529; border: none;',
    '  border-radius: 50%; cursor: pointer; font-size: 20px; z-index: 9998;',
    '  display: none; align-items: center; justify-content: center;',
    '  box-shadow: 0 2px 12px rgba(0,0,0,0.2); transition: opacity 0.2s, transform 0.2s;',
    '}',
    '.ames-scroll-top:hover { transform: scale(1.1); }',
    '.ames-scroll-top.visible { display: flex; }',
    '@media (max-width: 768px) {',
    '  .ames-scroll-top { width: 40px; height: 40px; bottom: 16px; right: 16px; font-size: 18px; }',
    '}'
  ].join('\n');
  document.head.appendChild(styles);

  var progressBar = document.createElement('div');
  progressBar.className = 'ames-progress-bar';
  progressBar.innerHTML = '<div class="ames-progress-fill"></div>';
  document.body.insertBefore(progressBar, document.body.firstChild);

  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'ames-scroll-top';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '↑';
  document.body.appendChild(scrollBtn);

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    progressBar.querySelector('.ames-progress-fill').style.width = percent + '%';

    if (scrollTop > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateProgress);
  updateProgress();
})();
