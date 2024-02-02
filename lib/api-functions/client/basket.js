const addToTemporaryBasket = async (productId) => {
  const basketItems =
    (await JSON.parse(localStorage.getItem('temporaryBasket'))) || [];
    console.log(basketItems)
  basketItems.push(productId);
  localStorage.setItem('temporaryBasket', JSON.stringify(basketItems));
};

export default addToTemporaryBasket;
