import Vue from 'vue'
import Vuex from 'vuex'
import discogs from './modules/discogs'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        discogs
    },
    strict: debug
})