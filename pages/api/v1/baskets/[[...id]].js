import nc from 'next-connect';
import {
  getBaskets,
  addBasket,
  updateBasket,
  removeBasket,
} from '@/lib/api-functions/server/baskets/controllers';

console.log(`next connect`);

const baseRoute = '/api/v1/baskets/:id?';

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
    getBaskets(req, res);
  })

  .post(baseRoute, async (req, res) => {
    addBasket(req, res);
  })

  .put(baseRoute, async (req, res) => {
    updateBasket(req, res);
  })

  .delete(baseRoute, async (req, res) => {
    removeBasket(req, res);
  });

export default handler;
