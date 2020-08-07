window.theme = window.theme || {};

theme.sliderChoice = new (function () {
  // init default settings
  var settingsShoes1 = {
    sliderSelector1: "[data-slider-for]",
    arrows: true,
  };
  var settingsShoes2 = {
    sliderSelector2: "[data-slider-nav]",
    arrows: true,
  };

  function sliderChoice() {
    $(settingsShoes1.sliderSelector1).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: "[data-slider-nav]",
    });

    $(settingsShoes2.sliderSelector2).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: "[data-slider-for]",
      focusOnSelect: true,
    });
  }

  return sliderChoice;
})();

var sliderChoice = new theme.sliderChoice();

$(function () {
  var form = $('form[action="/cart/add"]');

  $(form)
    .find("[data-product-select]")
    .on("click", function () {
      var selectValueOption1 = $("[data-variant-option1]").val();
      var selectValueOption2 = $("[data-variant-option2]").val();
      var id = $(this).data("variant-id");
      $(form).find('input[name="id"]').val(id);
    });
});
