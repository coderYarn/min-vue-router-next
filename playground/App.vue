<template>
  <div>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> ｜
      <router-link to="/parent">Parent</router-link> |
      <router-link to="/parent/child">Parent Child</router-link>
    </div>
    <router-view />
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",

  setup(props, { slots }) {
    const msg = ref("hello world");
    return {
      msg,
    };
  },
});
</script>
