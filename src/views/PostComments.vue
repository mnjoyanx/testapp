<template>
  <div>
    <template v-if="!isLoading">
      <h2>{{ title }}</h2>
      <p>Comments</p>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p>{{ comment.name }}</p>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="loader">
        <h2>Loading...</h2>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostComments",

  computed: {
    ...mapGetters({
      comments: "postCommeonts/getComments",
      title: "postCommeonts/getTitle",
      isLoading: "postCommeonts/getIsLoading",
    }),
  },

  methods: {
    ...mapActions({
      getAllData: "postCommeonts/GET_ALL_DATA",
    }),
  },

  mounted() {
    const id = this.$route.params.id;
    this.getAllData(id);
  },
};
</script>
