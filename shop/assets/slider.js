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
      nextArrow:
        '<button type="button" class="slick-next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>',
    });
  }

  return slider;
})();

var slider = new theme.slider();
