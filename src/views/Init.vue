<template>
  <v-layout align-center justify-center>
    <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
    ></v-progress-circular>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Init extends Vue {
    public mounted() {
      this.$router.push({ name: 'dashboard' });
    }
  }
</script>
