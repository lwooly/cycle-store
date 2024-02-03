import { useUpdateUserBasket } from '@/lib/tq/baskets/mutations';
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect } from 'react';

function BasketUserManagement() {
  const { user } = useUser();
  const tempBasket = JSON.parse(localStorage.getItem('temporaryBasket')) || [];
  const updateUserBasket = useUpdateUserBasket()

  useEffect(() => {
    // user logged in and items in temp basket - update items in users basket
    if ({ user } && tempBasket.length > 0) {
      // make database call to update or create users basket
        updateUserBasket.mutate(tempBasket)
      // delete items from local storage basket
      localStorage.removeItem('temporaryBasket');
    }
  });

  return <div></div>;
}

export default BasketUserManagement;
