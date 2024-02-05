import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import { useUser } from '@auth0/nextjs-auth0/client';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.secondary.main}`,
    padding: '0 4px',
    backgroundColor: 'white',
  },
}));

export default function BasketIcon() {
  const [basketItems, setBasketItems] = useState([]);

  const {user, isLoading}= useUser();

  const runQuery = !!user && !isLoading;
  const { data, isLoading:isLoadingBasket } = useUserBasket({ runQuery });

  // useEffect to handle user logged in
  useEffect(() => {
    if (user && !isLoading && !isLoadingBasket && data && data.items) {
      setBasketItems(data.items);
    }
  }, [user, isLoading, data, isLoadingBasket]);

  // manage local storage to state updates
  useEffect(() => {
    // function to handle getting items from local storage
    const handleStorage = (event) => {
      if (!user) {
        const localBasket = JSON.parse(
          localStorage.getItem('temporaryBasket'),
        ) || {
          items: [],
        };
        setBasketItems(localBasket);
      }
    };

    // on first mount run handle storage
    handleStorage();

    // mount event listener for changes in storage
    window.addEventListener('storage', handleStorage);
    // cleanup
    return () => window.removeEventListener('storage', handleStorage);
  }, [user]);

  return (
    <IconButton aria-label="basket" href="/basket">
      {/* check that this works on the home page as well as the basket page */}
      <StyledBadge badgeContent={basketItems.length} color="secondary">
        <ShoppingCartIcon sx={{ color: 'white' }} />
      </StyledBadge>
    </IconButton>
  );
}
