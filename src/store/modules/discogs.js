import discogs from '../../apis/discogs'

const state = {
    discogsUsername: '',
    discogsOauthToken: '',
    discogsOauthSecret: '',
    collection: [],
    masters: []
}

const getters = {}


const actions = {

}

const mutations = {
    addMaster(state, {master}) {
        state.masters.push(master)
    },
    setDiscogsName(state, {username}){
        state.discogsUsername = username
    },
    setDiscogsCollection(state, {collection}){
        state.collection = collection
    },
    addToDiscogsCollection(state, {additions}){
        state.collections.push(additions)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}