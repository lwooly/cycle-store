import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dinero, toDecimal } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  EditIcon,
  DeleteIcon,
  Typography,
  Box,
} from '@/components/mui';
import Heading from '@/components/Heading';
import {
  useAddToBasket,
  useRemoveFromBasket,
} from '@/lib/tq/baskets/mutations';
import { formatPrice, slugify } from '@/lib/utils/formatters';
import {
  addToBasketHandler,
  getNumberInBasket,
  removeFromBasketHandler,
} from '@/lib/api-functions/client/basket';
import { useQueryClient } from '@tanstack/react-query';
import { useUserOrTempBasket } from '@/lib/tq/baskets/queries';
import { useTheme } from '@emotion/react';
import { UIContext } from './contexts/UI.context';

function Product({
  values: { _id, title, description, price, quantity: quantityInStock, image }, // favorites,
  linkToProductPage,
  headingLevel = 'h2',
  summary = false,
  // eslint-disable-next-line no-console
  removeHandler = () => console.log('no delete handler provided'),
  userProductPermissions,
  inBasket,
}) {
  const [imageSrc, setImageSrc] = useState(image);
  const user = useUser();
  const queryClient = useQueryClient();
  const { showMessage } = useContext(UIContext);
  const theme = useTheme();

  // determine stock
  const { data: basket } = useUserOrTempBasket({ user });
  const productBasketQuantity = getNumberInBasket({ basket, _id });

  const {
    // canAdd = false,
    canUpdate = false,
    canRemove = false,
  } = userProductPermissions || {};

  const defaultImgSrc =
    'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const errorHandler = (error) => {
    // eslint-disable-next-line no-console
    console.log('Default to backup image', error);
    setImageSrc(defaultImgSrc);
  };

  // Add product to basket
  const addToBasketMutate = useAddToBasket();

  // Remove product from basket
  const removeFromBasketMutate = useRemoveFromBasket();

  let link = '';
  if (linkToProductPage) {
    link = `/products/${slugify(title, _id)}`;
  }

  let cardContentStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };
  //style card content
  if (!summary) {
    cardContentStyles = {
      paddingX: { sm: '2rem' },
      maxWidth: '1200px',
      margin: { sm: '0 auto' },
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    };
  }
  return (
    <Card
      component="div"
      sx={{
        width: '100%',
        borderRadius: 0,
        borderShadow: 'none',
        height: '100%',
        padding: '0',
        gutters: '0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        sx={{
          width: '100%', // Make width responsive
          height: 0,
          // Limit the maximum size
          position: 'relative',
          paddingBottom: 'min(300px, 100%)',
          // Equal to width for a square aspect ratio
          overflow: 'hidden',
          // flexGrow: 1,
          // minWidth: { md: "30vw" },
          //   border: '3px solid #000',
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          onError={errorHandler}
          sizes="50%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            maxWidth: '100%',
          }}
        />
      </CardMedia>
      <Box sx={cardContentStyles}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingY: '0.5rem',
          }}
        >
          {!linkToProductPage ? (
            <Heading component="h2" variant={headingLevel}>
              {title}
            </Heading>
          ) : (
            <a
              href={link}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Link to product page"
              color="black"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              <Heading component="h2" variant={headingLevel}>
                {title}
              </Heading>
            </a>
          )}
          {!summary && <Typography>About: {description}</Typography>}
          <Typography variant="body2">
            {' '}
            {formatPrice(
              toDecimal(dinero({ amount: price * 100, currency: GBP })),
            )}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'space-between', sm: 'start' },
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: '0.85em', paddingInlineEnd: '2rem' }}
            >
              In Stock: {quantityInStock}
            </Typography>

            <Typography variant="body2" sx={{ fontSize: '0.85em' }}>
              In cart: {productBasketQuantity}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            marginTop: 'auto',
            paddingBottom: { sm: '1rem' },
          }}
        >
          <Button
            sx={{ color: 'white' }}
            variant="contained"
            onClick={() => {
              addToBasketHandler({
                productId: _id,
                user: user.user,
                addToBasketMutateFn: addToBasketMutate,
                queryClient,
              });
              showMessage({
                type: 'success',
                string: 'Product added to cart!',
              });
            }}
            disabled={quantityInStock <= productBasketQuantity}
          >
            Add to cart
          </Button>

          {inBasket && productBasketQuantity > 0 && (
            <Button
              aria-label="remove product from basket"
              sx={{ color: 'white' }}
              variant="contained"
              onClick={() => {
                removeFromBasketHandler({
                  productId: _id,
                  user: user.user,
                  removeFromBasketMutateFn: removeFromBasketMutate,
                  queryClient,
                });
                showMessage({
                  type: 'success',
                  string: 'Product removed from cart!',
                });
              }}
            >
              Remove from cart
            </Button>
          )}
          {canUpdate && (
            <IconButton
              variant="contained"
              aria-label="update"
              href={`/admin/products/update/${_id}`}
              component={Link}
            >
              <EditIcon />
            </IconButton>
          )}

          {canRemove && (
            <IconButton
              variant="contained"
              aria-label="delete"
              onClick={() => removeHandler(_id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}

export default Product;
