<template>
  <div>
    <template v-if="!isLoading">
      <h1>Post Title: {{ post.title }}</h1>
      <p>Post Body: {{ post.body }}</p>
      <p>Post User ID: {{ post.userId }}</p>
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
    getPostInfo(id) {
      this.isLoading = true;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
        .then((res) => {
          this.isLoading = false;
          this.post = res.data[0];
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    // el vuex-ov chanem ))
    // api caller-n el arandzin tex chem dre ))
    this.getPostInfo(id);
  },
};
</script>
<style scoped></style>
