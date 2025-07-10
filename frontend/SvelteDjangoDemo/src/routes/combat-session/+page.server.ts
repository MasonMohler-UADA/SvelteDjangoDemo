export const load = async () => {
	const res = await fetch('http://127.0.0.1:8000/combat_sessions/', {
		method: 'GET'
	});

	const pageData = await res.json();
	return { pageData };
};

export const actions = {
	deleteSession: async ({ url, request, params }) => {
		const data = await request.formData();
		const sessionID = data.get('sessionID')

		const res = await fetch(`http://127.0.0.1:8000/combat_sessions/${sessionID}/`, {
			method: 'DELETE'
		});
	}
};
