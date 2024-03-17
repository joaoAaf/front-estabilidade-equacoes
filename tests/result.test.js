const { createLine, createCol, msgResult, getResult } = require('../result')

// Testes para a função createLine
test('createLine deve retornar um elemento tr com a classe correta', () => {
  const line = createLine()
  expect(line.tagName).toBe('TR')
  expect(line.className).toBe('align-middle')
})

test('createLine deve retornar um elemento tr com uma célula td filho contendo a mensagem fornecida', () => {
  const msg = 'Teste de mensagem'
  const line = createLine(msg)
  const td = line.querySelector('td')
  expect(td).toBeTruthy()
  expect(td.tagName).toBe('TD')
  expect(td.colSpan).toBe(3)
  const strong = td.querySelector('strong')
  expect(strong).toBeTruthy()
  expect(strong.innerHTML).toBe(msg)
})

// Testes para a função createCol
test('createCol deve criar um elemento td com o texto fornecido como conteúdo do primeiro parágrafo', () => {
  const line = document.createElement('tr')
  createCol(line, 'Texto 1')
  const td = line.querySelector('td')
  expect(td).toBeTruthy()
  const p1 = td.querySelector('p')
  expect(p1).toBeTruthy()
  expect(p1.innerHTML).toBe('Texto 1')
})

test('createCol deve criar um segundo parágrafo com o texto fornecido se um segundo parâmetro for fornecido', () => {
  const line = document.createElement('tr')
  createCol(line, 'Texto 1', 'Texto 2')
  const td = line.querySelector('td')
  const p2 = td.querySelectorAll('p')[1]
  expect(p2).toBeTruthy()
  expect(p2.innerHTML).toBe('Texto 2')
})

// Testes para a função msgResult
test('msgResult deve retornar uma mensagem de acordo com o argumento fornecido', () => {
  expect(msgResult(true)).toBe('A Equação é Estavel')
  expect(msgResult(false)).toBe('A Equação é Instavel')
})

describe('getResult', () => {
  beforeEach(() => {
    // Configurando o elemento 'table-body' no HTML
    document.body.innerHTML = `<table><tbody id="table-body"></tbody></table>`
    const result = {
      calcs: [
        { k: 0, matriz1: [7, 6, 2], matriz2: [2, 6, 7], jmodule: 0.21 },
        { k: 1, matriz1: [7.5, 6.4], jmodule: 0.51 }
      ],
      estable: false // Simulando que o resultado é instavel
    }
    sessionStorage.setItem('result', JSON.stringify(result))
  })

  test('deve criar linhas e colunas corretamente na tabela', () => {
    // Chamando a função getResult
    getResult('table-body')

    // Verificando se as linhas e colunas foram adicionadas corretamente na tabela
    const tbody = document.getElementById('table-body')
    const rows = tbody.querySelectorAll('tr')
    expect(rows.length).toBe(3) // 2 resultados + 1 linha para a mensagem
    expect(rows[0].querySelectorAll('td').length).toBe(3) // 3 colunas para o primeiro resultado
    expect(rows[1].querySelectorAll('td').length).toBe(3) // 3 colunas para o segundo resultado
  })

  test('deve adicionar corretamente a mensagem de resultado no final da tabela', () => {
    // Chamando a função getResult
    getResult('table-body')

    // Verificando se a mensagem de resultado foi adicionada corretamente no final da tabela
    const tbody = document.getElementById('table-body')
    const rows = tbody.querySelectorAll('tr')
    const lastRow = rows[rows.length - 1]
    const lastRowContent = lastRow.querySelector('td strong').innerHTML
    expect(lastRowContent).toBe('A Equação é Instavel')
  })
})