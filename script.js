// ways ---------------------------------------------------------

const wayToTotalPrice = document.querySelector('.total-price');
const wayToCart = document.querySelector('.cart__items');
// const wayToAddBtns = document.getElementsByClassName('item__add');
const wayToItems = document.querySelector('.items');
const wayToEmptyCartBtn = document.querySelector('.empty-cart');

// --------------------------------------------------------------

const reduceDataResults = async () => { // Promise!
  const data = await fetchProducts('computador');
  const { results } = data;
  return results.reduce((acc, result) => {
    acc.push({
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    });
    return acc;
  }, []);
};

const reduceDataItem = async (id) => { // Promise!
  const data = await fetchItem(id);
  
  return {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => { // id, site_id e thumb
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const subPriceItems = (price) => {
  const currentAmount = parseFloat(wayToTotalPrice.innerText);
  const adjust = currentAmount - price;
  wayToTotalPrice.innerText = adjust;
};

const removeItemToCart = (event) => {
  wayToCart.removeChild(event.target);
  localStorage.cartItems = wayToCart.innerHTML;
};

const getPriceToRemovedItem = (event) => {
  const content = event.target.innerText;
  const indexOf$ = content.indexOf('$');
  const price = parseFloat(content.substring((indexOf$ + 1), content.length));
  return price;
};

const cartItemClickListener = (event) => {
  removeItemToCart(event);
  subPriceItems(getPriceToRemovedItem(event));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addListnersToItems = (element) => {
  const arr = Array.from(element.children); // O método Array.from() é utilizado para criar um novo array a partir de um array-like ou um objetos iterável. 
  arr.forEach((e) => e.addEventListener('click', cartItemClickListener));
};

const getCartSaveToLocalStorage = (element) => {
  const tag = element;
  tag.innerHTML = getSavedCartItems();
  addListnersToItems(wayToCart);
};

const removeLocalStorage = () => {
  localStorage.removeItem('cartItems');
};

const sumPriceItems = (price) => {
  const currentAmount = parseFloat(wayToTotalPrice.innerText);
  const adjust = currentAmount + price;
   wayToTotalPrice.innerText = adjust;
};

const addItemToCart = async (event) => {
  const currentId = event.target.parentElement.firstChild.innerText;
  const dataItem = await reduceDataItem(currentId);
  const price = dataItem.salePrice;
  sumPriceItems(price);

  wayToCart.appendChild(createCartItemElement(dataItem));
  removeLocalStorage();
  saveCartItems(wayToCart);
};

const createLoading = () => {
  const createTagP = document.createElement('p');
  createTagP.setAttribute('class', 'loading');
  createTagP.innerText = 'Carregando...';
  wayToItems.appendChild(createTagP);
};

createLoading();

const removeLoading = () => {
  const wayToLoading = document.querySelector('.loading');
  wayToItems.removeChild(wayToLoading);
};

reduceDataResults().then((response) => {
  removeLoading();

  response.forEach((e) => {
    const currentElement = createProductItemElement(e);
    const button = currentElement.lastChild;
    button.addEventListener('click', addItemToCart);
    wayToItems.appendChild(currentElement);
  });
});

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const emptyCart = () => {
  const cartItems = Array.from(wayToCart.children);
  cartItems.forEach((item) => {
    wayToCart.removeChild(item);
  });

  removeLocalStorage();
};

wayToEmptyCartBtn.addEventListener('click', emptyCart);

window.onload = () => {
  getCartSaveToLocalStorage(wayToCart);
};
