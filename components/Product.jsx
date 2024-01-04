import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dinero, toDecimal } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  EditIcon,
  DeleteIcon,
  ClearIcon,
} from '@/components/mui';
import Heading from '@/components/Heading';
import {
  useAddBasket,
  useAddToBasket,
  useRemoveFromBasket,
} from '@/lib/tq/baskets/mutations';
import { formatPrice, slugify } from '@/lib/utils/formatters';
import Paragraph from './Paragraph';

function Product({
  values: { _id, title, description, price, quantity, image, favorites },
  linkToProductPage,
  headingLevel = 'h2',
  removeHandler = () => console.log('no delete handler provided'),
  userProductPermissions,
  inBasket,
}) {
  const [imageSrc, setImageSrc] = useState(image);
  // const [showProductLink, setShowProductLink] = useState(false)

  const {
    // canAdd = false,
    canUpdate = false,
    canRemove = false,
  } = userProductPermissions || {};

  const defaultImgSrc =
    'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const errorHandler = (error) => {
    console.log('Default to backup image', error);
    setImageSrc(defaultImgSrc);
  };

  // Add product to basket
  const addToBasketMutate = useAddToBasket();

  const addToBasketHandler = (productId) => {
    addToBasketMutate.mutate(productId);
  };

  // Remove product from basket
  const removeFromBasketMutate = useRemoveFromBasket();

  const removeFromBasketHandler = (productId) => {
    removeFromBasketMutate.mutate(productId);
  };
  return (
    <Card component="div" sx={{ width: '100%', height: '500px' }}>
      <CardMedia sx={{ display: 'grid', placeContent: 'center' }}>
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={200}
          onError={errorHandler}
        />
      </CardMedia>
      <CardContent>
        <Heading component="h2" variant={headingLevel}>
          {title}
        </Heading>
        <Paragraph>About: {description}</Paragraph>
        <Paragraph>
          Price:{' '}
          {formatPrice(
            toDecimal(dinero({ amount: price * 100, currency: GBP })),
          )}
        </Paragraph>
        <Paragraph>In Stock: {quantity}</Paragraph>
        <Paragraph>Favorites: {favorites || 0}</Paragraph>
      </CardContent>
      <CardActions>
        {linkToProductPage && (
          <Button
            variant="contained"
            href={`/products/${slugify(title, _id)}`}
            component={Link}
          >
            Go to product page
          </Button>
        )}
        {!inBasket && (
          <Button variant="contained" onClick={() => addToBasketHandler(_id)}>
            Add to cart
          </Button>
        )}
        {inBasket && (
          <IconButton
            aria-label="remove product from basket"
            onClick={() => removeFromBasketHandler(_id)}
          >
            <ClearIcon />
          </IconButton>
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
