import { injectable } from "inversify";
import { IHttpAdapter, HttpRequestConfig, HttpResponse } from "../contract";

function headersToRecord(headers: Headers): Record<string, string> {
	const entries = [...headers.entries()];
	return Object.fromEntries(entries);
}

@injectable()
export class FetchAdapter implements IHttpAdapter {
	async request<T = string | object>(
		config: HttpRequestConfig<string | object>,
	): Promise<HttpResponse<T>> {
		const { url, method = "GET", headers = {}, data, params } = config;

		const urlWithParams = new URL(url);
		if (params) {
			Object.keys(params).forEach((key) => {
				urlWithParams.searchParams.append(key, params[key]);
			});
		}

		const response = await fetch(urlWithParams, {
			method,
			headers,
			body: data ? JSON.stringify(data) : undefined,
		});

		const responseData = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: headersToRecord(response.headers),
			data: responseData,
		};
	}
}
