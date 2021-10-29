<template>
  <div>
    <div class="create_new-post">
      <button @click="$router.push({ name: 'new-post' })">Create post</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th colspan="4">Actions</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <button @click="currentPost(post.id, 'post-comments')">
              See comments
            </button>
          </td>
          <td>
            <button @click="currentPost(post.id, 'view-post')">View</button>
          </td>
          <td>
            <button @click="currentPost(post.id, 'update-post')">Update</button>
          </td>
          <td>
            <button @click="removeRecordHandler(post.id)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="2">Loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Home",

  computed: {
    ...mapGetters({
      posts: "posts/getPosts",
      isLoading: "posts/getIsLoading",
    }),
  },

  methods: {
    ...mapActions({
      getAllPosts: "posts/GET_POSTS_HANDLER",
    }),

    currentPost(id, name) {
      this.$router.push({ name, params: { id } });
    },

    removeRecordHandler(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          alert("removed");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getAllPosts();
  },
};
</script>

<style lang="scss">
table,
th,
td {
  border: 1px solid #ccc;
}

.create_new-post {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
