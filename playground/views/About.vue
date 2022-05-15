<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "../../src";
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    console.log(router);

    console.log(route);
  },
});
</script>
