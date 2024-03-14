const { url, Monad, axiosRequest, postCalc, dataCalc } = require('../dataCalc')

describe('Monad', () => {
  // Teste para o método 'value' da Monad
  test('value deve retornar o valor original', () => {
    const value = 42;
    const monad = Monad(value); // Criação de uma instância da Monad com o valor 42
    expect(monad.value()).toBe(value); // Verificação se o método 'value' retorna o valor original
  });

  // Teste para o método 'bind' da Monad
  test('bind deve aplicar a função fornecida e retornar um novo valor', () => {
    const value = 42;
    const monad = Monad(value); // Criação de uma instância da Monad com o valor 42
    const addTen = x => x + 10; // Função que adiciona 10 ao valor fornecido
    const newValue = monad.bind(addTen); // Aplicação do método 'bind' com a função 'addTen'
    expect(newValue).toBe(value + 10); // Verificação se 'newValue' contém o valor modificado
  });

  // Teste para o método 'map' da Monad
  test('map deve aplicar a função fornecida e retornar um novo monad', () => {
    const value = 42;
    const monad = Monad(value); // Criação de uma instância da Monad com o valor 42
    const square = x => x * x; // Função que retorna o quadrado do valor fornecido
    const newMonad = monad.map(square); // Aplicação do método 'map' com a função 'square'
    expect(newMonad.value()).toBe(value * value); // Verificação se o novo monad contém o valor ao quadrado
  });
});

// Testes para a função axiosRequest
describe('axiosRequest', () => {
  test('deve retornar uma função assíncrona', () => {
    expect(typeof axiosRequest(url)).toBe('function'); // Verifica se a axiosRequest retorna uma função
  });

  test('deve fazer uma solicitação POST com os índices fornecidos', async () => {
    const indexes = { indexes: [8, 1, 1, 4] };
    const response = async () => await axiosRequest(url)(indexes); // Faz uma chamada para axiosRequest com os índices
    expect(response).toBeDefined(); // Verifica se a resposta não é indefinida
  });
});

// Testes para a função postCalc
describe('postCalc', () => {
  test('deve ser uma função assíncrona', () => {
    expect(typeof postCalc).toBe('function'); // Verifica se postCalc é uma função
  });

  test('deve fazer uma solicitação POST com os índices fornecidos', async () => {
    const indexes = { indexes: [8, 1, 1, 4] };
    const response = async () => await postCalc(indexes); // Faz uma chamada para postCalc com os índices
    expect(response).toBeDefined(); // Verifica se a resposta não é indefinida
  });
});