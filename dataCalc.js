const url = "https://estabilidade-equacoes.onrender.com/calc"
const dataCalc = document.getElementById("data-calc")

// criação de uma função monad Identity
const Monad = x => ({
    value: () => x,
    bind: f => f(x),
    map: f => Monad(f(x))
})

// utilizado-se de closure para capturar o valor variavel "url" de dentro
// do escopo da função "axiosRequest"
const axiosRequest = url => async indexes => await axios.post(url, indexes)

const postCalc = axiosRequest(url)

dataCalc.addEventListener("submit", event => {
    event.preventDefault()

    const bruteDada = captureInputs("indexes")
    
    // implentação da função monad para encadear as chamadas de funções
    const data = Monad(bruteDada)
    data.map(bruteDada => validate(bruteDada, onlyNumbers))
        .map(isValid => isValid && bruteDada)
        .map(bruteDada => {
            const indexes = {
                indexes: bruteDada.map(value => parseFloat(value))
            }
            return indexes
        })
        .bind(indexes => postCalc(indexes)
            .then(response => {
                sessionStorage.setItem('result', JSON.stringify(response.data))
                window.location.href = "/result.html"
            })
            .catch(error => console.log(error)))  
})