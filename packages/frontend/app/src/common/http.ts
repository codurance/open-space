import "whatwg-fetch"; // work as a fallback to polyfill in old browser, but mostly for using xhr in cypress

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(
  url: string,
  args?: RequestInit
): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(url, args)
      .then((res: IHttpResponse<T>) => {
        response = res;
        if (response.status === 204) resolve();
        return res.json();
      })
      .then((body: T | undefined) => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: "GET" }
): Promise<IHttpResponse<T>> => {
  return await http<T>(path, args);
};

export const post = async <T>(
  path: string,
  requestArgs: any,
  args: RequestInit = {
    method: "POST",
    headers: requestArgs.headers,
    body: requestArgs.body
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(path, args);
};

export const deleteSession = async <T>(
  path: string,
  args: RequestInit = {
    method: "DELETE"
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(path, args);
};

export const put = async <T>(
  path: string,
  requestArgs: any,
  args: RequestInit = {
    method: "PUT",
    headers: requestArgs.headers,
    body: requestArgs.body
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(path, args);
};
