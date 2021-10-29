import axios from "axios";

export default {
  state: {
    posts: [],
    isLoading: false,
    error: null,
  },

  mutations: {
    // Set posts
    SET_POSTS_START(state) {
      state.isLoading = true;
      state.error = null;
    },

    SET_POSTS_SUCCESS(state, posts) {
      state.isLoading = false;
      state.posts = posts;
    },

    SET_POSTS_FAILURE(state, error) {
      state.isLoading = false;
      state.error = error;
    },

    // Add post
    ADD_POST_START(state) {
      state.isLoading = true;
      state.error = null;
    },

    ADD_POST_SUCCESS(state, post) {
      state.isLoading = false;
      state.posts.push(post);
    },

    ADD_POST_FAILURE(state, error) {
      state.isLoading = false;
      state.error = error;
    },
  },

  actions: {
    GET_POSTS_HANDLER({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_POSTS_START");

        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            commit("SET_POSTS_SUCCESS", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("SET_POSTS_FAILURE", error);
            reject(error);
          });
      });
    },

    ADD_POST_HANDLER({ commit }, post) {
      return new Promise((resolve, reject) => {
        commit("ADD_POST_START");
        axios
          .post("https://jsonplaceholder.typicode.com/posts", post)
          .then((response) => {
            commit("ADD_POST_SUCCESS", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("ADD_POST_FAILURE", error);
            reject(error);
          });
      });
    },
  },

  getters: {
    getPosts: (state) => state.posts,
    getIsLoading: (state) => state.isLoading,
  },

  namespaced: true,
};
