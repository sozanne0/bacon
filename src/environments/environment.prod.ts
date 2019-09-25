// temporary solution - need more dynamic way to provide base URL in different deployments
export const environment = {
  production: true,
  //baseUrl: 'http://10.1.10.94', // <-- no 'API/' prefix needed (except to invoke proxy)
  baseUrl: 'http://192.168.1.123', // <-- no 'API/' prefix needed (except to invoke proxy)
};
