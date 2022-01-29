
import Axios from "axios";
import _ from "lodash";


const API_local = "http://localhost:9000/userapi"

/**
 * Ajoute un cookie au navigateur
 * @param {string} cname Nom du cookie
 * @param {string} cvalue Valeur
 * @param {string} exdays Durée de validité
 */
const setCookie = (cname, cvalue, exdays = 365) => {
    if (_.isNil(cvalue)) return;
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  export { setCookie };


/**
 * Supprime un cookie du navigateur
 * @param cname Nom du cookie
 */
  const deleteCookie = (cname) => {
    let d = new Date();
    d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
};
export { deleteCookie };

/**
 * Renvoie le cookie portant le nom "cname" dans la liste des cookies 'cookieString'
 * @param cname Nom du cookie
 * @param cookieString Chaine de caractères des cookies
 * @returns String
 */
const getCookie = (cname, cookieString) => {
  if (!cname || !cookieString) return undefined;
  let name = cname + "=";
  let ca = cookieString.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
};  
export { getCookie };

/**
 * Retourne le cookie qui représente le token de connexion (s'il existe)
 * @returns String
 */
const getToken = () => getCookie("accessToken", document.cookie)
export { getToken }

/**
 * Permet de savoir si l'utilisateur est authentifié (dispose d'un token valide)
 * @returns Boolean
 */
const isAuth = () => getToken()
export { isAuth }

/**
 * Permet de déconnecter un utilisateur de sa session
 */
const disconnect = () => {
  deleteCookie("accessToken") 
  window.location.href = "/login" 
}
export {disconnect}

/**
 * Retourne le chemin complet utilisé pour la requête 
 * @param endpoint chemin partiel (/adminapi/...)
 * @returns string
 */
const getApiFinalEndpoint = (endpoint) =>
  endpoint[0] === "/" ? `${API_local}${endpoint}` : `${API_local}/${endpoint}`;

/**
 * Renvoie le token envoyé dans l'entête (s'il existe)
 * @returns string
 */
const getheaders = () => { return {
  authorization : `Basic ${getToken()}` || ""
}};

/**
 * Options par défaut
 * @returns 
 */
const apiDefaultOptions = () => { return {
  headers: getheaders(),
  crossDomain : true,
  resultCondition: (r) => true,
}};

/**
 * Objet auquel faire appel lors d'un API call dans n'importe quel component
 * se base sur les méthodes post, get et delete d'axios
 */
const api = {
  /**
   * opérations CRUD (dialogue avec l'api)
   * @param endpoint Route complète du microservice
   * @param data Données
   * @param options 
   * @returns statut de l'opération + éventuellement les données demandées (si get)
   */
  post: (endpoint, data = {}, options = {}) => {
    options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
    return new Promise((resolve, reject) => {
      Axios.post(getApiFinalEndpoint(endpoint), data, options)
        .then((suc) => {
          let success = _.get(suc, "data.success") || (suc.status ===200);
          if (success)
            return resolve(suc.data);
          return reject(suc);
        })
        .catch(reject);
    });
  },
  get: (endpoint, options = {}) => {
    options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
    return new Promise((resolve, reject) => {
      Axios.get(getApiFinalEndpoint(endpoint), options)
        .then((suc) => {
          let success = _.get(suc, "data.success") || (suc.status ===200);
          if (success)
            return resolve(suc.data);
          return reject(suc);
        })
        .catch(reject);
    });
  },
  delete: (endpoint, options = {}) => {
    options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
    return new Promise((resolve, reject) => {
      Axios.delete(getApiFinalEndpoint(endpoint), options)
        .then((suc) => {
          let success = _.get(suc, "data.success") || (suc.status ===200);
          if (success)
            return resolve(suc.data);
          return reject(suc);
        })
        .catch(reject);
    });
  },
};
export { api };


