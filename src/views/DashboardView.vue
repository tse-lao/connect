<template>
  <main>Would be nice if this is wokring perfectly</main>
</template>

<script lang="ts">
import { useCounterStore } from "../stores/counter";

export default {
  setup() {
    const store = useCounterStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
};
</script>