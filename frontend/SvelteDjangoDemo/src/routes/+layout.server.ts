export const load = async ({cookies}) => {
    const token = cookies.get('token');
    const expiry = cookies.get('expiry');
    const username = cookies.get('username');

    return {loggedIn: !!token, expiry, username};
}
