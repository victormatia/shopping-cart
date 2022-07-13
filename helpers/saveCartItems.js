const saveCartItems = (ol) => {
  const content = ol.innerHTML;
  localStorage.setItem('cartItems', content);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
