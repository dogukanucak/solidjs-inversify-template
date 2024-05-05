import { HttpRequestConfig } from "./HttpRequestConfig";
import { HttpResponse } from "./HttpResponse";

export interface IHttpMiddleware<REQ = object, RES = object | string> {
	handleRequest?(
		config: HttpRequestConfig<REQ>,
	): Promise<HttpRequestConfig<REQ>>;
	handleResponse?(response: HttpResponse<RES>): Promise<HttpResponse<RES>>;
}
