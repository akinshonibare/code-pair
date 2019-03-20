import axios from 'axios';

const runCode = (code) => {
    return axios.post('/api/code/python', {code})
}

 export { runCode }