export class HttpService {
  static fetch(input: RequestInfo, requestInit?: RequestInit): Promise<Response> {
    const fetchParams = Object.assign({credentials: 'same-origin'}, requestInit);
    return fetch(input, fetchParams);
  }
}