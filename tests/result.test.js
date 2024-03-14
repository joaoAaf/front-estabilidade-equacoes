const { createLine, createCol, msgResult, getResult } = require('../result')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>')

// Definindo os objetos globais para serem usados nos testes
global.document = window.document
global.window = window
global.navigator = {
    userAgent: 'node.js',
}

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