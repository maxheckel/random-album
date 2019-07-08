import axios from 'axios'

export default {
    async getColorsForImage(imageUrl){
        return axios.get('http://74.207.229.81:8081/colors?image_url='+imageUrl)
    }
}