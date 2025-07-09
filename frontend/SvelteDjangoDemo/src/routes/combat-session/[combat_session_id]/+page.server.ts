export const load = async ({ params }) => {
	const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${params.combat_session_id}`, {
		method: 'GET'
	});
	const pageData = await res.json();
	return { pageData };
};

export const actions = {
	default: async ({ url, request, params }) => {
		const data = await request.formData();

		const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${params.combat_session_id}/`, {
			method: 'PATCH',
			body: data
		});
	}
};
