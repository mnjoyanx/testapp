<template>
  <div>
    <template v-if="!isLoading">
      <form @submit.prevent="updatePostHandler">
        <input type="text" v-model.trim="post.title" />
        <input type="text" v-model.trim="post.body" />
        <button>Save</button>
      </form>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      post: {},
      isLoading: false,
    };
  },

  methods: {
    getPost(id) {
      this.isLoading = true;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
        .then((response) => {
          this.isLoading = false;
          this.post = response.data[0];
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },

    updatePostHandler() {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/posts/${this.post.id}`,
          this.post
        )
        .then(() => {
          alert("Post updated successfully");
          this.$router.back();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    this.getPost(id);
  },
};
</script>
<style scoped></style>
