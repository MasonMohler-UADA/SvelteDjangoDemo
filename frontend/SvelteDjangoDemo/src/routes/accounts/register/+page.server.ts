import { redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ url, request, params }) => {
		const data = await request.formData();

		const res = await fetch(`http://127.0.0.1:8000/auth/register/`, {
			method: 'POST',
			body: data
		});

        if (res.ok) {
            redirect(307, '/accounts/login');
        }
	}
};