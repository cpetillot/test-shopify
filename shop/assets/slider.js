window.theme = window.theme || {};

theme.slider = new (function () {
  // init default settings
  var settings = {
    sliderSelector: "[data-slider]",
    arrows: false,
  };

  function slider() {
    if ($(settings.sliderSelector).data("slider-arrow") == true) {
      settings.arrows = true;
    }
    console.log("hello");
    $(settings.sliderSelector).slick({
      nextArrow: '<button type="button" class="slick-next"></button>',
    });
  }

  return slider;
})();

var slider = new theme.slider();
