import type { Character } from '$lib/types/types';
import type { EZPOSTRequest } from '$lib/utils/POST';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		redirect(307, '/accounts/login');
	}

	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);

	const res = await fetch('http://127.0.0.1:8000/characters/', {
		method: 'GET',
		headers
	});

	const pageData: Character[] = await res.json();
	return { pageData };
};

export const actions = {
	create: async ({ url, request, cookies }) => {
		const data = await request.formData();
		const character_ids = data.getAll('character_ids');
		const sessionName = data.get('name');

		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);
		headers.set('Content-type', 'application/json; charset=UTF-8');

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
			headers
		});
		const resJSON = await res.json();
		redirect(307, `/combat-session/${resJSON.id}`);
	},
	delete: async ({ request, cookies }) => {
		const data = await request.formData();
		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);

		const res = await fetch('http://127.0.0.1:8000/characters/delete', {
			method: 'DELETE',
			body: data,
			headers
		});
	},
	createCharacter: async ({ request, cookies }) => {
		const data = await request.formData();
		const obj = Object.fromEntries(data.entries());
		const JSONdata = JSON.stringify(obj);

		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);
		headers.set('Content-type', 'application/json; charset=UTF-8');

		const res = await fetch('http://127.0.0.1:8000/characters/', {
			method: 'POST',
			body: JSONdata,
			headers
		});
	}
};
