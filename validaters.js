const notNumber = value => isNaN(value) || Array.isArray(value) || value === null || value === undefined || value === ''

const onlyNumbers = data => data.filter(value => notNumber(value)).length == 0

// implementa Função de continuação, pois permite encapsular
// seu comportamento seguinte
// função de alta ordem, pois recebe e retorna uma função como resultado
const validate = (data, fn) => fn(data)

module.exports = { notNumber, onlyNumbers, validate }