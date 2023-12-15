const settings = Object.freeze({
  identifier: 'https://commerce-app-kappa.vercel.app',
  rolesPath: '/roles',
  roles: 'Admin Next Commerce Shop',
  permissionsPath: '/user_authorization',
  permissions: {
    baskets: {
      create: 'baskets:create',
      read: 'baskets:read',
      update: 'baskets:update',
      remove: 'baskets:delete',
    },
    orders: {
      create: 'orders:create',
      read: 'orders:read',
      update: 'orders:update',
      remove: 'orders:delete',
    },
    products: {
      create: 'products:create',
      read: 'products:read',
      update: 'products:update',
      remove: 'products:delete',
    },
  },
});

export default settings;
