(function() {
  // Elements
  var navItems = document.getElementsByClassName('js-nav-item');
  var sections = document.getElementsByClassName('js-section');
  var subSections = [].slice.call(document.getElementsByClassName('sg-section__group'));
  var headings = [].slice.call(document.getElementsByClassName('sg-section__heading'));

  // Initial states
  TweenLite.set(subSections, { autoAlpha: 0 });

  // Set Click Events on Navigation
  for (var i = 0; i < navItems.length; i++) {
    var elem = navItems[i];

    // ScrollTo Function  
    elem.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      var id = String(e.target.getAttribute('href')).replace("#", "");
      history.pushState(null, null, '#' + id);
      TweenLite.to(window, 1.6, {
        scrollTo: sections[id].offsetTop - 70,
        ease: Power2.easeInOut
      });
    };
  }

  // animate in elements window scrolled
  window.addEventListener('scroll', function() {
    checkElements(subSections);
  });

  // animates elements in when page loaded
  document.addEventListener("DOMContentLoaded", function() {
    checkElements(subSections);
    TweenMax.staggerFromTo(headings, 0.6, {
      autoAlpha: 0,
      x: 40
    }, {
      autoAlpha: 1,
      x: 0,
      ease: Power2.easeInOut,
    }, 0.1);
  });

  // Helpers
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.bottom >= 0 &&
      //rect.left >= 0 &&
      rect.top <= (window.innerHeight || html.clientHeight)
      //rect.right <= (window.innerWidth || html.clientWidth)
    );
  }

  function checkElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      if (isInViewport(elem) && elem.style.opacity == 0) {
        TweenLite.fromTo(elem, 0.7, {
          autoAlpha: 0,
          x: 50
        }, {
          x: 0,
          autoAlpha: 1,
          ease: Power4.easeOut
        });
        elements.splice(i, 1);
      }
    }
  }
}());