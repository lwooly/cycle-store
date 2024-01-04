import nc from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import {
  getBaskets,
  addBasket,
  updateBasket,
  removeBasket,
  getOwnBasket,
  addProductToUserBasket,
  removeItemFromUserBasket,
} from '@/lib/api-functions/server/baskets/controllers';

import {
  checkPermission,
  checkRole,
  handleUnauthorisedAPICall,
} from '@/lib/utils';

import permissions from '@/lib/api-functions/server/permissions';
import { addToBasketMutateFn } from '@/lib/tq/baskets/api';

const {
  identifier,
  roles,
  permissions: {
    baskets: { create, update, remove },
  },
} = permissions;

const baseRoute = '/api/v1/baskets/:owner?/:item?';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Internal Server Error');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
  attachParams: true,
})
  // middleware to protect routes
  .use(async (req, res, next) => {
    // console.log('middleware running');
    // if (req.method === 'GET') {
    //   return next();
    // }
    try {
      const session = await getSession(req, res);
      req.user = session.user;
      next();
    } catch (err) {
      return handleUnauthorisedAPICall(res);
    }
  })
  // endpoint methods
  .get(baseRoute, async (req, res) => {
    const { owner } = req.params;
    if (owner === 'own') {
      console.log('here');
      const basket = await getOwnBasket(req, res);
      return basket;
    }

    const isAdmin = checkRole(req.user, identifier, 'admin');

    if (!owner && !isAdmin) {
      return handleUnauthorisedAPICall(res);
    }
  })

  .post(baseRoute, async (req, res) => {
    const { owner } = req.params;
    if (owner === 'own') {
      return addProductToUserBasket(req, res);
    }
    if (!checkPermission(req.user, identifier, create)) {
      return handleUnauthorisedAPICall(res);
    }
    addBasket(req, res);
  })

  .put(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, update)) {
      return handleUnauthorisedAPICall(res);
    }
    updateBasket(req, res);
  })

  .delete(baseRoute, async (req, res) => {
    const { owner } = req.params;

    console.log(owner);
    if (owner === 'own') {
      return removeItemFromUserBasket(req, res);
    }
    if (!checkPermission(req.user, identifier, remove)) {
      return handleUnauthorisedAPICall(res);
    }
    removeBasket(req, res);
  });

export default handler;
