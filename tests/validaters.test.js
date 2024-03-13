const { notNumber, onlyNumbers, validate } = require('../validaters');

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