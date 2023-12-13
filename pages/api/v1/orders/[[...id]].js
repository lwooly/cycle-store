import nc from 'next-connect';
import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
} from '@/lib/api-functions/server/orders/controllers';

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
  .get(baseRoute, async (req, res) => {
    getOrders(req, res);
  })

  .post(baseRoute, async (req, res) => {
    addOrder(req, res);
  })

  .put(baseRoute, async (req, res) => {
    updateOrder(req, res);
  })

  .delete(baseRoute, async (req, res) => {
    removeOrder(req, res);
  });

export default handler;
