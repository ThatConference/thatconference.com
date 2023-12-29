function isInRole({ userRoles, requiredRoles }) {
	return userRoles.some((role) => requiredRoles.includes(role));
}

export default isInRole;
