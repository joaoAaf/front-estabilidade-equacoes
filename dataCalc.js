const url = "http://localhost:8080/calc"
const dataCalc = document.getElementById("data-calc")

dataCalc.addEventListener("submit", event => {
    event.preventDefault()

    const bruteDada = captureInputs("indexes")
    const isValid = validate(bruteDada, onlyNumbers)

    const postCalc = isValid && async function () {
        const indexes = {
            indexes: bruteDada.map(value => parseFloat(value))
        }

        return await axios.post(url, indexes)
    }

    // implementação de monad utilizado-se de promise
    postCalc()
        .then(response => {
            console.log(response)
            return response.data
        })
        .then(response => {
            console.log(response)
            sessionStorage.setItem('result', JSON.stringify(response))
            window.location.href = "/result.html"
        })
        .catch(error => console.log(error))
})