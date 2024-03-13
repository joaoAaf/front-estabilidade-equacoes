const result = JSON.parse(sessionStorage.getItem("result"))

const createLine = (msg = null) => {
    const tr = document.createElement('tr')
    tr.className = "align-middle"
    if (msg != null) {
        const td = document.createElement('td')
        const strong = document.createElement('strong')
        strong.innerHTML = msg
        td.colSpan = "3"
        td.appendChild(strong)
        tr.appendChild(td)
    }
    return tr
}

const createCol = (line, col1, col2 = null) => {
    const td = document.createElement('td')
    const p1 = document.createElement('p')
    p1.innerHTML = col1
    td.appendChild(p1)
    if (col2 != null) {
        const p2 = document.createElement('p')
        p2.innerHTML = col2
        td.appendChild(p2)
    }
    line.appendChild(td)
}

const msgResult = estable => {
    const text = estable ? "Estavel" : "Instavel"
    return `A Equação é ${text}`
}

const getResult = (result, elementId) => {
    const tboby = document.getElementById(elementId)
    result.calcs.forEach(calc => {
        const line = createLine()
        createCol(line, `k = ${calc.k}`)
        createCol(line, calc.matriz1.map(c => c.toFixed(4)).join(' '), calc.matriz2 && calc.matriz2.map(c => c.toFixed(4)).join(' '))
        createCol(line, parseFloat(calc.jmodule).toFixed(4))
        tboby.appendChild(line)
    })
    tboby.appendChild(createLine(msgResult(result.estable)))
}