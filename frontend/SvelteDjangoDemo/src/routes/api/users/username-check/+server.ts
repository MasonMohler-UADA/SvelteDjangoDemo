import { error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const headers = new Headers();
	headers.set('Content-Type', 'application/json');

	const body = await request.json();

	const res = await fetch(`http://127.0.0.1:8000/users/username-check/`, {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	});

	if (res.ok) {
		const response = await res.json();
		return new Response(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		throw error(500, 'Username check failed');
	}
};
