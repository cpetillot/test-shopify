window.theme = window.theme || {};

theme.slider = new (function () {
  // init default settings
  var settings = {
    sliderSelector: "[data-slider]",
    arrows: true,
  };

  function slider() {
    if ($(settings.sliderSelector).data("slider-arrow") == true) {
      settings.arrows = true;
    }

    $(settings.sliderSelector).slick({
      nextArrow: '<button type="button" class="slick-next"></button>',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      arrows: settings.arrows,
    });
  }

  return slider;
})();

var slider = new theme.slider();
