const { createInput, countArray, hidden, returnAllChildren, captureInputs, removeAllChildren, inputs, notNumber, onlyNumbers, validate } = require('../inputs')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>')
const { document } = window

// Definindo os objetos globais para serem usados nos testes
global.document = document
global.window = window
global.navigator = {
    userAgent: 'node.js',
}

// Testes para a função notNumber
describe('notNumber', () => {
    test('deve retornar true para valores que não são números', () => {
      expect(notNumber('abc')).toBe(true);
      expect(notNumber('')).toBe(true); // String vazia também é considerada não número
      expect(notNumber(null)).toBe(true); // Null não é um número
      expect(notNumber(undefined)).toBe(true); // Undefined não é um número
      expect(notNumber([])).toBe(true); // Array não é um número
      expect(notNumber({})).toBe(true); // Objeto não é um número
    });
  
    test('deve retornar false para valores que são números', () => {
      expect(notNumber(123)).toBe(false);
      expect(notNumber(0)).toBe(false);
      expect(notNumber(-123)).toBe(false);
      expect(notNumber(3.14)).toBe(false);
      expect(notNumber('123')).toBe(false); // String que representa um número
    });
  });
  
  // Testes para a função onlyNumbers
  describe('onlyNumbers', () => {
    test('deve retornar true se todos os elementos da matriz são números', () => {
      expect(onlyNumbers([1, 2, 3])).toBe(true);
      expect(onlyNumbers([0, 0, 0])).toBe(true);
      expect(onlyNumbers([3.14, 2.71])).toBe(true);
      expect(onlyNumbers(['1', '2', '3'])).toBe(true); // Strings que representam números
    });
  
    test('deve retornar false se algum elemento da matriz não for número', () => {
      expect(onlyNumbers([1, 'abc', 3])).toBe(false);
      expect(onlyNumbers(['1', '2', '3', ''])).toBe(false); // String vazia não é um número
      expect(onlyNumbers([null, undefined, 123])).toBe(false); // Null e undefined não são números
      expect(onlyNumbers([{}, []])).toBe(false); // Objeto e array não são números
    });
  });
  
  // Testes para a função validate
  describe('validate', () => {
    test('deve chamar a função de validação fornecida corretamente', () => {
      const mockValidationFn = jest.fn();
      const data = [1, 2, 3];
      validate(data, mockValidationFn);
      expect(mockValidationFn).toHaveBeenCalledWith(data);
    });
  });

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

test('inputs executa corretamente com base no valor do elemento fornecido', () => {
    const parentId = 'parent';
    const labelId = 'label';
    const parent = document.createElement('div');
    const inputElement = document.createElement('input');
    inputElement.value = '10';
    parent.id = parentId;
    document.body.appendChild(parent);
    const label = document.createElement('div');
    label.id = labelId;
    document.body.appendChild(label);

    const inputFunc = inputs(parentId, labelId);
    inputFunc(inputElement);

    expect(parent.children.length).toBe(11); // 11 inputs devem ser criados
    expect(label.hidden).toBe(false); // o label não deve estar escondido
});