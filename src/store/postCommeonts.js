import axios from "axios";

export default {
  state: {
    isLoading: false,
    title: "",
    comments: [],
  },

  mutations: {
    GET_ALL_DATA_START(state) {
      state.isLoading = true;
    },

    GET_ALL_DATA_SUCCESS(state, payload) {
      state.isLoading = false;
      state.comments = payload[0];
      state.title = payload[1][0].title;
    },

    GET_ALL_DATA_FAILURE(state) {
      state.isLoading = false;
    },
  },

  actions: {
    GET_POST_COMMENTS(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://jsonplaceholder.typicode.com/comments?postId=${payload}`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    GET_POST_INFO(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts?id=${payload}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
      
    // waiting for the fetching all data
    GET_ALL_DATA({ commit, dispatch }, payload) {
      commit("GET_ALL_DATA_START");
      return Promise.all([
        dispatch("GET_POST_COMMENTS", payload),
        dispatch("GET_POST_INFO", payload),
      ])
        .then((response) => {
          commit("GET_ALL_DATA_SUCCESS", response);
        })
        .catch(() => {
          commit("GET_ALL_DATA_FAILURE");
        });
    },
  },

  getters: {
    getTitle: (state) => state.title,
    getComments: (state) => state.comments,
    getIsLoading: (state) => state.isLoading,
  },

  namespaced: true,
};
