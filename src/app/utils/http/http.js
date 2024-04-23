import axios from 'axios';
import router from '../../router/index.js';// Router'ı içe aktarın
import { appLocalStorage } from '../storage/storage.js';
const  BASE_URL  = import.meta.env.VITE_BASE_URL;

const config = {
  baseURL: BASE_URL
};

let token = appLocalStorage.getItem("token");


const httpBase = axios.create(config);

const authInterceptor = (config,isToken) => {
//istekte eğer token gerekiyorsa token ekliyoruz
//Token gerekli ve localstoragede token yoksa logine yönlendiriyoruz
  if(isToken){
    token ? config.headers['Authorization'] = `Bearer ${token}` : router.push('/login');;
  }
  return config;
};


// istek kesiciyi ekledik
httpBase.interceptors.request.use(authInterceptor);

//yanıt kesici lazım olursa kullan buda response gelince yapılacak işlemler
/* httpBase.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
); */

export default httpBase ;