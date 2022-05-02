<template>
  <div>
    {{ subGroupName }}
  </div>
</template>

<script>
export default {
  props: ["subGroupId"],
  data() {
    return {
      subGroupName: null,
    };
  },
  mounted() {
    this.getGroupById();
  },
  created() {
    // this.getGroupById();
  },
  methods: {
    async getGroupById() {
      if (this.subGroupId != null) {
        this.$axios.get("/sub-groups/" + this.subGroupId).then((res) => {
          console.log("subGroupName", res.data.sub_group_name);
          this.subGroupName = res.data.sub_group_name;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
