import { useState } from "react";
import {
  ListItem,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@/components/mui";
import Heading from "@/components/Heading";
import Paragraph from "./Paragraph";
import Image from "next/image";
import Link from 'next/link'
import { removeOrderMutateFn } from "@/lib/tq/orders/api";
import { useQueryClient } from "@tanstack/react-query";

const hyphenate = (str) => str.replaceAll(" ", "-");
const slugify = (str, id) => `${hyphenate(str).toLowerCase()}-${id}`;

const Order = ({
  values: { _id, title, description, price, quantity, image, favorites },
  linkToOrderPage,
  headingLevel = 'h2',
  removeHandler = () => console.log('no delete handler provided'),
}) => {
  const queryClient = useQueryClient()
  const [imageSrc, setImageSrc] = useState(image);
  // const [showOrderLink, setShowOrderLink] = useState(false)

  const defaultImgSrc =
    "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const errorHandler = (error) => {
    console.log("Default to backup image", error);
    setImageSrc(defaultImgSrc);
  };

  return (
    <Card component={"div"} sx={{ width: "100%", height: "500px" }}>
      <CardMedia sx={{ display: "grid", placeContent: "center" }}>
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
        <Paragraph>Price: {price}</Paragraph>
        <Paragraph>In Stock: {quantity}</Paragraph>
        <Paragraph>Favorites: {favorites ? favorites : 0}</Paragraph>
      </CardContent>
      <CardActions>
        {linkToOrderPage && <Button
          variant="contained"
          href={`/orders/${slugify(title, _id)}`}
          component={Link}
        >
          Go to Order page
        </Button>}
        <Button
          variant="contained"
          href={`/admin/Orders/update/${_id}`}
          component={Link}
        >
          Update Order
        </Button>
        <Button
          variant="contained"
          aria-label="delete"
          onClick={() => removeHandler(_id)}
        >
          Delete Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default Order;
