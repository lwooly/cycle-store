export const addToTemporaryBasket = async (productId) => {
  const basketItems =
    (await JSON.parse(localStorage.getItem('temporaryBasket'))) || [];
  basketItems.push(productId);
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
  window.dispatchEvent(new Event('storage'));
};

export const removeFromTemporaryBasket = async (productId) => {
  // find index of product
  const basketItems = await JSON.parse(localStorage.getItem('temporaryBasket'));
  // remove from array
  const i = basketItems.indexOf(productId);
  if (i > -1) {
    basketItems.splice(i, 1);
  }
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
  window.dispatchEvent(new Event('storage'));
};
