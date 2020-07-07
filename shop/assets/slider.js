window.theme = window.theme || {};

theme.slider = new (function () {
  // init default settings
  var settings = {
    bannerSelector: "[data-slider]",
    arrows: false,
  };

  function slider() {
    if ($(settings.sliderSelector).data("slider-arrow") == true) {
      settings.arrows = true;
    }

    $(settings.sliderSelector).slick({
      prevArrow: '<button type="button" class="prev_arrow">&lt;</button>',
      nextArrow: '<button type="button" class="next_arrow">&gt;</button>',
      arrows: settings.arrows,
    });
  }

  return slider;
})();

var slider = new theme.slider();
