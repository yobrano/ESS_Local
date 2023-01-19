import axios from "axios";

export function Jobs() {
    return axios.get(`https://localhost:5001/Home/posted-jobs/`);
}