require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const { ENDPOINTS } = require('../mocks/fetchSimulator');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('Testa se quando a função fetchProducts recebe um produto como parâmetro a função fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa se quando a função fetchProducts recebe um produto como parâmetro a função fetch tem o comportamento esperado', () => {
    fetchProducts('computador');
    const { SEARCH } = ENDPOINTS;
    expect(fetch).toHaveBeenCalledWith(SEARCH);
  });

  test('Testa se quando a função fetchProducts recebe um produto como parâmetro tem o retorno esperado', async () => {
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch);
  });

  test("Testa se, quando a função fetchProducts NÃO recebe parâmetro, a mensagem 'You must provide an url' é retornada", async () => {
    const expected = await fetchProducts();
    expect(expected).toEqual(new Error('You must provide an url'))
  });
});
