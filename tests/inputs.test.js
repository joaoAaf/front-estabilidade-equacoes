const { createInput } = require('../inputs');

test('createInput cria um novo input element corretamente', () => {
    const elementId = 'test-div';
    const parentDiv = document.createElement('div');
    parentDiv.id = elementId;
    document.body.appendChild(parentDiv);

    createInput(elementId);

    const inputDiv = document.getElementById(elementId).children[0];
    const inputElement = inputDiv.children[0];
    
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.type).toBe('number');
    expect(inputElement.className).toBe('form-control');
    expect(inputElement.required).toBe(true);
    expect(inputElement.step).toBe('.0001');
});
module.exports = {
    testEnvironment: 'jsdom',
  };

  const { countArray } = require('../inputs');

  test('countArray cria um array de comprimento correto', () => {
      const value = 5;
      const resultArray = countArray(value);
      
      expect(resultArray.length).toBe(value);
      expect(resultArray.every(element => element === 0)).toBe(true);
  });
  
  const { hidden } = require('../inputs');

test('hidden altera a visibilidade de um elemento corretamente', () => {
    const elementId = 'test-element';
    const testElement = document.createElement('div');
    testElement.id = elementId;
    document.body.appendChild(testElement);

    hidden(elementId, true);
    expect(testElement.hidden).toBe(true);

    hidden(elementId, false);
    expect(testElement.hidden).toBe(false);
});

const { returnAllChildren } = require('../inputs');

test('returnAllChildren retorna todos os filhos de um elemento corretamente', () => {
    const parentId = 'parent';
    const child1 = document.createElement('div');
    const child2 = document.createElement('span');
    child1.id = 'child1';
    child2.id = 'child2';
    const parent = document.createElement('div');
    parent.id = parentId;
    parent.appendChild(child1);
    parent.appendChild(child2);
    document.body.appendChild(parent);

    const result = returnAllChildren(parentId);
    
    expect(result.length).toBe(2);
    expect(result.map(child => child.id)).toEqual(['child1', 'child2']);
});

const { captureInputs } = require('../inputs');

// // Teste para a função captureInputs
// test('captureInputs captura os valores corretamente', () => {
//     const parentId = 'inputs-container';
//     const input1 = document.createElement('input');
//     input1.value = '10';
//     const input2 = document.createElement('input');
//     input2.value = '20';
//     document.getElementById(parentId).appendChild(input1);
//     document.getElementById(parentId).appendChild(input2);

//     const result = captureInputs(parentId);
    
//     expect(result).toEqual(['10', '20']);
// });

// const { removeAllChildren } = require('../inputs');

// test('removeAllChildren remove todos os filhos de um elemento corretamente', () => {
//     const parentId = 'parent';
//     const child1 = document.createElement('div');
//     const child2 = document.createElement('div');
//     const parent = document.createElement('div');
//     parent.id = parentId;
//     parent.appendChild(child1);
//     parent.appendChild(child2);
//     document.body.appendChild(parent);

//     removeAllChildren(parentId);
    
//     expect(parent.children.length).toBe(0);
// });

const { inputs } = require('../inputs');

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

    expect(parent.children.length).toBe(10); // 10 inputs devem ser criados
    expect(label.hidden).toBe(false); // o label não deve estar escondido
});
