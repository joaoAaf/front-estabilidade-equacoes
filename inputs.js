const createInput = (divId, labelId, i) => {
    let div = document.getElementById(divId)
    let label = document.getElementById(labelId)
    let inputDiv = document.createElement("div")
    let input = document.createElement("input")
    label.hidden = false
    inputDiv.className = "col-md-2"
    input.type = "number"
    input.className = "form-control"
    inputDiv.id = divId + i
    inputDiv.appendChild(input)
    div.appendChild(inputDiv)
}

const removeAllInpus = (elementId, labelId) => {
    const element = document.getElementById(elementId)
    element && [...element.children].forEach(child => child.remove())
    document.getElementById(labelId).hidden = true
}

const inputIndexes = (element, elementId, labelId) => {
    const exec = isNaN(element.value) || element.value == "" ?
        () => removeAllInpus(elementId, labelId) :
        () => {
            removeAllInpus(elementId, labelId)
            const count = new Array(parseInt(element.value) + 1).fill(0)
            count.forEach((_, i) => createInput(elementId, labelId, i))
        }
    exec()
}