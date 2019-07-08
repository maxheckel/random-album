import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import Listening from './components/Listening'
import RandomAlbum from './components/RandomAlbum'
import { library } from '@fortawesome/fontawesome-svg-core'
import store from './store'
import {faCompactDisc as lightCompactDisk} from '@fortawesome/pro-light-svg-icons'
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'

library.add(lightCompactDisk, faCompactDisc)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueRouter)

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/random-album', component: RandomAlbum },
    { path: '/', component: Login },
    { path: '/listen/:id', component: Listening}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
