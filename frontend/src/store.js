import { createStore } from "vuex";
import {useRouter} from 'vue-router';

export const store = createStore({
  
    state() {
        return {
            username: '',
            returnValue: [],
        };
    },

    mutations: {
        setCurrentUser(state, usernamePayload) {
            state.username = usernamePayload;
        },

    },

    actions: {

        getCurrentUser({commit}, {username}) {
            commit("setCurrentUser", username)
        },

    },

});