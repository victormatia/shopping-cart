require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const { ENDPOINTS } = require('../mocks/fetchSimulator');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('Testa se, ao chamar fetchItem com um parâmetro específico, fetch é executada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('Testa se, ao chamar fetchItem com um parâmetro específico, fetch é executada com a url esperada', () => {
    fetchItem('MLB1615760527');
    const { ITEM } = ENDPOINTS;
    expect(fetch).toHaveBeenCalledWith(ITEM);
  })

  test('Testa se, ao chamar fetchItem com um parâmetro específico, o retorno é o esperado',  async () => {
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  })

  test('Testa se, ao chamar fetchItem sem um parâmetro, retorna um erro',  async () => {
    const expected = await fetchItem();
    expect(expected).toEqual(new Error('You must provide an url'));
  })
});
