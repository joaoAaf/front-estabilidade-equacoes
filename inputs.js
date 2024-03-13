// todas as funções utilizadas no código são funções lambda
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

module.exports = { createInput, countArray, hidden, returnAllChildren, captureInputs, removeAllChildren }