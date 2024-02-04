import { useUpdateUserBasket } from '@/lib/tq/baskets/mutations';
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect } from 'react';

function BasketUserManagement() {
  const { user } = useUser();
  const updateUserBasket = useUpdateUserBasket();

  useEffect(() => {
    // get basket from local storage
    const tempBasketItemIds =
      JSON.parse(localStorage.getItem('temporaryBasket')) || null;
    console.log(tempBasketItemIds);
    // user logged in and items in temp basket - update items in users basket
    if (user && tempBasketItemIds) {
      // make database call to update or create users basket
      updateUserBasket.mutate(tempBasketItemIds);
      // delete items from local storage basket
      localStorage.removeItem('temporaryBasket');
    }
  }, [user]);

  return <div className="basketStateManagement"></div>;
}

export default BasketUserManagement;
