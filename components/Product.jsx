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
import ReadMoreIcon from '@mui/icons-material/ReadMore';
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
    'https://plus.unsplash.com/premium_photo-1678727283319-c9358ad98c73?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
  };
  // style card content
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

  const imagePaddingStyles = summary
    ? { paddingBottom: 'min(300px, 100%)' }
    : { paddingBottom: '60vh' };

  return (
    // <LinkWrapper link={link}>
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
        '&:hover': {
          backgroundColor: theme.palette.grey[100],
          '& .iconBtn': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      }}
    >
      <CardMedia
        sx={{
          width: '100%', // Make width responsive
          height: 0,
          // Limit the maximum size
          position: 'relative',
          ...imagePaddingStyles,
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
          sizes="50vh"
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
          <Heading component="h2" variant={headingLevel}>
            {title}
          </Heading>

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

          {link && (
            <IconButton
              className="iconBtn"
              aria-label="Link to product page"
              href={link}
              sx={{
                fontSize: '2rem',
                position: 'absolute',
                bottom: '200px',
                right: '20px',
                colour: 'white',
                backgroundColor: {
                  xs: theme.palette.primary.main,
                  md: theme.palette.grey[400],
                },

                '&:hover': {
                  scale: '1.05',
                },
              }}
              variant="contained"
            >
              <ReadMoreIcon fontSize="inherit" sx={{ color: 'white' }} />
            </IconButton>
          )}

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
    // </LinkWrapper>
  );
}

export default Product;
