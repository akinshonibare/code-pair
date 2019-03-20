import axios from 'axios';

const getsnippets = (code) => {
    return axios.get('/api/snippets')
}

 export { getsnippets }