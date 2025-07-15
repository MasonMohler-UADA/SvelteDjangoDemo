import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { user } from '../../../lib/schemas/schema.js';

export const load = async ({ cookies }) => {
	const form = await superValidate(zod4(user));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(user));

		if (!form.valid) {
			return fail(400, { form });
		}

		const headers = new Headers();
		headers.set('Content-Type', 'application/json');

		const res = await fetch(`http://127.0.0.1:8000/auth/register/`, {
			method: 'POST',
			body: JSON.stringify(form.data),
			headers
		});

		if (res.ok) {
			redirect(307, '/accounts/login');
		}
	}
};
