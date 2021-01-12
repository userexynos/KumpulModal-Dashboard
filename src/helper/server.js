import axios from 'axios';

const API_URL = "https://kumpulmodal-api.herokuapp.com/api/v1/web";

class Server {
    get(param) {
        return new Promise(( resolve, reject ) => {
            axios.get(`${API_URL}/${param}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        });
    }
    post(param, data) {
        return new Promise(( resolve, reject ) => {
            axios.post(`${API_URL}/${param}`, JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        });
    }
    patch(param, data) {
        return new Promise(( resolve, reject ) => {
            axios.patch(`${API_URL}/${param}`, JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        });
    }
    delete(param, data) {
        window.console.log(JSON.stringify(data))
        return new Promise(( resolve, reject ) => {
            axios.delete(`${API_URL}/${param}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: data
                }
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        });
    }
}

export default new Server();