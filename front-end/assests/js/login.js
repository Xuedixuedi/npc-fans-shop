var $register = document.getElementById("register") //注册表单
var $login = document.getElementById("login") //登录表单
var $regToLogin = $register.querySelector("a") //注册转化登录
var $loginToReg = $login.querySelector("a") //登录转注册

var $loginButton = $login.querySelector("button") //登录按钮
var $registerButton = $register.querySelector("button") //注册按钮

console.log($regToLogin)

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
    //注册逻辑
    $register.style.display = "none"
    $login.style.display = "block"
})

//点击登录按钮，跳转至主界面
$loginButton.addEventListener("click", function () {
    //登录逻辑
    window.location.href = "product.html"
})
