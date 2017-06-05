/* @flow */
import isoFetch from 'isomorphic-fetch';

let baseURL = '';

export function fetch(url: string, options: Object) {
  return isoFetch(baseURL + url, options);
}

export function setBaseURL(newBaseURL: string) {
  baseURL = newBaseURL;
}

type HasBody = { body: Object };
export type HandledFetchCallback = (error: ?Object, result?: any) => any;

export function handledFetch(url: string, options: Object, cb: HandledFetchCallback) {
  return (
    fetch(url, options).then(
      (response) => { return response.json() },
      (fetchError) => { if (cb) return cb(fetchError); }
    ).then(
      (json: any) => {
        if (json.error && cb) return cb(json.error);
        if (json.error == null && cb) return cb(null, json.result);
      },
      (jsonError) => { if (cb) return cb(jsonError); }
    )
  );
}

export function handledFetchPOSTJson(url: string, options: Object & HasBody, cb: HandledFetchCallback) {
  return handledFetch(url, {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options.body)
  }, cb);
}
