import { describe, it, expect } from 'vitest';

import isInRole from './isInRole';

describe('isInRole', () => {
	it('passes when user has has matched at least one role', () => {
		const userRoles = ['admin', 'sponsor-admin'];
		const requiredRoles = ['admin', 'volunteer'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(true);
	});

	it('passes when user matches all roles', () => {
		const userRoles = ['admin', 'sponsor-admin'];
		const requiredRoles = ['admin', 'sponsor-admin'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(true);
	});

	it('fails when user does not have the any matching roles', () => {
		const userRoles = ['admin', 'sponsor-admin'];
		const requiredRoles = ['volunteer', 'member'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(false);
	});

	it('fails when user only has one role and matches nothing', () => {
		const userRoles = ['admin', 'sponsor-admin'];
		const requiredRoles = ['member'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(false);
	});

	it('passes when user only has one matching role', () => {
		const userRoles = ['admin', 'sponsor-admin'];
		const requiredRoles = ['admin'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(true);
	});

	it('fails when user has no roles', () => {
		const userRoles = [];
		const requiredRoles = ['admin'];

		expect(isInRole({ userRoles, requiredRoles })).toBe(false);
	});

	it('fails when no roles are required', () => {
		const userRoles = ['admin', 'volunteer'];
		const requiredRoles = [];

		expect(isInRole({ userRoles, requiredRoles })).toBe(false);
	});
});
