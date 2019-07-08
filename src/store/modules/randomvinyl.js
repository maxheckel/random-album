
const state = {
    colors: []
}

const getters = {}


const actions = {

}

const mutations = {
    setCurrentColors(state, {colors}) {
        state.colors = colors
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}