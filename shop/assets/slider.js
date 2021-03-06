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
      nextArrow: $("[data-arrow-next]"),
      prevArrow: $("[data-arrow-prev]"),
      arrows: settings.arrows,
    });
  }

  return slider;
})();

var slider = new theme.slider();
