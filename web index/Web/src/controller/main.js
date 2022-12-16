var ProductService = new ProductService();
let cart = [];
let total = 0;

const allItem = [];

var obj = {};

function getEle(id) {
  return document.getElementById(id);
}

function getLisProduct() {
  var promise = ProductService.getListProductApi();

  promise
    .then(function (result) {
      allItem?.push(result.data);
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  renderHTML(ProductService.arr);
}

getLisProduct();

const renderCartItem = (carts) => {
  const counts = {};
  carts.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  getEle("cartList").innerHTML = "";
  const listItem = allItem.flat();

  let itemPrice = [];

  let content = "";
  cart?.map((item, index) => {
    if (cart?.findIndex((el) => el === item) !== index) return;
    const data = listItem?.filter((e) => e?.id === item);
    const getCount = counts[data?.[0]?.id];
    itemPrice.push(data?.[0].price * counts[data?.[0]?.id]);

    content += `
        <div class="d-flex">
            <img src="${data?.[0]?.img}" width="50" height="50" />
            <span>${data?.[0]?.name}</span>
            <span> < ${getCount} > </span>
            <span>${getCount * data?.[0]?.price}</span>
            <button id="${
              data?.[0]?.id
            }" class="btn btn-danger" >delete</button>
        </div>
    `;
  });
  // tính tiền
  let totalPrice = 0;
  itemPrice?.forEach((element) => {
    if (element === undefined) return;
    totalPrice += element;
  });
  getEle("totalCart").innerHTML = totalPrice;

  getEle("cartList").innerHTML = content;
  getEle("cartList")
    .querySelectorAll("button")
    .forEach(
      (btn) =>
        (btn.onclick = (e) => handleDeleteCartItem(e.target.getAttribute("id")))
    );
};
// delete product
const handleDeleteCartItem = (id) => {
  let tmpCart = [];
  cart.forEach((element) => {
    if (element === id) return;
    tmpCart = [...tmpCart, element];
  });

  cart = [...tmpCart];
  renderCartItem(cart);
};

getEle("btnClear").onclick = () => {
  cart = [];
  total = 0;
  getEle("totalCart").innerHTML = "";
  getEle("cartList").innerHTML = "";
};

const handleAddCart = (id) => {
  cart = [...cart, id];
  renderCartItem(cart);
};

// render sản phẩm
function renderHTML(data) {
  var content = "";
  data.forEach(function (product, index) {
    content += `<div class="card">
        <div class="card_above">
            <div class="card_top">
                <i class="fa-brands fa-apple"></i>
                <em>In Stock</em>
            </div>
            <div class="card-img-top">
                <img src="${product.img}" alt="">
            </div>
        </div>
        <div class="card_hover">
            <div class="card-body">
                <div class="card-title">
                    <div>${product.type}</div>
                    <div class="card_heart"><i class="fa-solid fa-heart"></i></div>
                </div>
                <p class="card-text">Wireless Noise Cancelling Earphones</p>
            </div>
            <div class="card_content">
                ${product.desc}
            </div>
            <div class="card_bottom">
                <div class="priceDevices">$${product.price}</div>
                <button id="${product?.id}">Add <i class="fa-solid fa-angle-right"></i></button>
            </div>
        </div>
       
    </div>`;
  });

  getEle("productItems").innerHTML = content;
  getEle("productItems")
    .querySelectorAll("button")
    .forEach(
      (btn) => (btn.onclick = (e) => handleAddCart(e.target.getAttribute("id")))
    );
}
var modal1 = document.getElementById("buyModal");
var btn1 = document.getElementById("btnClick");
var span1 = document.getElementsByClassName("close")[0];

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

// buy modal
btn1.onclick = function () {
  modal1.style.display = "block";
};
span1.onclick = function () {
  modal1.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};
