var $register = document.getElementById("register") //注册表单
var $login = document.getElementById("login") //登录表单
var $regToLogin = $register.querySelector("a") //注册转化登录
var $loginToReg = $login.querySelector("a") //登录转注册

var $loginButton = $login.querySelector("button") //登录按钮
var $registerButton = $register.querySelector("button") //注册按钮

//登录表单
var loginform = {
    username: $login.getElementsByClassName("username")[0],
    password: $login.getElementsByClassName("pwd")[0],
}

//注册表单
var regform = {
    name: $register.getElementsByClassName("name")[0],
    username: $register.getElementsByClassName("username")[0],
    password: $register.getElementsByClassName("pwd")[0],
}

console.log(regform)

//注册切换登录
$regToLogin.addEventListener("click", function () {
    $register.style.display = "none"
    $login.style.display = "block"
})

//登录切换注册
$loginToReg.addEventListener("click", function () {
    $login.style.display = "none"
    $register.style.display = "block"
})

//点击注册按钮
$registerButton.addEventListener("click", function () {
    const requestData = {
        username: parseInt(regform.username.value),
        password: regform.password.value,
        name: regform.name.value,
    }
    var data_json = JSON.stringify(requestData)
    console.log(requestData)
    console.log(data_json)
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
        alert(request.responseText)
        console.log(request.responseText)
        if (request.responseText == "注册成功,请登录") {
            $register.style.display = "none"
            $login.style.display = "block"
            regform.username.value = null
            regform.password.value = null
            regform.name.value = null
        }
    }

    request.open("POST", "http://172.81.243.195:5000/register", true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(data_json)

    //注册逻辑
    // $register.style.display = "none"
    // $login.style.display = "block"
})

//点击登录按钮，跳转至主界面
$loginButton.addEventListener("click", function () {
    var loginData = {
        username: parseInt(loginform.username.value),
        password: loginform.password.value,
    }

    var data_json = JSON.stringify(loginData)
    console.log(loginData)
    console.log(data_json)

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
        alert(request.responseText)
        console.log(request.responseText)
        if (request.responseText.indexOf("成功") != -1) {
            //判断是否登录成功
            loginform.username.value = null
            loginform.password.value = null
            window.location.href = "product.html"
        }
    }

    request.open("POST", "http://172.81.243.195:5000/login", true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(data_json)
})
