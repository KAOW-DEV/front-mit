<template>
  <div></div>
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
