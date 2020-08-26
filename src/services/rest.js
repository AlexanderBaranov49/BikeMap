import { log } from '../utils';
import * as I18n from '../i18n';

export const REQUEST_TIMEOUT = 20000;
export const BASE_URL = 'https://example.com/api';

const NO_CONTENT = 204;

// TODO: token should be stored in persistent storage and not be a mock
const getToken = () => {
  let token = 'FAKETOKEN111TEMP';
  return token;
};

async function getFetchAction(endpoint, method, body) {
  const headers = [['Content-Type', 'application/json']];
  const token = getToken();
  if (token) {
    headers.push(['Authorization', `Bearer ${token}`]);
  }
  let request = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
  let url = `${BASE_URL}${endpoint}`;
  log.debug('REQUEST Endpoint:', method, url);
  log.debug('REQUEST:', request);
  return fetch(url, request);
}

const timeoutAction = (reject) =>
  setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT);

export function callApi(endpoint, method, body) {
  // TODO: add connectivity check
  const internetConnected = true;
  log.debug('request: is internet connected: ', internetConnected);
  if (internetConnected) {
    return Promise.race([
      getFetchAction(endpoint, method, body),
      new Promise((resolve, reject) => timeoutAction(reject)),
    ])
      .then((response) => {
        log.debug('RESPONSE:', response);
        if (response.status === NO_CONTENT) {
          return { json: {}, response };
        }
        return response.json().then((json) => {
          return { json, response };
        });
      })
      .then(({ json, response }) => {
        log.debug('RESPONSE JSON:', json);
        if (!response.ok || !json) {
          json.code = response.status;
          return Promise.reject(json);
        }
        return json;
      });
  } else {
    return new Promise((resolve, reject) => {
      log.debug(`Trying to call ${endpoint} without Internet connection`);
      reject({
        title: I18n.strings('errors.error'),
        detail: I18n.strings('errors.noInternet.title'),
      });
    });
  }
}
