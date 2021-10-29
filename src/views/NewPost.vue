<template>
  <div>
    <h1>Create New Post</h1>

    <form @submit.prevent="addNewPostHandler">
      <input type="text" v-model.trim="newPost.title" />
      <input type="text" v-model.trim="newPost.body" />
      <input type="number" min="0" v-model.number="newPost.userId" />
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NewPost",
  data() {
    return {
      newPost: {
        title: "",
        body: "",
        userId: 0,
      },
    };
  },

  methods: {
    ...mapActions({
      addNewPost: "posts/ADD_POST_HANDLER",
    }),

    addNewPostHandler() {
      this.addNewPost(this.newPost).then(() => {
        alert("Post was created successfully");
        this.$router.push({ name: "posts" });
      });
    },
  },
};
</script>
<style scoped></style>
