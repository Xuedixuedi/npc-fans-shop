// $(".message a").click(function () {
//     $("form").animate({ height: "toggle", opacity: "toggle" }, "slow")
// })

// var changeviewDOM = document.querySelectorAll(".message a")

function changeview(text) {
    //得到两张表
    form = document.getElementsByTagName("form")
    console.log(text)
    if (text == "Sign In") {
        form[0].style.display = "none"
        form[1].style.display = "block"
    } else if (text == "Create an account") {
        form[1].style.display = "none"
        form[0].style.display = "block"
    }
}
