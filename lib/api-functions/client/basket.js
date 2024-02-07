import { USER_OWN_BASKET_STORAGE_KEY } from '@/lib/tq/baskets/settings';

export const addToTemporaryBasket = (productId) => {
  const basketItems = JSON.parse(localStorage.getItem('temporaryBasket')) || [];
  basketItems.push(productId);
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
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
  } else {
    // if user is not logged in add the product to the temporary basket
    addToTemporaryBasket(productId);
    // invalidate tan stack query to refetch state
    queryClient.invalidateQueries({ queryKey: [USER_OWN_BASKET_STORAGE_KEY] });
  }
};

export const removeFromTemporaryBasket = (productId) => {
  // find index of product
  const basketItems = JSON.parse(localStorage.getItem('temporaryBasket'));
  // remove from array
  const i = basketItems.indexOf(productId);
  if (i > -1) {
    basketItems.splice(i, 1);
  }
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
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
    queryClient.invalidateQueries({ queryKey: [USER_OWN_BASKET_STORAGE_KEY] });
  }
};

export const getStoredProductIds = () => {
  const ids = localStorage.getItem('temporaryBasket');
  return ids ? JSON.parse(ids) : [];
};
