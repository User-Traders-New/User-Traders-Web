import axios from 'axios';
import domain from './domain.js';
import { EventBus } from '@/event-bus.js';

const WAS_URL = process.env.VUE_APP_WAS;

const axiosInstance = axios.create({
	baseURL: '/',
	headers: { 'Cache-Control': 'no-cache' },
});
//url에 파라미터 붙여주기
const _generateUrl = (url, params, headers = null) => {
	if (params == null) {
		return url;
	} else {
		let result = [];
		let list = url.split('/');
		for (let item of list) {
			let resultItem = item;
			if (item.startsWith('#')) {
				let key = item.substring(1);
				if (key && key.length > 0) {
					if (headers != null) {
						resultItem = headers[key] ? headers[key] : '';
					} else {
						resultItem = params[key] ? params[key] : '';
						delete params[key];
					}
				}
			}
			result.push(resultItem);
		}
		return result.join('/');
	}
};

const http = {
	process: (name, action, params = null, headers = null) => {
		return new Promise((resolve, reject) => {
			let info = domain[name][action];

			if (info) {
				let header = headers;
				let newUrl = _generateUrl(info.url, params, headers);
				let base = WAS_URL;
				newUrl = base + newUrl;

				let method = 'get';
				if (info.task == 'post' || info.task == 'uploadFile') {
					method = 'post';
				} else if (info.task == 'put') {
					method = 'put';
				} else if (info.task == 'patch') {
					method = 'patch';
				} else if (info.task == 'delete') {
					method = 'delete';
				}
				let newParmas = params;
				if (info.task == 'uploadFile') {
					const formData = new FormData();
					formData.append('file', params.file);
					newParmas = formData;
				}

				let p = null;
				if (method == 'get') {
					let opt = {
						params: newParmas,
						headers: header,
					};
					console.log('@@@@GET 요청시@@@@@');
					console.log('파라미터 및 req json');
					console.log(newParmas);
					console.log('헤더');
					console.log(header);
					console.log('@@@@@GET 요청시@@@@22');
					p = axiosInstance[method](newUrl, opt);
				} else if (
					method == 'post' ||
					method == 'put' ||
					method == 'patch' ||
					method == 'delete'
				) {
					console.log('@@@@POST 요청시@@@@@');
					console.log('url');
					console.log(newUrl);
					console.log('파라미터 및 req json');
					console.log(newParmas);
					console.log('헤더');
					console.log(header);
					console.log('@@@@@POST 요청시@@@@22');
					p = axiosInstance[method](newUrl, newParmas, {
						headers: header,
					});
				}
				console.log(p);
				return p
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						let res = err.response;
						if (!res) {
							// network error
							if (!info.domain) {
								EventBus.$emit('network:error');
							}
							reject(err);
						} else {
							if (res.status == 401) {
								console.log(`${res.status}, ${res.data.error}`);
								EventBus.$emit('user:invalid');
								reject(err);
							} else if (res.data) {
								console.log(`${res.status}`);
								reject(res.data);
							} else {
								reject(err);
							}
						}
					});
			} else {
				reject('no domain info');
			}
		});
	},
};

export default http;
