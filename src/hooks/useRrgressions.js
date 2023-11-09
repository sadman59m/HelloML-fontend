import {useMutation} from 'react-query';
import axios from 'axios';

const performActions = (formData) => {
    return axios.post('http://127.0.0.1:8000/api/regressions/', formData);
}

export const usePerformRegressions = () => {
    return useMutation(performActions, {
        onSuccess: (data) => {
            console.log(data);
        }
    });
}