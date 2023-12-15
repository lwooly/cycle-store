import nc from 'next-connect';
import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
} from '@/lib/api-functions/server/orders/controllers';

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
    orders: { create, update, remove },
  },
} = permissions;

console.log(`next connect`);

const baseRoute = '/api/v1/orders/:id?';

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

  // endpoint methods
  .get(baseRoute, async (req, res) => {
    getOrders(req, res);
  })

  .post(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, create)) {
      return handleUnauthorisedAPICall(res);
    }
    addOrder(req, res);
  })

  .put(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, update)) {
      return handleUnauthorisedAPICall(res);
    }
    updateOrder(req, res);
  })

  .delete(baseRoute, async (req, res) => {
    if (!checkPermission(req.user, identifier, remove)) {
      return handleUnauthorisedAPICall(res);
    }
    removeOrder(req, res);
  });

export default handler;
