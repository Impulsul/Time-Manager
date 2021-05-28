import Vue from "vue";
import Vuex from "vuex";

import applicationProp from "./modules/application-prop"
import tasks from "./modules/tasks"
import login from './modules/login'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
    modules: {
        applicationProp,
        tasks,
        login
    },
    strict: debug,
    plugins: []
})

