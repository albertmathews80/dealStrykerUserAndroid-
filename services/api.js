import axios from "axios";
import config from "./../config";

const api = axios.create({
    baseURL: `${config.StagingServerAddress}/api`,
});

export default api;
