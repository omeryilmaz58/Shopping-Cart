// ************************************************
// Shopping Cart JSON
// ************************************************

const products = [
    { id: 1, reference: 'clay', category: 'ONLY', name: 'CLAY', old_price:10.99, price: 9.99,img:'https://www.orkabanyo.com/uploads/2021/07/clay-100-toprak-3_op.webp', option: [{value:"Clay 1"},{value:"Clay 2"},{value:"Clay 3"}]
    },
    { id: 2, reference: 'canada', category: 'RATE', name: 'CANADA', old_price:13.99, price: 12.99,img:'https://www.orkabanyo.com/uploads/2021/07/canada-90-detay-5_op.webp', option: [{value: "Canada 1"}, {value: "Canada 2"}, {value: "Canada 3"}]
    },
    { id: 3, reference: 'kestel', category: 'ONLY', name: 'KESTEL', old_price:9.99, price: 8.00,img:'https://www.orkabanyo.com/uploads/2022/02/orka-final-01-kestel-120_op.webp', option: [{value: "Kestel 1"}, {value: "Kestel 2"}, {value: "Kestel 3"}]
    },
    { id: 4, reference: 'vento', category: 'RATE', name: 'VENTO', old_price:11.99, price: 10.50,img:'https://www.orkabanyo.com/uploads/2021/07/vento-100-dublin-1_op.webp', option: [{value: "Vento 1"}, {value: "Vento 2"}, {value: "Vento 3"}]
    }
  ];

const categories = new Set(products.map((p) => p.category));
const categorySelector = document.getElementById("category-selector");


const displayProducts = () => {
const productList = document.querySelector("#product-list");
productList.innerHTML = "";
var text = "";

const selectedCategory = categorySelector.value;
for(i = 0 ; i < products.length ; i++) {
 if (selectedCategory === "all" || products[i].category === selectedCategory) {
text += `
                <div class="col-12">
                <div class="card">
                    <div class="row">
                        <div class="col-2" id="img">
                          <a data-fancybox href="${products[i].img}">
                            <img class="card-img-top" src="${products[i].img}" alt="Card image cap">
                          </a>
                        </div>
                        <div class="col-2 align-self-center" id="name">
                          <h4 class="product-title">${products[i].name}</h4>
                        </div>
                        <div class="col-2 align-self-center">
                          <select class="form-select" id="form-selector" style="background:#f2f2f2">`;
   for (j = 0; j < products[i].option.length; j++) {
        text += `<option>${products[i].option[j].value}</option>`;
      }

      text += `
                          </select>
                        </div>
                        <div class="col-1 form-check align-self-center" id="item-form">
                        <button class="btn btn-secondary" id="plus" data-reference="${products[i].reference}" data-name="${products[i].name}">+</button>
                        <input type="number" class="item-count form-control" id="item-count" min="1" data-reference="${products[i].reference}" 
                        data-name="${products[i].name}" value="1">
                        <button class="btn btn-secondary" id="minus" data-reference="${products[i].reference}" data-name="${products[i].name}">-</button>
                        </div>
                        <div class="col-2 align-self-center">
                        <dl class="col align-self-center">
                        <dt class="old_price">${products[i].old_price.toFixed(2)} ₺</dt>
                        <dt class="price">${products[i].price.toFixed(2)} ₺</dt>
                        </dl>
                        </div>
                        <div class="col-1 form-check align-self-center">
                        <input data-img="${products[i].img}" data-reference="${products[i].reference}" data-name="${products[i].name}" 
                        data-price="${products[i].price}" class="form-check-input checkbox" type="checkbox" id="checkbox">
                        </div>
                        <div class="col-2 align-self-center"> 
                            <a href="#" data-img="${products[i].img}" data-reference="${products[i].reference}" data-name="${products[i].name}" data-price="${products[i].price}" class="add-to-cart btn btn-secondary" id="add-btn">Sepete Ekle</a>
                        </div>
                    </div>
                </div>
            </div>
`;
 }

}
text += `<div class="col" align="right">
      <button style="margin-bottom:20px;" id="checkbox-button" class="btn btn-secondary" disabled>Seçilenleri Sepete Ekle</button>
      </div>
      `;
productList.innerHTML = text;
};

categories.forEach(c => {
  const option = document.createElement("option");
  option.value = c;
  option.textContent = c+' COLLECTION';
  categorySelector.appendChild(option);
});

categorySelector.addEventListener("change", displayProducts);
displayProducts();


var shoppingCart = (function() {
// =============================
// Private methods and propeties
// =============================
cart = [];

// Constructor
function Item(reference, img, name, price, count, option) {
    this.reference = reference;
    this.img = img;
    this.name = name;
    this.price = price;
    this.count = count;
    this.option = option;
  }

// Save cart
function saveCart() {
sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem("shoppingCart") != null) {
loadCart();
}


// =============================
// Public methods and propeties
// =============================
var obj = {};

// Add to cart
obj.addItemToCart = function (reference, img, name, price, count,option) {
    for (var item in cart) {
      if (cart[item].reference === reference) {
        if (count > 1) {
          cart[item].count = cart[item].count + count;
        }
        else {
          cart[item].count++;
        }
        saveCart();
        return;
      }
    }
    var item = new Item(reference, img, name, price, count,option);
    cart.push(item);
    saveCart();
  };
// Add Multiple Item
  obj.addMultipleItem = function (reference, img, name, price, count, option) {
    for (var item in cart) {
      if (cart[item].reference === reference) {
        if (count > 1) {
          cart[item].count = cart[item].count + count;
        } else {
          cart[item].count++;
        }
        saveCart();
        return;
      }
    }
    var item = new Item(reference, img, name, price, count, option);
    cart.push(item);
    saveCart();
  };

// Set count from item
obj.setCountForItem = function(reference, name, count) {
for(var i in cart) {
  if (cart[i].reference === reference) {
    cart[i].count = count;
    break;
  }
}
};
// Remove item from cart
obj.removeItemFromCart = function(reference, name) {
  for(var item in cart) {
    if(cart[item].reference === reference) {
      cart[item].count --;
      if(cart[item].count === 0) {
        cart.splice(item, 1);
      }
      break;
    }
}
saveCart();
}

// Remove all items from cart
obj.removeItemFromCartAll = function(reference,name) {
for(var item in cart) {
  if(cart[item].reference === reference) {
    cart.splice(item, 1);
    break;
  }
}
saveCart();
}

// Clear cart
obj.clearCart = function() {
cart = [];
saveCart();
}

// Count cart 
obj.totalCount = function() {
var totalCount = 0;
for(var item in cart) {
  totalCount += cart[item].count;
}
return totalCount;
}

// Total cart
obj.totalCart = function() {
var totalCart = 0;
for(var item in cart) {
  totalCart += cart[item].price * cart[item].count;
}
return Number(totalCart.toFixed(2));
}

// List cart
obj.listCart = function() {
var cartCopy = [];
for(i in cart) {
  item = cart[i];
  itemCopy = {};
  for(p in item) {
    itemCopy[p] = item[p];

  }
  itemCopy.total = Number(item.price * item.count).toFixed(2);
  cartCopy.push(itemCopy)
}
return cartCopy;
}

// cart : Array
// Item : Object/Class
// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// countCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function
return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$(document).on("click", ".add-to-cart", function (event) {
  event.preventDefault();
  var reference = $(this).data("reference");
  var img = $(this).data("img");
  var name = $(this).data("name");
  var price = Number($(this).data("price"));
  var count = Number($(this).closest('div').closest('.row').find('#item-count').val());
  var option = $(this).closest('div').closest('.row').find('.form-select').find('option:selected').val();
  if (count > 0) {
    shoppingCart.addItemToCart(reference, img, name, price, count, option);
    displayCart();
  }
  else {
    alert("Girilen adet 1'den küçük olamaz.")
  }
});

// Clear items
$('.clear-cart').click(function() {
shoppingCart.clearCart();
displayCart();
});

function displayCart() {
var cartArray = shoppingCart.listCart();
var output = "";
var output_head = `
      <thead>
        <tr>
          <th class="head-title-img"></th>
          <th class="head-title">Ürün</th>
          <th class="head-price">Fiyat</th>
          <th class="head-quantity">Miktar</th>
          <th class="head-total">Sil</th>
          <th class="head-total">Toplam</th>
        </tr>
      </thead>
`;
for (var i in cartArray) {
    output +=
      "<tr>" +
      "<td class='card-img-cart-td'><img class='card-img-cart' src='" +
      cartArray[i].img +
      "' alt='" +
      cartArray[i].name +
      "' width='150'></td>" +
      "<td class='name-cart'>" +
      cartArray[i].name +
      "</td>" +
      "<td class='price-cart'>(" +
      cartArray[i].price.toFixed(2) +
      " ₺)</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-reference='" +
      cartArray[i].reference +
      "' data-name=" +
      cartArray[i].reference +
      ">-</button>" +
      "<input type='text' class='item-count form-control' data-reference='" +
      cartArray[i].reference +
      "' data-name='" +
      cartArray[i].reference +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-reference='" +
      cartArray[i].reference +
      "' data-name=" +
      cartArray[i].name +
      ">+</button></div></td>" +
      "<td><button class='delete-item btn btn-danger' data-reference= " +
      cartArray[i].reference +
      " data-name=" +
      cartArray[i].name +
      ">X</button></td>" +
      " = " +
      "<td class='price-total'>" +
      cartArray[i].total +
      " ₺</td>" +
      "</tr>";
  }
if (output) {
$('.show-cart').html(output);
$('.show-cart').prepend(output_head);
$('.cart-total').show();
$('.empty-contents').hide();
$('#order-now').removeAttr('disabled');
$("#clear").removeAttr("disabled");
} else {
$('.cart-total').hide();
$('.empty-contents').show();
$('#order-now').attr('disabled','true');
$("#clear").attr("disabled", "true");
$('.show-cart').html(output);
}
$('.total-cart').html(shoppingCart.totalCart());
$('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
displayCart();
$('.show-cart').on("click", ".delete-item", function(event) {
var reference = $(this).data('reference');
var name = $(this).data('name')
shoppingCart.removeItemFromCartAll(reference);
displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
var reference = $(this).data('reference');
var name = $(this).data('name')
shoppingCart.removeItemFromCart(reference);
displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
var reference = $(this).data('reference');
var name = $(this).data('name')
shoppingCart.addItemToCart(reference,name);
displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
var reference = $(this).data('reference');
var name = $(this).data('name');
var count = Number($(this).val());
shoppingCart.setCountForItem(reference, name, count);
displayCart();
});

// Order item button
$(document).on("click", "#order-now", function (event) {
  /*$("#address").show();
  $("#list").hide();
  $("#order-now").hide();
  $("#accept").show();*/
  alert("Sipariş alındı.");
});

//Change option
$(document).ready(function(){ $(".form-select").change(function(){
    var selectedOption = $(this).children("option:selected").val();
    console.log(selectedOption);
  });
});

//Card minus button
$(document).on("click", "#minus", function(event) {
  event.preventDefault();
  var reference = $(this).data('reference');
  var name = $(this).data('name');
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $input.change();
  return false;
});

//Card plus button
$(document).on("click", "#plus", function(event) {
  event.preventDefault();
  var reference = $(this).data('reference');
  var name = $(this).data('name');
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) + 1;
  $input.val(count);
  $input.change();
  return false;
});

//Checkbox button
$(document).on("click", "#checkbox-button", function (event) {
  event.preventDefault();
  var check = document.querySelectorAll('#checkbox:checked');
  $.each(check,function() {
    var reference = $(this).data('reference');
    var img = $(this).data('img');
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var count = Number($(this).closest('div').closest('.row').find('#item-count').val());
    var option = $(this).closest('div').closest('.row').find('.form-select').find('option:selected').val();
    if (count > 0) {
      shoppingCart.addMultipleItem(reference, img, name, price, count, option);
      displayCart();
    }
    else {
      alert("Girilen adet 1'den küçük olamaz.")
    }
  });
});


//Checkbox control
$(document).on("change", '.checkbox', function(event) {
  var check = document.querySelectorAll(".checkbox");
  var i = 0;
  check.forEach(function(checkBox) {
    if(checkBox.checked){
      i++;
    }
    if ( i > 0) {
      $("#checkbox-button").removeAttr("disabled");
    } else {
      $("#checkbox-button").attr("disabled", "true");
    }
  displayCart();
  });
});