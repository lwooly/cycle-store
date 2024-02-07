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
  getNumberInBasket,
  getUniqueBasketItems,
  removeFromBasketHandler,
} from '@/lib/api-functions/client/basket';
import { useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UIContext } from './contexts/UI.context';
import { useMediaQuery } from '@mui/material';

export default function CartSummaryTable({ basket }) {
  const user = useUser();
  const removeFromBasketMutate = useRemoveFromBasket();
  const addToBasketMutate = useAddToBasket();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { showMessage } = useContext(UIContext);
  // calculate basket total
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );

  // get a list of unique items from basket
  const uniqueItems = getUniqueBasketItems(basket);



  const tableTextStyles = {
    fontSize: { xs: '0.8em', sm: '1em' },
  };

  const iconButtonStyles = {
    padding: { xs: 0, sm: 'default' },
    fontSize: { xs: '0.5em', sm: 'default' },
  };

  const isScreenSmall = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isScreenSmall);
  const tableSize = isScreenSmall ? 'small' : 'default';
  return (
    <TableContainer component={Paper} sx={{ borderShadow: 'none' }}>
      <Table
        size={tableSize}
        sx={{
          minWidth: { md: 650 },
          padding: { xs: 1, md: 'default' },
          '& .MuiTableCell-sizeSmall': {
            paddingX: ' 5px',
            paddingY: '1rem',
          },
        }}
        aria-label="checkout summary table"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>
              <Typography variant="body1" sx={tableTextStyles}>
                Product
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" sx={tableTextStyles}>
                Price
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" sx={tableTextStyles}>
                Quantity
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" sx={tableTextStyles}>
                Subtotal
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueItems.length > 0 &&
            uniqueItems.map(
              ({ _id, title, price, image, quantity: quantityInStock }) => {
                const productBasketQuantity = getNumberInBasket({
                  basket,
                  _id,
                });
                console.log(productBasketQuantity);
                return (
                  <TableRow
                    key={nanoid()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">
                      <IconButton
                        sx={iconButtonStyles}
                        aria-label="remove product from basket"
                        onClick={() => {
                          removeFromBasketHandler({
                            productId: _id,
                            user: user.user,
                            removeFromBasketMutateFn: removeFromBasketMutate,
                            queryClient,
                          });
                          showMessage({
                            type: 'success',
                            string: 'Item removed from basket!',
                          });
                        }}
                        disabled={productBasketQuantity > 1}
                      >
                        <ClearIcon size="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          width: { xs: '50px', sm: '100px' }, // Make width responsive
                          height: 0,
                          // Limit the maximum size
                          position: 'relative',
                          paddingBottom: {
                            xs: 'min(50px, 100%)',
                            sm: 'min(100px, 100%)',
                          },
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
                            ...tableTextStyles,
                          }}
                          variant="body1"
                        >
                          {title}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={tableTextStyles}>
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
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton
                          sx={iconButtonStyles}
                          aria-label="reduce number of product in basket by 1"
                          onClick={() => {
                            removeFromBasketHandler({
                              productId: _id,
                              user: user.user,
                              removeFromBasketMutateFn: removeFromBasketMutate,
                              queryClient,
                            });
                          }}
                          disabled={productBasketQuantity <= 1}
                        >
                          <RemoveIcon size="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'black',
                            textDecoration: 'none',
                            ...tableTextStyles,
                          }}
                        >
                          {/* calculate quantity in basket */}
                          {productBasketQuantity}
                        </Typography>
                        <IconButton
                          sx={iconButtonStyles}
                          aria-label="increase number of product in basket by 1"
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
                          <AddIcon size="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'black',
                          textDecoration: 'none',
                          ...tableTextStyles,
                        }}
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
          {uniqueItems.length === 0 && (
            <TableRow>
              <TableCell align="center" component="th" scope="row" colSpan={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4rem',
                  }}
                >
                  <Typography>No Items In Basket</Typography>
                  <Button component={Link} href="/" variant="contained">
                    View products!
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          )}
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
