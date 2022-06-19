<template>
  <div>
    <v-card class="flexcard" color="red" height="100vh">
      <img
        src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?cs=srgb&dl=pexels-c%C3%A1tia-matos-1072179.jpg&fm=jpg"
        height="100vh"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    window.addEventListener(
      "keydown",
      (e) => {
        console.log("e", e);

        if (e.keyCode == 112) {
          e.preventDefault();
          return false;
        }
      },
      true
    );
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
