<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6"> </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {};
  },

  created() {
    this.page_index();
  },

  methods: {
    async page_index() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style>
</style>

