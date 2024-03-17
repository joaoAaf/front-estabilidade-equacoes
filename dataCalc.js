// todas as funções utilizadas no código são funções lambda
const notNumber = value => isNaN(value) || Array.isArray(value) || value === null || value === undefined || value === ''

const onlyNumbers = data => data.filter(value => notNumber(value)).length == 0

// implementa Função de continuação, pois permite encapsular
// seu comportamento seguinte
// função de alta ordem, pois recebe e retorna uma função como resultado
const validate = (data, fn) => fn(data)

const createInput = elementId => {
    let div = document.getElementById(elementId)
    let inputDiv = document.createElement("div")
    let input = document.createElement("input")
    inputDiv.className = "col-md-2"
    input.type = "number"
    input.className = "form-control"
    input.required = true
    input.step = ".0001"
    inputDiv.appendChild(input)
    div.appendChild(inputDiv)
}

const countArray = (value, indexAdd = 0) => new Array(parseInt(value) + indexAdd).fill(0)

const hidden = (elementId, bool) => document.getElementById(elementId).hidden = bool

const returnAllChildren = elementId => {
    const element = document.getElementById(elementId)
    return element != null ? [...element.children] : []
}

// implementa list comprehension por meio da função map, criando uma lista dos valores capturados
const captureInputs = elementId => returnAllChildren(elementId).map(child => child.children[0].value)

const removeAllChildren = elementId => returnAllChildren(elementId).forEach(child => child.remove())

// implementa closure retornando uma função interna que se utiliza de
// variaveis do escopo da função externa
const inputs = (elementId, labelId) => {
    return element => {
        removeAllChildren(elementId)
        const exec = notNumber(element.value) ?
            () => hidden(labelId, true) :
            () => {
                hidden(labelId, false)
                countArray(element.value, 1).forEach(() => createInput(elementId))
            }
        exec()
    }
}

// Utilização da função "inputIndexes" para encapsular
// o escopo da função "inputs"
const inputIndexes = inputs('indexes', 'label-indexes')

// criação de uma função monad Identity
const Monad = x => ({
    value: () => x,
    bind: f => f(x),
    map: f => Monad(f(x))
})

// utilizado-se de closure para capturar o valor variavel "url" de dentro
// do escopo da função "axiosRequest"
const axiosRequest = url => async indexes => await axios.post(url, indexes)

const postCalc = axiosRequest("https://estabilidade-equacoes.onrender.com/calc")

const dataCalc = () => {
    const dataCalcElement = document.getElementById("data-calc")
    if (!dataCalcElement) {
      throw new Error('Elemento "data-calc" não encontrado no documento.')
    }
  
    dataCalcElement.addEventListener("submit", event => {
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
  }

module.exports = {
    createInput,
    countArray,
    hidden,
    returnAllChildren,
    captureInputs,
    removeAllChildren,
    inputs,
    notNumber,
    onlyNumbers,
    validate,
    Monad,
    axiosRequest,
    postCalc,
    dataCalc
}