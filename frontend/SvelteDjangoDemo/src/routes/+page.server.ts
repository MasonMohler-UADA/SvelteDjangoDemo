import type { EZPOSTRequest } from '$lib/utils/POST';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const options = {
		method: 'GET'
	};

	const endpoint = 'http://127.0.0.1:8000/characters/';

	const req = new Request(endpoint, options);

	const res = await fetch(req)
		.then(async (res) => {
			if (res.ok) {
				const resJSON = await res.json();
				return {
					type: 'success' as const,
					data: resJSON
				};
			}
			return res;
		})
		.catch((err: Error) => {
			return {
				type: 'error' as const,
				code: 'unexpected',
				status: 404,
				message: 'Unexpected error occurred.',
				error: err
			};
		});

	if (res.type === 'success') {
		return { pageData: res.data };
	} else {
		error(res.status, res.message);
	}
};

export const actions = {
	default: async ({ url, request }) => {
		const data = await request.formData();

		const res = await fetch('http://127.0.0.1:8000/combat_sessions/', {
			method: 'POST',
			body: data
		});
		const resJSON = await res.json();
		redirect(307, `/combat-session/${resJSON.id}`);
	}
};
