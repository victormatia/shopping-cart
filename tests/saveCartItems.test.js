const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  
  test('Testa se, ao executar saveCartItems com um argumento específico, o método localStorage.setItem é chamado;', () => {
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test('Testa se, ao executar saveCartItems com um argumento específico, o método localStorage.setItem é chamado com dois parâmetros específicos;', () => {
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', param);
  })
});
