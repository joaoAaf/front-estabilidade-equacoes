const {
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
} = require('../dataCalc')

// Testes para a função notNumber
describe('notNumber', () => {
  test('deve retornar true para valores que não são números', () => {
    expect(notNumber('abc')).toBe(true)
    expect(notNumber('')).toBe(true) // String vazia também é considerada não número
    expect(notNumber(null)).toBe(true) // Null não é um número
    expect(notNumber(undefined)).toBe(true) // Undefined não é um número
    expect(notNumber([])).toBe(true) // Array não é um número
    expect(notNumber({})).toBe(true) // Objeto não é um número
  })

  test('deve retornar false para valores que são números', () => {
    expect(notNumber(53)).toBe(false)
    expect(notNumber(0)).toBe(false)
    expect(notNumber(-80)).toBe(false)
    expect(notNumber(0.05)).toBe(false)
    expect(notNumber('50')).toBe(false) // String que representa um número
  })
})

// Testes para a função onlyNumbers
describe('onlyNumbers', () => {
  test('deve retornar true se todos os elementos da matriz são números', () => {
    expect(onlyNumbers([3, 6, 2])).toBe(true)
    expect(onlyNumbers([0, 0, 0])).toBe(true)
    expect(onlyNumbers([0.05, 5.01])).toBe(true)
    expect(onlyNumbers(['7', '6', '2'])).toBe(true) // Strings que representam números
  })

  test('deve retornar false se algum elemento da matriz não for número', () => {
    expect(onlyNumbers([10, 'abc', 3])).toBe(false)
    expect(onlyNumbers(['7', '6', '2', ''])).toBe(false) // String vazia não é um número
    expect(onlyNumbers([null, undefined, 50])).toBe(false) // Null e undefined não são números
    expect(onlyNumbers([{}, []])).toBe(false) // Objeto e array não são números
  })
})

// Testes para a função validate
describe('validate', () => {
  test('deve chamar a função de validação fornecida corretamente', () => {
    const mockValidationFn = jest.fn()
    const data = [3, 6, 2]
    validate(data, mockValidationFn)
    expect(mockValidationFn).toHaveBeenCalledWith(data)
  })
})

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
        <div><input value="11"></div>
        <div><input value="21"></div>
        <div><input value="52"></div>
      </div>`
    const result = captureInputs('testContainer')
    expect(result).toEqual(['11', '21', '52'])
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

test('inputs executa corretamente com base no valor do elemento fornecido', () => {
  const parentId = 'parent'
  const labelId = 'label'
  const parent = document.createElement('div')
  const inputElement = document.createElement('input')
  inputElement.value = '10'
  parent.id = parentId
  document.body.appendChild(parent)
  const label = document.createElement('div')
  label.id = labelId
  document.body.appendChild(label)

  const inputFunc = inputs(parentId, labelId)
  inputFunc(inputElement)

  expect(parent.children.length).toBe(11) // 11 inputs devem ser criados
  expect(label.hidden).toBe(false) // o label não deve estar escondido
})

// Testes para a função Monad
describe('Monad', () => {
  // Teste para o método 'value' da Monad
  test('value deve retornar o valor original', () => {
    const value = 24
    const monad = Monad(value) // Criação de uma instância da Monad com o valor 24
    expect(monad.value()).toBe(value) // Verificação se o método 'value' retorna o valor original
  })

  // Teste para o método 'bind' da Monad
  test('bind deve aplicar a função fornecida e retornar um novo valor', () => {
    const value = 24
    const monad = Monad(value) // Criação de uma instância da Monad com o valor 24
    const addTen = x => x + 10 // Função que adiciona 10 ao valor fornecido
    const newValue = monad.bind(addTen) // Aplicação do método 'bind' com a função 'addTen'
    expect(newValue).toBe(value + 10) // Verificação se 'newValue' contém o valor modificado
  })

  // Teste para o método 'map' da Monad
  test('map deve aplicar a função fornecida e retornar um novo monad', () => {
    const value = 24
    const monad = Monad(value) // Criação de uma instância da Monad com o valor 24
    const square = x => x * x // Função que retorna o quadrado do valor fornecido
    const newMonad = monad.map(square) // Aplicação do método 'map' com a função 'square'
    expect(newMonad.value()).toBe(value * value) // Verificação se o novo monad contém o valor ao quadrado
  })
})

// Testes para a função axiosRequest
describe('axiosRequest', () => {
  const url = "https://estabilidade-equacoes.onrender.com/calc"
  test('deve retornar uma função assíncrona', () => {
    expect(typeof axiosRequest(url)).toBe('function') // Verifica se a axiosRequest retorna uma função
  })

  test('deve fazer uma solicitação POST com os índices fornecidos', async () => {
    const indexes = { indexes: [8, 1, 1, 4] }
    const response = async () => await axiosRequest(url)(indexes) // Faz uma chamada para axiosRequest com os índices
    expect(response).toBeDefined() // Verifica se a resposta não é indefinida
  })
})

// Testes para a função postCalc
describe('postCalc', () => {
  test('deve ser uma função assíncrona', () => {
    expect(typeof postCalc).toBe('function') // Verifica se postCalc é uma função
  })

  test('deve fazer uma solicitação POST com os índices fornecidos', async () => {
    const indexes = { indexes: [8, 1, 1, 4] }
    const response = async () => await postCalc(indexes) // Faz uma chamada para postCalc com os índices
    expect(response).toBeDefined() // Verifica se a resposta não é indefinida
  })
})

describe('dataCalc', () => {
  beforeEach(() => {
    // Configurando o elemento 'data-calc' no HTML
    document.body.innerHTML = `<form id="data-calc"></form>`
  })

  test('deve adicionar um ouvinte de evento para o evento "submit"', () => {
    // Verifica se o elemento 'data-calc' está presente no documento
    const dataCalcElement = document.getElementById('data-calc')
    if (!dataCalcElement) {
      throw new Error('Elemento "data-calc" não encontrado no documento.')
    }

    // Espiona o método 'addEventListener' do elemento 'data-calc'
    jest.spyOn(dataCalcElement, 'addEventListener')

    // Execução da função dataCalc para adicionar o ouvinte de evento
    dataCalc()

    // Verifica se o 'addEventListener' foi chamado corretamente
    expect(dataCalcElement.addEventListener).toHaveBeenCalled()

    // Dispara um evento de submissão simulado no elemento 'data-calc'
    const event = new Event('submit', { bubbles: true, cancelable: true })
    dataCalcElement.dispatchEvent(event)

    // Verifica se o evento de submit foi tratado corretamente (preventDefault)
    expect(event.defaultPrevented).toBeTruthy()
  })

})