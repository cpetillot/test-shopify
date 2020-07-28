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
    .find("[data-variant-id]")
    .on("click", function () {
      var id = $(this).data("variant-id");
      $(form).find('input[name="idProduct"]').val(id);
    });
});

theme.Product = function () {
  var selectors = {
    addToCart: "[data-add-to-cart]",
    addToCartText: "[data-add-to-cart-text]",
    comparePrice: "[data-compare-price]",
    comparePriceText: "[data-compare-text]",
    originalSelectorId: "[data-product-select]",
    priceWrapper: "[data-price-wrapper]",
    productFeaturedImage: "[data-product-featured-image]",
    productJson: "[data-product-json]",
    productPrice: "[data-product-price]",
    productThumbs: "[data-product-single-thumbnail]",
    singleOptionSelector: "[data-single-option-selector]",
  };

  var variant = evt.variant;

  if (variant) {
    $(selectors.priceWrapper, this.$container).removeClass("hide");
  } else {
    $(selectors.addToCart, this.$container).prop("disabled", true);
    $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
    $(selectors.priceWrapper, this.$container).addClass("hide");
    return;
  }

  if (variant.available) {
    $(selectors.addToCart, this.$container).prop("disabled", false);
    $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
  } else {
    $(selectors.addToCart, this.$container).prop("disabled", true);
    $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
  }
};
