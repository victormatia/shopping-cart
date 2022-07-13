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

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (event) => {
  const wayToCart = document.querySelector('.cart__items');
  const currentId = event.target.parentElement.firstChild.innerText;
  const dataItem = await reduceDataItem(currentId);

  wayToCart.appendChild(createCartItemElement(dataItem));
}; 

reduceDataResults().then((response) => {
  const wayToItems = document.querySelector('.items');

  response.forEach((e) => {
    const currentElement = createProductItemElement(e);
    currentElement.addEventListener('click', addItemToCart);
    wayToItems.appendChild(currentElement);
  });
});

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const wayToAddBtns = document.getElementsByClassName('item__add');

window.onload = () => {};
