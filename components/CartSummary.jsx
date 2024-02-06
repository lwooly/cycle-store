/* eslint-disable no-underscore-dangle */
import Link from 'next/link';

import {
  ClearIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
  RemoveIcon,
  AddIcon,
} from '@/components/mui';

import { formatPrice, slugify } from '@/lib/utils/formatters';
import {
  useAddToBasket,
  useRemoveFromBasket,
} from '@/lib/tq/baskets/mutations';
import { nanoid } from 'nanoid';
import { toDecimal, dinero, add } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  addToBasketHandler,
  removeFromBasketHandler,
} from '@/lib/api-functions/client/basket';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

export default function CartSummaryTable({ basket }) {
  const { user } = useUser();
  const removeFromBasketMutate = useRemoveFromBasket();
  const addToBasketMutate = useAddToBasket();
  const theme = useTheme();
  const [items, setItems] = useState([])

  // calculate basket total
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );

  // get a list of unique items from basket
  const uniqueItems = [];
  basket.items.forEach((item) => {
    if (!uniqueItems.map((uniqueItem) => uniqueItem._id).includes(item._id)) {
      uniqueItems.push(item);
    }
  });
  console.log(uniqueItems)

  uniqueItems.sort((a, b) => a._id.localeCompare(b._id))
  console.log(uniqueItems)




  return (
    <TableContainer component={Paper} sx={{ borderShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="checkout summary table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>
              <Typography variant="body1">Product</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1">Product</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1">Quantity</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1">Subtotal</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueItems.length > 0 && uniqueItems.map(
            ({ _id, title, price, image, quantity: quantityInStock }) => {
              const productBasketQuantity = basket.items.filter(
                ({ _id: itemId }) => itemId === _id,
              ).length;
              return (
                <TableRow
                  key={nanoid()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <IconButton
                      aria-label="remove product from basket"
                      onClick={() =>
                        removeFromBasketHandler({
                          productId: _id,
                          user,
                          removeFromBasketMutateFn: removeFromBasketMutate,
                        })
                      }
                      disabled={productBasketQuantity > 1}
                    >
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        width: '100px', // Make width responsive
                        height: 0,
                        // Limit the maximum size
                        position: 'relative',
                        paddingBottom: 'min(100px, 100%)',
                        // Equal to width for a square aspect ratio
                        overflow: 'hidden',
                        // flexGrow: 1,
                        // minWidth: { md: "30vw" },
                        //   border: '3px solid #000',
                      }}
                    >
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="200px"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          maxWidth: '100%',
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ textDecoration: 'none' }}
                      href={`/products/${slugify(title, _id)}`}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          textDecoration: 'none',
                        }}
                        variant="body1"
                      >
                        {title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatPrice(
                        toDecimal(
                          dinero({ amount: price * 100, currency: GBP }),
                        ),
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        width: '100%',
                        justifyContent: 'end',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        aria-label="reduce number of product in basket by 1"
                        onClick={() =>
                          removeFromBasketHandler({
                            productId: _id,
                            user,
                            removeFromBasketMutateFn: removeFromBasketMutate,
                          })
                        }
                        disabled={productBasketQuantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: 'black', textDecoration: 'none' }}
                      >
                        {/* calculate quantity in basket */}
                        {productBasketQuantity}
                      </Typography>
                      <IconButton
                        aria-label="increase number of product in basket by 1"
                        onClick={() =>
                          addToBasketHandler({
                            productId: _id,
                            user,
                            addToBasketMutateFn: addToBasketMutate,
                          })
                        }
                        disabled={quantityInStock <= productBasketQuantity}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ color: 'black', textDecoration: 'none' }}
                    >
                      {/* calculate the subtotal */}
                      {formatPrice(
                        toDecimal(
                          dinero({
                            amount: price * 100 * productBasketQuantity,
                            currency: GBP,
                          }),
                        ),
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            },
          )}
          {uniqueItems.length === 0 && 
          <TableRow>
          <TableCell align="center" component="th" scope="row" colSpan={6}>
            <Typography>No Items In Basket</Typography>
          </TableCell>
        </TableRow>}
          <TableRow>
            <TableCell align="right" component="th" scope="row" colSpan={4}>
              <Typography>Total:</Typography>
            </TableCell>
            <TableCell align="right" colSpan={2}>
              <Typography>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell align="right" colSpan={6}>
              <Button component={Link} href="/checkout" variant="contained">
                Proceed To Checkout
              </Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
