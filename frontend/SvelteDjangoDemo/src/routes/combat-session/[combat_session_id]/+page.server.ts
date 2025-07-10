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
	default: async ({ url, request, params, cookies }) => {
		const data = await request.formData();
		const headers = new Headers();
		headers.set('Authorization', `Token ${cookies.get('token')}`);

		const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${params.combat_session_id}/`, {
			method: 'PATCH',
			body: data,
			headers
		});
	}
};
