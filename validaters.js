const notNumber = value => isNaN(value) || value.trim() === ''

const onlyNumbers = data => data.filter(value => notNumber(value)).length == 0

// implementa Função de continuação, pois permite encapsular
// seu comportamento seguinte
// função de alta ordem, pois recebe e retorna uma função como resultado
const validate = (data, fn) => fn(data)

module.exports = notNumber;