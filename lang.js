// Shows the French or English text, from the link chosen or the browser's language.
(function () {
  var sections = document.querySelectorAll('section[data-lang], footer[data-lang]');
  var links = document.querySelectorAll('nav.lang a');
  function show(lang) {
    sections.forEach(function (s) { s.hidden = s.getAttribute('data-lang') !== lang; });
    links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    document.documentElement.lang = lang;
  }
  var wanted = (location.hash || '').replace('#', '');
  if (wanted !== 'fr' && wanted !== 'en') {
    wanted = (navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); history.replaceState(null, '', '#' + a.getAttribute('data-lang')); show(a.getAttribute('data-lang')); });
  });
  show(wanted);
})();
