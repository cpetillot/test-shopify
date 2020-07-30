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
      $(form).find('input[name="id"]').val(id);
    });
});

slate.Variants = (function () {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on(
      "change",
      this._onSelectChange.bind(this)
    );
  }

  Variants.prototype = $.extend({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @Return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function () {
      var currentOptions = $.map(
        $(this.singleOptionSelector, this.$container),
        function (element) {
          var $element = $(element);
          var type = $element.attr("type");
          var currentOption = {};

          if (type === "radio" || type === "checkbox" || type === "select") {
            if ($element[0].checked) {
              currentOption.value = $element.val();
              currentOption.index = $element.data("index");

              return currentOption;
            } else {
              return false;
            }
          } else {
            currentOption.value = $element.val();
            currentOption.index = $element.data("index");

            return currentOption;
          }
        }
      );

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      updateSwatchVariant(variant);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param {array} selectedValues - Values of variant inputs
     * @Return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function () {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = false;

      variants.forEach(function (variant) {
        var satisfied = true;

        selectedValues.forEach(function (option) {
          if (satisfied) {
            satisfied = option.value === variant[option.index];
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function () {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: "variantChange",
        variant: variant,
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param {object} variant - Currently selected variant
     * @Return {event} variantImageChange
     */
    _updateImages: function (variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (
        !variant.featured_image ||
        variantImage.src === currentVariantImage.src
      ) {
        return;
      }

      this.$container.trigger({
        type: "variantImageChange",
        variant: variant,
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param {object} variant - Currently selected variant
     * @Return {event} variantPriceChange
     */
    _updatePrice: function (variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return;
      }

      this.$container.trigger({
        type: "variantPriceChange",
        variant: variant,
      });
    },

    /**
     * Trigger event when variant sku changes.
     *
     * @param {object} variant - Currently selected variant
     * @Return {event} variantSKUChange
     */
    _updateSKU: function (variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.$container.trigger({
        type: "variantSKUChange",
        variant: variant,
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param {object} variant - Currently selected variant
     */
    _updateHistoryState: function (variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?variant=" +
        variant.id;
      window.history.replaceState({ path: newurl }, "", newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function (variant) {
      $(this.originalSelectorId, this.$container).value = variant.id;
    },
  });

  return Variants;
})();
