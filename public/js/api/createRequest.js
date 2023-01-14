/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let url = options.url;
  const formData = new FormData;

  xhr.responseType = 'json';

  if (options.method === 'GET' && options.data) {
    url += '?';

    for (key in options.data) {      
      url += `${key}=${options.data[key]}` + '&';
      // url += encodeURIComponent(`${key}=${options.data[key]}`) + '&';
    }
    url.length = url.length - 1;
  } else {
    for (key in options.data) {
      formData.append(key, options.data[key]);
    }    
  }  
    
  xhr.onload = function() {    
    options.callback(null, xhr.response);      
  };  

  xhr.onerror = function() {
    options.callback(new Error('Error, failed connect to host'), null);    
  }

  try {
    xhr.open(options.method, url);
    xhr.send(formData); 
  } 
  catch(error) {
    options.callback(error, null);
  }   
};
