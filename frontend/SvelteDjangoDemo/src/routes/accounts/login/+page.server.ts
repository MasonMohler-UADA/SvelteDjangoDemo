import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);

	const token = cookies.get('token');
	if (token) {
		redirect(307, '/');
	}
};

export const actions = {
	default: async ({ url, request, params, cookies }) => {
		const data = await request.formData();

		const headers = new Headers();
		headers.set(
			'Authorization',
			`Basic ${Buffer.from(data.get('username') + ':' + data.get('password').toString('base64'))}`
		);

		const res = await fetch(`http://127.0.0.1:8000/auth/login/`, {
			method: 'POST',
			body: data,
			headers
		});

		if (res.ok) {
			const resJSON = await res.json();
			cookies.set('token', resJSON?.token, { path: '/' });
			cookies.set('expiry', resJSON?.expiry, { path: '/' });
			cookies.set('username', resJSON?.username, { path: '/' });
			console.log(resJSON);
			redirect(307, '/');
		}
	}
};
