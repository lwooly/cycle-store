import nc from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
} from '@/lib/api-functions/server/products/controllers';

import {
  checkPermission,
  checkRole,
  handleUnauthorisedAPICall,
} from '@/lib/utils';

import permissions from '@/lib/api-functions/server/permissions';

const {
  identifier,
  roles,
  permissions: {
    products: { create, update, remove },
  },
} = permissions;

console.log(`next connect`);

const baseRoute = '/api/v1/products/:id?';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
  attachParams: true,
})
  // middleware to protect routes
  .use(async (req, res, next) => {
    console.log('middleware running');
    if (req.method === 'GET') {
      return next();
    }
    console.log('skipped');
    try {
      const session = await getSession(req, res);
      req.user = session.user;
      next();
    } catch (err) {
      return handleUnauthorisedAPICall(res);
    }
  })
  .get(baseRoute, async (req, res) => {
    getProducts(req, res);
  })

  .post(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, create)) {
      return handleUnauthorisedAPICall(res);
    }
    addProduct(req, res);
  })

  .put(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, update)) {
      return handleUnauthorisedAPICall(res);
    }
    updateProduct(req, res);
  })

  .delete(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, remove)) {
      return handleUnauthorisedAPICall(res);
    }
    removeProduct(req, res);
  });

export default handler;
