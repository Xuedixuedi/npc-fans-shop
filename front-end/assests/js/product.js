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
        } else {
            document.getElementById("username").innerHTML = "游客"
        }
    }
    xmlhttp.open("POST", "http://localhost:5000/", true)
    xmlhttp.send() //送出连线
}

//打开购物车
$cartButton.addEventListener("click", function () {
    $cartCard.style.display = "flex"
    //不知道为什么 就算发送数据为空也必须发送 不然没法查询
    var cartData = {}
    var data_json = JSON.stringify(cartData)
    //一个ajax请求
    var request
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        request = new XMLHttpRequest()
    } else {
        // IE6, IE5 浏览器执行代码
        request = new ActiveXObject("Microsoft.XMLHTTP")
    }
    request.onload = function () {
        response_json = JSON.parse(request.responseText)
        cart_json = response_json.cart
        console.log(cart_json)

        if (request.responseText.indexOf("msg") != -1) {
            //查询成功
            cart_table = document.getElementById("cart_table")
            tot_money = 0 //商品总价
            for (i = 0; i < cart_json.length; ++i) {
                //添加购物车里面的东西
                new_item = document.createElement("div")
                new_item.innerHTML =
                    "<span>" +
                    cart_json[i].product_name +
                    "</span><span>" +
                    cart_json[i].qty +
                    "</span><span>" +
                    cart_json[i].tot_price +
                    "</span>"
                new_item.classList = ["card__table__row"]
                cart_table.appendChild(new_item)
                tot_money += cart_json[i].tot_price
            }
            document.getElementById("tot_money").innerHTML = tot_money
        } else {
            //查询失败
        }
    }

    request.open("POST", "http://localhost:5000/cart", true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(data_json)
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
