import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUserOrTempBasket } from '@/lib/tq/baskets/queries';
import { useUser } from '@auth0/nextjs-auth0/client';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `1.5px solid ${theme.palette.secondary.main}`,
    padding: '0 4px',
    backgroundColor: 'white',
  },
}));

export default function BasketIcon() {
  const user = useUser();
  const [badgeContent, setBadgeContent] = useState('');

  const { data: basket, isLoading, isError } = useUserOrTempBasket({ user });

  useEffect(() => {
    if (isError || (!basket?.items && isLoading)) {
      setBadgeContent(null);
    } else if (!isLoading && basket?.items) {
      setBadgeContent(basket.items.length);
    }
  }, [basket, isLoading, isError]);

  return (
    <IconButton aria-label="basket" href="/basket">
      {/* check that this works on the home page as well as the basket page */}
      <StyledBadge
        badgeContent={badgeContent}
        color="secondary"
        sx={{ fontSize: 'large' }}
      >
        <ShoppingCartIcon sx={{ color: 'white' }} />
      </StyledBadge>
    </IconButton>
  );
}
