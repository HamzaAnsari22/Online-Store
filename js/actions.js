$(document).ready(function() {
  cat();
  cathome();
  brand();
  product();

  producthome();

  function cat() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { category: 1 },
      success: function(data) {
        $("#get_category").html(data);
      }
    });
  }
  function cathome() {
    $.ajax({
      url: "homeaction.php",
      method: "POST",
      data: { categoryhome: 1 },
      success: function(data) {
        $("#get_category_home").html(data);
      }
    });
  }
  function brand() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { brand: 1 },
      success: function(data) {
        $("#get_brand").html(data);
      }
    });
  }
  function product() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { getProduct: 1 },
      success: function(data) {
        $("#get_product").html(data);
      }
    });
  }

  function gethomeproduts() {
    $.ajax({
      url: "homeaction.php",
      method: "POST",
      data: { gethomeProduct: 1 },
      success: function(data) {
        $("#get_home_product").html(data);
      }
    });
  }
  function producthome() {
    $.ajax({
      url: "homeaction.php",
      method: "POST",
      data: { getProducthome: 1 },
      success: function(data) {
        $("#get_product_home").html(data);
      }
    });
  }

  $("body").delegate(".category", "click", function(event) {
    event.preventDefault();
    $("#get_product").html("<h3>Loading...</h3>");
    var cid = $(this).attr("cid");

    $.ajax({
      url: "action.php",
      method: "POST",
      data: { get_seleted_Category: 1, cat_id: cid },
      success: function(data) {
        $("#get_product").html(data);
        if ($("body").width() < 480) {
          $("body").scrollTop(683);
        }
      }
    });
  });
  $("body").delegate(".categoryhome", "click", function(event) {
    event.preventDefault();
    $("#get_product").html("<h3>Loading...</h3>");
    var cid = $(this).attr("cid");

    $.ajax({
      url: "homeaction.php",
      method: "POST",
      data: { get_seleted_Category: 1, cat_id: cid },
      success: function(data) {
        $("#get_product").html(data);
        if ($("body").width() < 480) {
          $("body").scrollTop(683);
        }
      }
    });
  });

  $("body").delegate(".selectBrand", "click", function(event) {
    event.preventDefault();
    $("#get_product").html("<h3>Loading...</h3>");
    var bid = $(this).attr("bid");

    $.ajax({
      url: "action.php",
      method: "POST",
      data: { selectBrand: 1, brand_id: bid },
      success: function(data) {
        $("#get_product").html(data);
        if ($("body").width() < 480) {
          $("body").scrollTop(683);
        }
      }
    });
  });

  $("#search_btn").click(function() {
    $("#get_product").html("<h3>Loading...</h3>");
    var keyword = $("#search").val();
    if (keyword != "") {
      $.ajax({
        url: "action.php",
        method: "POST",
        data: { search: 1, keyword: keyword },
        success: function(data) {
          $("#get_product").html(data);
          if ($("body").width() < 480) {
            $("body").scrollTop(683);
          }
        }
      });
    }
  });
  $("#login").on("submit", function(event) {
    event.preventDefault();
    $(".overlay").show();
    $.ajax({
      url: "login.php",
      method: "POST",
      data: $("#login").serialize(),
      success: function(data) {
        $(".overlay").hide();
        if (data == "login_success") {
          window.location.href = "index.php";
        } else if (data == "cart_login") {
          window.location.href = "cart.php";
        } else {
          $("#e_msg").html(data);
        }
      }
    });
  });
  $("#signup_form").on("submit", function(event) {
    event.preventDefault();
    $(".overlay").show();
    $.ajax({
      url: "register.php",
      method: "POST",
      data: $("#signup_form").serialize(),
      success: function(data) {
        $(".overlay").hide();
        if (data == "register_success") {
          window.location.href = "cart.php";
        } else {
          $("#signup_msg").html(data);
        }
      }
    });
  });

  $("#offer_form").on("submit", function(event) {
    event.preventDefault();
    $(".overlay").show();
    $.ajax({
      url: "offersmail.php",
      method: "POST",
      data: $("#offer_form").serialize(),
      success: function(data) {
        $(".overlay").hide();
        $("#offer_msg").html(data);
      }
    });
  });

  $("body").delegate("#product", "click", function(event) {
    event.preventDefault();
    var pid = $(this).attr("pid");

    $(".overlay").show();
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { addToCart: 1, proId: pid },
      success: function(data) {
        count_item();
        getCartItem();
        $("#product_msg").html(data);
        $(".overlay").hide();
      }
    });
  });
  count_item();
  function count_item() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { count_item: 1 },
      success: function(data) {
        $(".badge").html(data);
      }
    });
  }
  getCartItem();
  function getCartItem() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { Common: 1, getCartItem: 1 },
      success: function(data) {
        $("#cart_product").html(data);
        net_total();
      }
    });
  }

  $("body").delegate(".qty", "keyup", function(event) {
    event.preventDefault();
    var row = $(this)
      .parent()
      .parent();
    var price = row.find(".price").val();
    var qty = row.find(".qty").val();
    if (isNaN(qty)) {
      qty = 1;
    }
    if (qty < 1) {
      qty = 1;
    }
    var total = price * qty;
    row.find(".total").val(total);
    var net_total = 0;
    $(".total").each(function() {
      net_total += $(this).val() - 0;
    });
    $(".net_total").html("Total : $ " + net_total);
  });

  $("body").delegate(".remove", "click", function(event) {
    var remove = $(this)
      .parent()
      .parent()
      .parent();
    var remove_id = remove.find(".remove").attr("remove_id");
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { removeItemFromCart: 1, rid: remove_id },
      success: function(data) {
        $("#cart_msg").html(data);
        checkOutDetails();
      }
    });
  });

  $("body").delegate(".update", "click", function(event) {
    var update = $(this)
      .parent()
      .parent()
      .parent();
    var update_id = update.find(".update").attr("update_id");
    var qty = update.find(".qty").val();
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { updateCartItem: 1, update_id: update_id, qty: qty },
      success: function(data) {
        $("#cart_msg").html(data);
        checkOutDetails();
      }
    });
  });
  checkOutDetails();
  net_total();
  function checkOutDetails() {
    $(".overlay").show();
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { Common: 1, checkOutDetails: 1 },
      success: function(data) {
        $(".overlay").hide();
        $("#cart_checkout").html(data);
        net_total();
      }
    });
  }
  function net_total() {
    var net_total = 0;
    $(".qty").each(function() {
      var row = $(this)
        .parent()
        .parent();
      var price = row.find(".price").val();
      var total = price * $(this).val() - 0;
      row.find(".total").val(total);
    });
    $(".total").each(function() {
      net_total += $(this).val() - 0;
    });
    $(".net_total").html("Total : $ " + net_total);
  }

  page();
  function page() {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { page: 1 },
      success: function(data) {
        $("#pageno").html(data);
      }
    });
  }
  $("body").delegate("#page", "click", function() {
    var pn = $(this).attr("page");
    $.ajax({
      url: "action.php",
      method: "POST",
      data: { getProduct: 1, setPage: 1, pageNumber: pn },
      success: function(data) {
        $("#get_product").html(data);
      }
    });
  });
});
