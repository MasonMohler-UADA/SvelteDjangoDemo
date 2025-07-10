export const load = async ({ cookies }) => {
	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);

	const res = await fetch('http://127.0.0.1:8000/combat_sessions/', {
		method: 'GET',
		headers
	});

	const pageData = await res.json();
	return { pageData };
};

export const actions = {
	deleteSession: async ({ url, request, params, cookies }) => {
		const data = await request.formData();
		const sessionID = data.get('sessionID');
		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);

		const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${sessionID}/`, {
			method: 'DELETE',
			headers
		});
	}
};
