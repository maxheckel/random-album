import axios from 'axios'

export default {
    async getMaster(masterId){
        return await axios.get('https://api.discogs.com/masters/'+masterId+'?token=RUWgPYGkypLztPqcshEmvlmtDXMJOsGUhEZEyKHY')
    },

    async getCollection(username, accessKey, accessSecret, page){
        return await axios.get('https://api.discogs.com/users/'+username+'/collection/folders/0/releases?per_page=10000&oauth_token='+accessKey+'&oauth_token_secret='+accessSecret+'&page='+page+'&token=RUWgPYGkypLztPqcshEmvlmtDXMJOsGUhEZEyKHY')
    }

}