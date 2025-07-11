export const load = async ({ params, cookies }) => {
	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);
	const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${params.combat_session_id}/`, {
		method: 'GET',
		headers
	});
	const pageData = await res.json();
	return { pageData };
};

export const actions = {
	next: async ({ url, request, params, cookies }) => {
		const data = await request.formData();
		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);

		const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${params.combat_session_id}/`, {
			method: 'PATCH',
			body: data,
			headers
		});
	},
	edit: async ({ url, request, params, cookies }) => {
		const data = await request.formData();
		console.log(data);
		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);
		headers.set('Content-Type', 'application/json');

		const characterID = data.get('id');
		const updateOption = data.get('updateOptions');
		const value = Number(data.get('updateField'));
		let current_HP = Number(data.get('current_HP'));

		switch (updateOption) {
			case 'damage':
				//subtract value from current_hp
				current_HP = current_HP - value;
				break;
			case 'heal':
				//add value to current_hp
				current_HP = current_HP + value;
				break;
			default:
				break;
		}

		const reqBody = { current_HP };

		const res = await fetch(`http://127.0.0.1:8000/characters/${characterID}/`, {
			method: 'PATCH',
			body: JSON.stringify(reqBody),
			headers
		});
	}
};
