var $menu = document.querySelector(".menu") //菜单
var $overlay = document.querySelector(".overlay")

var $cartButton = document.querySelector(".links").getElementsByTagName("li")[0] //购物车元素
var $cartCard = document.getElementById("cart") //购物车卡片
var $cartSettle = document.getElementById("cart").querySelectorAll(".button")[0] //结算购物车
var $cartClose = document.getElementById("cart").querySelectorAll(".button")[1] //关闭购物车

var $addCart = document.getElementsByClassName("btn") //所有商品的加入购物车按钮

var $orderButton = document
    .querySelector(".links")
    .getElementsByTagName("li")[1] //订单记录
var $orderCard = document.getElementById("order") //订单记录卡片
var $orderClose = document
    .getElementById("order")
    .querySelectorAll(".button")[0] //关闭订单记录

window.onload = function () {
    let xmlhttp = new XMLHttpRequest() //物件专门用来和伺服器做连线
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let username = JSON.parse(xmlhttp.responseText)["username"]
            document.getElementById("username").innerHTML = username //显示当前用户的名字
        }
    }
    xmlhttp.open("POST", "http://localhost:5000/", true)
    // xmlhttp.onload = function () {
    //     //事件，侦测连线状态的结束
    //     //连线完成
    //     alert(this.responseText)
    // }
    xmlhttp.send() //送出连线
}

console.log($addCart)

//打开购物车
$cartButton.addEventListener("click", function () {
    $cartCard.style.display = "flex"
})

//结算购物车
$cartSettle.addEventListener("click", function () {
    $cartSettle.style.display = "none"
    //结算逻辑
})

// 关闭购物车
$cartClose.addEventListener("click", function () {
    $cartCard.style.display = "none"
})

//打开订单记录
$orderButton.addEventListener("click", function () {
    $orderCard.style.display = "flex"
})

// 关闭订单记录
$orderClose.addEventListener("click", function () {
    $orderCard.style.display = "none"
})

//加入购物车
for (let i = 0; i < $addCart.length; i++) {
    $addCart[i].addEventListener("click", function () {
        alert("加入购物车成功")
        //把i传给后端
    })
}
//menu js
$overlay.addEventListener("mouseenter", function (event) {
    $menu.classList.add("active")
})
$menu.addEventListener("mouseleave", function (event) {
    $menu.classList.remove("active")
})
