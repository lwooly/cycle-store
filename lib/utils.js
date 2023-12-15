const handleUnauthorisedAPICall = (res) => res.status(401).send('Unauthorised')

const checkRole = (user, API, role) => {
    console.log(user)
    console.log(`${API}/roles`)
    const roles = user[`${API}/roles`];
    console.log('roles', roles)
    
    return roles.includes?.(role)
}

const checkPermission = (user, API, permission) => {
    console.log(user)
    console.log(`${API}/permissions`)
    const permissions = user[`${API}/permissions`];
    console.log('permissions', permissions)
    
    return permissions.includes?.(permission)
}



export {handleUnauthorisedAPICall, checkPermission, checkRole};