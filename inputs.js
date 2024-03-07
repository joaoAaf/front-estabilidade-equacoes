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

function inputIndexes (element, divId, labelId) {
    if (element.value != "") {
        for (let i = 0; document.getElementById(divId+i) != null; i++) {
            document.getElementById(divId).removeChild(document.getElementById(divId+i))
        }
        let grau = parseInt(element.value)
        for (let i = 0; i <= grau; i++) {
            createInput(divId, labelId, i)
        }
    } else {
        document.getElementById(labelId).hidden = true
        for (let i = 0; document.getElementById(divId+i) != null; i++) {
            document.getElementById(divId).removeChild(document.getElementById(divId+i))
        }
    }
}

/* const count = new Array(parseInt(element.value)) */