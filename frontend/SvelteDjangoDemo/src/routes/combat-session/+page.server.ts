export const load = async () => {
	const res = await fetch('http://127.0.0.1:8000/combat_sessions/', {
		method: 'GET'
	});

	const pageData = await res.json();
	return { pageData };
};
