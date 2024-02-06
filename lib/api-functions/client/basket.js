export const addToTemporaryBasket = async (productId) => {
  const basketItems =
    (await JSON.parse(localStorage.getItem('temporaryBasket'))) || [];
  basketItems.push(productId);
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
  window.dispatchEvent(new Event('storage'));
};

// function to handle adding to temporary basket or user basket
export const addToBasketHandler = ({
  productId,
  user,
  addToBasketMutateFn,
  queryClient,
}) => {
  // check if user is logged in
  if (user) {
    // if user is logged in add the product to the basket
    addToBasketMutateFn.mutate(productId);
    queryClient.invalidateQueries({ queryKey: ['basket']});
    console.log('added to basket')
  } else {
    // if user is not logged in add the product to the temporary basket
    addToTemporaryBasket(productId);
    console.log('added to basket')
    queryClient.invalidateQueries({ queryKey: ['basket']});
  }
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

export const removeFromBasketHandler = ({
  productId,
  user,
  removeFromBasketMutateFn,
  queryClient,
}) => {
  // check if user is logged in
  if (user) {
    // if user is logged in add the product to the basket
    removeFromBasketMutateFn.mutate(productId);
  } else {
    // if user is not logged in add the product to the temporary basket
    removeFromTemporaryBasket(productId);
    queryClient.invalidateQueries({ queryKey: ['basket'] });
  }
};

export const getStoredProductIds = () => {
  const ids = localStorage.getItem('temporaryBasket');
  return ids ? JSON.parse(ids) : [];
};
