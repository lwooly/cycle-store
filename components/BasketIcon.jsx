import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUserBasket } from '@/lib/tq/baskets/queries';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function BasketIcon() {
  const { data: basket } = useUserBasket();
  return (
    <IconButton aria-label="basket" href="/basket">
      {/* check that this works on the home page as well as the basket page */}
      <StyledBadge badgeContent={basket?.items.length} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
