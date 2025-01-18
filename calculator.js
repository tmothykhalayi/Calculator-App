// variables

let equation = document.getElementsByTagName("input")[0]
let result = document.getElementsByClassName("result")[0]
let resetKey = document.getElementsByClassName("reset")[0]

// ==============================================================================
// functions
// ==============================================================================

// onloading

window.onload = function () {
    equation.focus()
    equation.value = ""
    result.innerHTML = "0"

    for (let [key, value] of Object.entries(localStorage)) {

        if (key === "lightMode") {
            if (value == 1) {
                lightMode.classList.remove("active")
                darkMode.classList.add("active")

            } else if (value == 2) {

                darkMode.classList.remove("active")
                lightMode.classList.add("active")


            }
        }
    }
    lightToggle()
    darkToggle()
}

let currentInput = ""
let currentOperation = ""

// 

calcOperation()

function calcOperation() {

    document.addEventListener("click", function (e) {

        // calculations

        equation.focus()
        if (e.target.classList.contains("num")) {

            equation.focus()

            equation.value += e.target.innerHTML

            currentInput = equation.value



        } else if (e.target.classList.contains("hist")) {

            result.innerHTML = e.target.innerHTML

            currentInput = result.innerHTML.replace(/,/g, "")



        } else if (e.target.classList.contains("operation")) {


            if (result.innerHTML > 0) {

                currentInput = result.innerHTML

            }
            if (currentInput) {

                currentOperation = e.target.innerHTML

                currentInput += `${currentOperation}`

                equation.value = currentInput

            }



            // =======================================================================================
            // getting answer

        } else if (e.target.classList.contains("equal")) {

            try {

                if (equation.value == "") {
                    result.innerHTML = 0
                } else {
                    result.innerHTML = eval(currentInput).toLocaleString()
                }

            } catch (error) {
                result.innerHTML = "error"
            }
            equation.value = currentInput
            equation.focus()

            // =======================================================================================
            // reset the app

        } else if (e.target.classList.contains("reset")) {

            equation.value = ""

            result.innerHTML = "0"

            currentInput = ""

            equation.focus()
            // =======================================================================================
            // delete last input

        } else if (e.target.classList.contains("delete") || e.target.classList.contains("del")) {

            currentInput = currentInput.slice(0, -1)

            equation.value = currentInput

            // =======================================================================================
            // storing answer in local storage

        } else if (e.target.classList.contains("save")) {

            window.localStorage.setItem("ans", result.innerHTML)

            // =======================================================================================
            // restoring answer from local storage

        } else if (e.target.classList.contains("restore")) {

            currentInput = window.localStorage.getItem("ans").replace(/,/g, "")

            equation.value = currentInput

            // =======================================================================================
            // light mode

        } else if (e.target.classList.contains("two")) {

            darkMode.classList.remove("active")
            lightMode.classList.add("active")
            window.localStorage.setItem("lightMode", lightMode.textContent)
            lightToggle()


        } else if (e.target.classList.contains("one")) {

            lightMode.classList.remove("active")
            darkMode.classList.add("active")
            window.localStorage.setItem("lightMode", darkMode.textContent)
            darkToggle()


        }

    })
}
// =========================================================================================================
// clearing Local Storage

resetKey.ondblclick = function () {

    window.localStorage.removeItem("ans")

    for (let [key, value] of Object.entries(localStorage)) {
        if (value === "answer") {
            window.localStorage.removeItem(key)
        }
    }
    document.querySelector(".history").innerHTML = ""

}

// =========================================================================================================
// light mode

let darkMode = document.querySelectorAll(".choice span")[0]

let lightMode = document.querySelectorAll(".choice span")[1]





function lightToggle() {

    if (lightMode.classList.contains("active")) {
        window.localStorage.setItem("lightMode", lightMode.textContent)
        document.querySelector("body").style.setProperty("background-color", "hsl(0, 0%, 90%)")
        document.querySelector(".header").style.setProperty("color", "hsl(60, 10%, 19%)")
        document.querySelector(".choice").style.setProperty("background-color", "hsl(0, 5%, 81%)")
        document.querySelector(".screen").style.setProperty("background-color", "hsl(0, 0%, 93%)")
        document.querySelector(".screen").style.setProperty("color", "hsl(60, 10%, 19%)")
        document.querySelector(".equation").style.setProperty("color", "hsl(60, 10%, 19%)")
        document.querySelector(".keys").style.setProperty("background-color", "hsl(0, 5%, 81%)")
        document.querySelectorAll(".keys span").forEach(span => {
            span.style.setProperty("background-color", "hsl(45, 7%, 89%)")
            span.style.setProperty("box-shadow", "0 3px hsl(35, 11%, 61%)")

            span.onmouseout = function () {

                span.style.setProperty("background-color", "hsl(45, 7%, 89%)")

            }
            span.onmouseover = function () {

                span.style.setProperty("background-color", "hsl(0, 0%, 100%)")
            }
        })

        document.querySelectorAll(".keys .fn").forEach(ele => {
            ele.style.setProperty("background-color", "hsl(185, 42%, 37%)")
            ele.style.setProperty("box-shadow", "0 3px hsl(185, 58%, 25%)")
            ele.onmouseout = function () {
                ele.style.setProperty("background-color", "hsl(185, 42%, 37%)")
                ele.style.setProperty("box-shadow", "0 3px hsl(185, 58%, 25%)")
            }


            ele.onmouseover = function () {

                ele.style.setProperty("background-color", "rgb(94 162 169)")
            }

        })
        document.querySelector(".equal").style.setProperty("background-color", "hsl(25, 98%, 40%)")
        document.querySelector(".equal").style.setProperty("box-shadow", "0 3px hsl(25, 99%, 27%)")
        document.querySelector(".equal").onmouseout = function () {
            document.querySelector(".equal").style.setProperty("background-color", "hsl(25, 98%, 40%)")
            document.querySelector(".equal").style.setProperty("box-shadow", "0 3px hsl(25, 99%, 27%)")
        }
        document.querySelector(".equal").onmouseover = function () {

            document.querySelector(".equal").style.setProperty("background-color", "rgb(228 139 76)")
        }


    }

}




function darkToggle() {

    if (darkMode.classList.contains("active")) {
        window.localStorage.setItem("lightMode", darkMode.textContent)
        document.querySelector("body").style.setProperty("background-color", "hsl(222, 26%, 31%)")
        document.querySelector(".header").style.setProperty("color", "hsl(0, 0%, 100%)")
        document.querySelector(".choice").style.setProperty("background-color", "hsl(223, 31%, 20%)")
        document.querySelector(".screen").style.setProperty("background-color", "hsl(224, 36%, 15%)")
        document.querySelector(".screen").style.setProperty("color", "hsl(0, 0%, 100%)")
        document.querySelector(".equation").style.setProperty("color", "hsl(0, 0%, 100%)")
        document.querySelector(".keys").style.setProperty("background-color", " hsl(223, 31%, 20%)")
        document.querySelectorAll(".keys span").forEach(span => {
            span.style.setProperty("background-color", "hsl(30, 25%, 89%)")
            span.style.setProperty("box-shadow", " 0 3px hsl(28, 16%, 65%)")
            span.onmouseout = function () {
                span.style.setProperty("background-color", "hsl(30, 25%, 89%)")

            }
            span.onmouseover = function () {

                span.style.setProperty("background-color", "hsl(0, 0%, 100%)")
            }
        })

        document.querySelectorAll(".keys .fn").forEach(ele => {
            ele.style.setProperty("background-color", "hsl(225, 21%, 49%)")
            ele.style.setProperty("box-shadow", "0 3px hsl(224, 28%, 35%)")
            ele.onmouseout = function () {
                ele.style.setProperty("background-color", "hsl(225, 21%, 49%)")
                ele.style.setProperty("box-shadow", "0 3px hsl(224, 28%, 35%)")
            }


            ele.onmouseover = function () {

                ele.style.setProperty("background-color", "hsl(225deg 29.93% 74.12%)")
            }


        })

        document.querySelector(".equal").style.setProperty("background-color", "hsl(6, 63%, 50%)")
        document.querySelector(".equal").style.setProperty("box-shadow", "0 3px  hsl(6, 70%, 34%)")

        document.querySelector(".equal").onmouseout = function () {
            document.querySelector(".equal").style.setProperty("background-color", "hsl(6, 63%, 50%)")
            document.querySelector(".equal").style.setProperty("box-shadow", "0 3px  hsl(6, 70%, 34%)")
        }
        document.querySelector(".equal").onmouseover = function () {

            document.querySelector(".equal").style.setProperty("background-color", " hsl(6deg 79.54% 64.41%)")
        }
    }
}



// =============================================================================================================

// using keyboard keys 
let currentInputKey = ""
let currentOperationKey = ""

document.addEventListener("keydown", function (e) {

    // calculations

    if (!isNaN(e.key)) {

        currentInput += e.key
        // equation.value = currentInputKey

        console.log(currentInputKey)
    } else if (e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*") {

        currentOperationKey = e.key
        currentInput += currentOperationKey

        console.log(currentOperationKey)
    } else if (e.key === "Enter") {

        result.innerHTML = eval(currentInput).toLocaleString()
        window.localStorage.setItem(result.innerHTML, "answer")
    } else if (e.key === "Backspace") {

        currentInput = currentInput.slice(0, -1)

    } else if (e.key === "Delete") {

        equation.value = ""

        result.innerHTML = "0"

        currentInput = ""
    }
})

// =============================================================================================================
// history

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("equal")) {

        window.localStorage.setItem(result.innerHTML, "answer")

    } else if (!e.target.classList.contains("restore") && !e.target.classList.contains("hist")) {

        document.querySelector(".history").classList.remove("active")


    }

})
document.addEventListener("dblclick", function (e) {

    if (e.target.classList.contains("restore")) {

        for (let [key, value] of Object.entries(localStorage)) {

            let exitKey = Array.from(document.querySelector(".history").children).map(span =>
                span.textContent
            )

            if (value === "answer" && !exitKey.includes(key)) {



                let newSpan = document.createElement("span")

                let spanText = document.createTextNode(key)

                newSpan.className = "hist"

                newSpan.appendChild(spanText)

                document.querySelector(".history").appendChild(newSpan)
            }

        }
        document.querySelector(".history").classList.add("active")


    }
})