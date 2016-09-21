(angular => {
  "use strict";

  angular.module("App")
  .factory("httpInterceptor", ["$q", "API", "Loader", Interceptor]);

  function Interceptor($q, API, Loader) {

    const promises = {};
    let id = 0;

    const resolvePromise = (res) => {
      if (!res.config || !promises[res.config.id]) return res;
      promises[res.config.id].resolve();
      return res;
    };

    return {
      request: (config) => {
        const result = (/^\/(view|svg)/).exec(config.url);
        if (result) {
          config.id = ++id;
          const defered = $q.defer();
          promises[config.id] = defered;
          Loader.add(defered.promise);
        }
        return config;
      },

      response: (res) => {
        return resolvePromise(res);
      },

      requestError: (res) => {
        return $q.reject(resolvePromise(res));
      },

      responseError: (res) => {
        return $q.reject(resolvePromise(res));
      }
    };
  }

})(angular);
