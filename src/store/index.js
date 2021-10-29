import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
import postCommeonts from '@/store/postCommeonts'


Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        posts,
        postCommeonts
    }
})