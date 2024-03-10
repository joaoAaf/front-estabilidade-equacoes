const dataCalc = document.getElementById("data-calc")

dataCalc.addEventListener("submit", event => {
    event.preventDefault()

    const bruteDada = captureInputs("indexes")
    const isValid = validate(bruteDada, onlyNumbers)

    const indexes = isValid && bruteDada.map(value => parseFloat(value))

    console.log(indexes)
})