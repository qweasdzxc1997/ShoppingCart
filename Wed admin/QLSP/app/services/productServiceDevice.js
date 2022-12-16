const URL = "https://637b69996f4024eac20ce110.mockapi.io/api";
class DeviceServices {
    callAPI(uri, method, data) {
        console.log(method);
        return axios({
            url: `${URL}/${uri}`,
            method,
            data,
        })
    }
};
export default DeviceServices;