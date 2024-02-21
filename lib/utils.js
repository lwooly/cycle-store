const handleUnauthorisedAPICall = (res) => res.status(401).send('Unauthorised');

const checkRole = (user, API, role) => {
  const roles = user[`${API}/roles`];

  return roles.includes?.(role);
};

const checkPermission = (user, API, permission) => {
  const permissions = user[`${API}/permissions`];

  return permissions.includes?.(permission);
};

export { handleUnauthorisedAPICall, checkPermission, checkRole };
