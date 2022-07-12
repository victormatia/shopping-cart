const fetchItem = async (code) => {
  try {
    const url = `https://api.mercadolibre.com/items/${code}`;
    const response = await fetch(url);
    const obj = await response.json();

    return obj;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
