import { useState } from 'react';
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
      <CardContent>
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
          >
            <Heading component="h2" variant={headingLevel}>
              {title}
            </Heading>
          </a>
        )}

        {!summary && <Typography>About: {description}</Typography>}
        <Typography variant="body1">
          Price:{' '}
          {formatPrice(
            toDecimal(dinero({ amount: price * 100, currency: GBP })),
          )}
        </Typography>
        <Typography variant="body2">In Stock: {quantityInStock}</Typography>

        <Typography variant="body2">
          In cart: {productBasketQuantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() =>
            addToBasketHandler({
              productId: _id,
              user: user.user,
              addToBasketMutateFn: addToBasketMutate,
              queryClient,
            })
          }
          disabled={quantityInStock <= productBasketQuantity}
        >
          Add to cart
        </Button>

        {inBasket && productBasketQuantity > 0 && (
          <Button
            aria-label="remove product from basket"
            variant="contained"
            onClick={() =>
              removeFromBasketHandler({
                productId: _id,
                user: user.user,
                removeFromBasketMutateFn: removeFromBasketMutate,
                queryClient,
              })
            }
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
    </Card>
  );
}

export default Product;
