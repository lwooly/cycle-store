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
} from '@/components/mui';

import { formatPrice, slugify } from '@/lib/utils/formatters';
import { useRemoveFromBasket } from '@/lib/tq/baskets/mutations';
import { nanoid } from 'nanoid';
import { toDecimal, dinero, add } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { removeFromBasketHandler } from '@/lib/api-functions/client/basket';
import { useTheme } from '@emotion/react';

export default function CartSummaryTable({ basket }) {
  const { user } = useUser();
  const removeFromBasketMutate = useRemoveFromBasket();

  const theme = useTheme();

  // calculate basket total
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );
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
          {basket.items.map(({ _id, title, price, image }) => (
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
                    toDecimal(dinero({ amount: price * 100, currency: GBP })),
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  sx={{ color: 'black', textDecoration: 'none' }}
                >
                  1
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  sx={{ color: 'black', textDecoration: 'none' }}
                >
                  {formatPrice(
                    toDecimal(dinero({ amount: price * 100, currency: GBP })),
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" component="th" scope="row" colSpan={4}>
              <Typography>Total:</Typography>
            </TableCell>
            <TableCell align="right" colSpan={2}>
              <Typography>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={6}>
              <Button component={Link} href="/checkout" variant="contained">
                Proceed To Checkout
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
