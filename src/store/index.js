import Vue from 'vue'
import Vuex from 'vuex'
import discogs from './modules/discogs'
import randomvinyl from './modules/randomvinyl'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        discogs,
        randomvinyl
    },
    strict: debug
})