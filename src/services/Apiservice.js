import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.0.106:3001/"
})

export const Apiservice = {

    async get(path, config = {}) {
        const res = await api.get(path, config);
        return res.data
    },
    async post(path, config={}){
        return api.post(path, config).then(res => res.data);
    },
    async put(path, config={}){
        return api.put(path, config).then(res => res.data);
    },
    async delete(path, config={}){
        return api.delete(path, config).then(res => res.data);
    }
}