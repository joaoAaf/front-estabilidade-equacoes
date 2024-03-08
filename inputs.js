// todas as funções utilizadas são funções lambda
const createInput = elementId => {
    let div = document.getElementById(elementId)
    let inputDiv = document.createElement("div")
    let input = document.createElement("input")
    inputDiv.className = "col-md-2"
    input.type = "number"
    input.className = "form-control"
    inputDiv.appendChild(input)
    div.appendChild(inputDiv)
}

const countArray = (value, indexAdd = 0) => new Array(parseInt(value) + indexAdd).fill(0)

const hidden = (elementId, bool) => document.getElementById(elementId).hidden = bool

const removeAllChildren = elementId => {
    const element = document.getElementById(elementId)
    element && [...element.children].forEach(child => child.remove())
}
// função de alta ordem, pois retorna uma função como resultado
// implementa closure retornando uma função interna que se utiliza de
// variaveis do escopo da função externa
const inputs = (elementId, labelId) => {
    return element => {
        removeAllChildren(elementId)
        const exec = isNaN(element.value) || element.value == "" ?
            () => hidden(labelId, true) :
            () => {
                hidden(labelId, false)
                countArray(element.value, 1).forEach(() => createInput(elementId))
            }
        exec()
    }
}

const inputIndexes = inputs('indexes', 'label-indexes')