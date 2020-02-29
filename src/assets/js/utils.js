import axios from 'axios';
import persistedstate from 'vuex-persistedstate';
import { AES, enc } from 'crypto-js';

export const loadView = view => () => import(/* webpackChunkName: "view-[request]" */ `~/views/${view}.vue`);

/* vuex */
export const set = property => (store, payload) => (store[property] = payload);
export const toggle = property => store => (store[property] = !store[property]);
export const push = property => (store, payload) => store[property].push(payload);

/* axios */
export const $get = (url, params) => axios.get(url, { params }).then(({ data }) => data);
export const $post = (url, params) => axios.post(url, params).then(({ data }) => data);

/* auto require route */
export const autoRequireRoute = () => {
  const routesFiles = require.context('~/router/routes', true, /\.js$/);
  const routes = routesFiles.keys().reduce((acc, modulePath) => {
    const [, isDir] = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/');
    const value = routesFiles(modulePath);
    return isDir ? acc : acc.concat(value.default);
  }, []);
  return routes;
};

/* auto require vuex module */
export const autoRequireModule = () => {
  const modulesFiles = require.context('~/store/modules', true, /\.js$/);
  const modules = modulesFiles.keys().reduce((acc, modulePath) => {
    const [moduleName] = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/');
    const value = modulesFiles(modulePath);
    if (!value.default.namespaced) return acc;
    acc[moduleName] = value.default;
    return acc;
  }, {});

  return modules;
};

/* crypto */
const cryptoSecretKey = process.env.VUE_APP_CRYPTO_SECRET_KEY;
export const encrypt = value => AES.encrypt(JSON.stringify(value), cryptoSecretKey).toString();
export const decrypt = value => JSON.parse(AES.decrypt(value, cryptoSecretKey).toString(enc.Utf8));

/* vuex plugin */
export const createPersistedstate = () =>
  persistedstate({
    storage: {
      getItem: key => decrypt(sessionStorage.getItem(key)),
      setItem: (key, value) => sessionStorage.setItem(key, encrypt(value)),
      removeItem: key => sessionStorage.removeItem(key)
    }
  });
