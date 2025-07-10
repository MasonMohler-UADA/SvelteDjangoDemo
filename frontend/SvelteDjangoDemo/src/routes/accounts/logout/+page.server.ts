import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const headers = new Headers();
	headers.set('Authorization', `Token ${cookies.get('token')}`);

	const res = await fetch(`http://127.0.0.1:8000/auth/logout/`, {
		method: 'POST',
		headers
	});

	if (res.ok) {
		cookies.delete('token', { path: '/' });
		redirect(307, '/accounts/login');
	}
};
