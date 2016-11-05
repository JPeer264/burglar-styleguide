(function () {
  
  var burger = document.getElementsByClassName('navigation__burger')[0],
    menu = document.getElementsByClassName('navigation__list')[0],
    listItems = document.getElementsByClassName('navigation__list-item'),
    listLinks = document.getElementsByClassName('navigation__link');

  var breakpoint = 800;

  burger.addEventListener('click', function (e) {

    toggleClass(menu, 'navigation__list--active');
  });

  for (var i = 0; i < listLinks.length; i++) {
    listLinks[i].addEventListener('click', function (e) {
      console.log(e);
      e.preventDefault();
      removeClassFromElements(listItems, 'navigation__list-item--active');
      toggleClass(e.target.parentNode, 'navigation__list-item--active');
    });
  }

  function toggleClass (elem, className) {
    if ( elem.className.split(' ').indexOf(className) === -1 ) {
      elem.className += ' ' + className;
    } else {
      elem.className = elem.className.replace(className, '');
    }
  }

  function removeClassFromElement (element, className) {
    element.className = element.className.replace(className, '');
  }

  function removeClassFromElements (elements, className) {
    for (var i = 0; i < elements.length; i++) {
      removeClassFromElement(elements[i], className);
    }
  }

  window.addEventListener('resize', function (e) {

    if (window.innerWidth >= breakpoint) {
      removeClassFromElement(menu, 'navigation__list--active')
    }

  });

})();