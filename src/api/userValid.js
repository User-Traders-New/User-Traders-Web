import http from '@/utils/http';

function userTokenValid(token) {
	return http
		.process('user', 'userValid', { token: token })
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			reject(error);
		});
}
export { userTokenValid };
