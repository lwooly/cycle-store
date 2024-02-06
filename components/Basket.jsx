import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@/components/mui';
import Heading from '@/components/Heading';
import Paragraph from './Paragraph';

const hyphenate = (str) => str.replaceAll(' ', '-');
const slugify = (str, id) => `${hyphenate(str).toLowerCase()}-${id}`;

function Basket({
  values: { _id, title, description, price, quantity, image, favorites },
  linkToBasketPage,
  headingLevel = 'h2',
  removeHandler = () => console.log('no delete handler provided'),
}) {
  const [imageSrc, setImageSrc] = useState(image);

  const defaultImgSrc =
    'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const errorHandler = (error) => {
    console.log('Default to backup image', error);
    setImageSrc(defaultImgSrc);
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
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </CardMedia>
      <CardContent>
        <Heading component="h2" variant={headingLevel}>
          {title}
        </Heading>
        <Paragraph>About: {description}</Paragraph>
        <Paragraph>Price: {price}</Paragraph>
        <Paragraph>In Stock: {quantity}</Paragraph>
        <Paragraph>Favorites: {favorites || 0}</Paragraph>
      </CardContent>
      <CardActions>
        {linkToBasketPage && (
          <Button
            variant="contained"
            href={`/baskets/${slugify(title, _id)}`}
            component={Link}
          >
            Go to Basket page
          </Button>
        )}
        <Button
          variant="contained"
          href={`/admin/baskets/update/${_id}`}
          component={Link}
        >
          Update Basket
        </Button>
        <Button
          variant="contained"
          aria-label="delete"
          onClick={() => removeHandler(_id)}
        >
          Delete Basket
        </Button>
      </CardActions>
    </Card>
  );
}

export default Basket;
