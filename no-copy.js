/**
 * no-copy.js — Prevents text selection and copying across all pages.
 * Injected via <script> tag in each page's <head>.
 */
(function () {
  // 1. Inject CSS: disable user selection & kill ::selection highlight
  var style = document.createElement('style');
  style.textContent = [
    'body, body * {',
    '  -webkit-user-select: none !important;',
    '  -moz-user-select: none !important;',
    '  -ms-user-select: none !important;',
    '  user-select: none !important;',
    '}',
    '::selection { background: transparent !important; color: inherit !important; }',
    '::-moz-selection { background: transparent !important; color: inherit !important; }',
  ].join('\n');
  document.head.appendChild(style);

  // 2. Block copy / cut events
  document.addEventListener('copy',  function (e) { e.preventDefault(); }, true);
  document.addEventListener('cut',   function (e) { e.preventDefault(); }, true);

  // 3. Block right-click context menu
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); }, true);

  // 4. Block keyboard shortcuts: Ctrl/Cmd + C, X, A, U (view-source), P (print)
  document.addEventListener('keydown', function (e) {
    var ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && ['c', 'x', 'a', 'u', 'p'].indexOf(e.key.toLowerCase()) !== -1) {
      e.preventDefault();
    }
  }, true);
})();
