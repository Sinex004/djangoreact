const port = 8080;
const localIP = '62.84.34.12';    //server
// const localIP = '192.168.0.46';  //cabel
// const localIP = '192.168.0.84';    //wifi
// const localIP = '192.168.43.84';  //phone
// const localIP = '192.168.0.103';    //wifi

const apiPath = 'api';
const baseURL = `http://${localIP}:${port}/${apiPath}`;

export { baseURL };
