<template>
  <div>
    {{ groupName }}
  </div>
</template>

<script>
export default {
  props: ["groupId"],
  data() {
    return {
      groupName: null,
    };
  },

  created() {
    this.getGroupById();
  },
  methods: {
    async getGroupById() {
      if (this.groupId != null) {
        this.$axios.get("/groups/" + this.groupId).then((res) => {
          console.log("groupName", res.data.group_name);
          this.groupName = res.data.group_name;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
