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

// The publisher's address, shown on request (it is not in the page's text).
document.querySelectorAll('button[data-reveal]').forEach(function (button) {
  button.addEventListener('click', function () {
    try {
      var bytes = Uint8Array.from(atob(button.getAttribute('data-reveal')), function (c) { return c.charCodeAt(0); });
      var text = document.createElement('span');
      text.textContent = new TextDecoder().decode(bytes);
      text.tabIndex = -1;
      button.replaceWith(text);
      text.focus();
    } catch (e) {}
  });
});
