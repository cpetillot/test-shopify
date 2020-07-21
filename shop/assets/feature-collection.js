$(function () {
  var form = $('form[action="/cart/add"]');

  $(form)
    .find("[data-variant-id]")
    .on("click", function () {
      var id = $(this).data("variant-id");
      $(form).find('input[name="id"]').val(id);
    });
});
