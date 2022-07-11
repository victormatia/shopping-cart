const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  if (!product) return 'You must provide an url';  
  const fetchProduct = await fetch(url);
  const obj = await fetchProduct.json();
  return obj;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
