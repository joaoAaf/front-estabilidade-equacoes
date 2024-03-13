const { createInput, countArray, hidden, returnAllChildren, captureInputs, removeAllChildren } = require('../inputs')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>')
const { document } = window

// Definindo os objetos globais para serem usados nos testes
global.document = document
global.window = window
global.navigator = {
    userAgent: 'node.js',
}

// Testes para a função createInput
describe('createInput', () => {
    test('deve criar um input com as configurações corretas', () => {
        document.body.innerHTML = '<div id="testContainer"></div>'
        createInput('testContainer')
        const input = document.querySelector('#testContainer input')
        expect(input).toBeTruthy()
        expect(input.type).toBe('number')
        expect(input.required).toBe(true)
        expect(input.step).toBe('.0001')
        expect(input.classList.contains('form-control')).toBe(true)
    })
})

// Testes para a função countArray
describe('countArray', () => {
    test('deve retornar um array preenchido com zeros', () => {
        const result = countArray(5)
        expect(result).toHaveLength(5)
        expect(result.every(val => val === 0)).toBe(true)
    })

    test('deve retornar um array preenchido com zeros e um elemento adicional', () => {
        const result = countArray(5, 1)
        expect(result).toHaveLength(6)
        expect(result.every(val => val === 0)).toBe(true)
    })
})

// Testes para a função hidden
describe('hidden', () => {
    test('deve ocultar o elemento', () => {
        document.body.innerHTML = '<div id="testContainer"></div>'
        hidden('testContainer', true)
        const element = document.getElementById('testContainer')
        expect(element.hidden).toBe(true)
    })

    test('deve exibir o elemento', () => {
        document.body.innerHTML = '<div id="testContainer" hidden></div>'
        hidden('testContainer', false)
        const element = document.getElementById('testContainer')
        expect(element.hidden).toBe(false)
    })
})

// Testes para a função returnAllChildren
describe('returnAllChildren', () => {
    test('deve retornar uma lista dos filhos do elemento', () => {
        document.body.innerHTML = '<div id="testContainer"><span>Child 1</span><span>Child 2</span></div>'
        const children = returnAllChildren('testContainer')
        expect(children).toHaveLength(2)
        expect(children.every(child => child.tagName === 'SPAN')).toBe(true)
    })

    test('deve retornar uma lista vazia se o elemento não existir', () => {
        const children = returnAllChildren('nonexistentContainer')
        expect(children).toEqual([])
    })
})

// Testes para a função captureInputs
describe('captureInputs', () => {
    test('deve retornar uma lista dos valores dos inputs', () => {
        document.body.innerHTML = `
      <div id="testContainer">
        <div><input value="10"></div>
        <div><input value="20"></div>
        <div><input value="30"></div>
      </div>`
        const result = captureInputs('testContainer')
        expect(result).toEqual(['10', '20', '30'])
    })
})

// Testes para a função removeAllChildren
describe('removeAllChildren', () => {
    test('deve remover todos os filhos do elemento', () => {
        document.body.innerHTML = '<div id="testContainer"><span>Child 1</span><span>Child 2</span></div>'
        removeAllChildren('testContainer')
        const children = document.querySelectorAll('#testContainer span')
        expect(children).toHaveLength(0)
    })
})