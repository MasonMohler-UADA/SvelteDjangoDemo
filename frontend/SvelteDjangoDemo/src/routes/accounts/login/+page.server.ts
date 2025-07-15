import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { user } from '../../../lib/schemas/schema.js';

export const load = async ({ cookies }) => {
	const form = await superValidate(zod4(user));

	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);

	const token = cookies.get('token');
	if (token) {
		redirect(307, '/');
	}
	return { form };
};

export const actions = {
	default: async ({ url, request, params, cookies }) => {
		const form = await superValidate(request, zod4(user));

		if (!form.valid) {
			return fail(400, { form });
		}

		const headers = new Headers();
		headers.set(
			'Authorization',
			`Basic ${form.data.username + ':' + btoa(form.data.password)}` // Found this btoa function, should convert the password string to Base64 (tested, it does indeed)
		);
		headers.set('Content-Type', 'application/json');

		const res = await fetch(`http://127.0.0.1:8000/auth/login/`, {
			method: 'POST',
			body: JSON.stringify(form.data),
			headers
		});

		if (res.ok) {
			const resJSON = await res.json();
			cookies.set('token', resJSON?.token, { path: '/' });
			cookies.set('expiry', resJSON?.expiry, { path: '/' });
			cookies.set('username', resJSON?.username, { path: '/' });
			console.log(resJSON);
			redirect(307, '/');
		}
	}
};
