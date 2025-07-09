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
	create: async ({ url, request }) => {
		const data = await request.formData();
		const character_ids = data.getAll('character_ids');
		const sessionName = data.get('name');

		if (!sessionName) {
			return fail(400, { noName: true });
		}
		if (!character_ids.length) {
			return fail(400, { noneSelected: true });
		}

		let initValidationFail = false;
		const characters = [];

		for (const id of character_ids) {
			const initiative = data.get(`initiative-${id}`);
			if (!initiative) {
				initValidationFail = true;
				break;
			}
			characters.push({ id, initiative });
		}

		if (initValidationFail) {
			return fail(400, { missingInitiative: true });
		}

		const reqBody = { name: data.get('name'), characters };
		console.log(reqBody);

		const res = await fetch('http://127.0.0.1:8000/combat_sessions/', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resJSON = await res.json();
		redirect(307, `/combat-session/${resJSON.id}`);
	},
	delete: async ({ request }) => {
		const data = await request.formData();

		const res = await fetch('http://127.0.0.1:8000/characters/delete', {
			method: 'DELETE',
			body: data
		});
	},
	createCharacter: async ({ request }) => {
		const data = await request.formData();

		const res = await fetch('http://127.0.0.1:8000/characters/', {
			method: 'POST',
			body: data
		});
	}
};
