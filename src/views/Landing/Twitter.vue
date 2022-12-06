<template>
    <div>
        Twitter here for the users.

        <TwitterVue />
    </div>
</template>
<script lang="ts">
import TwitterVue from '@/components/Data/Twitter.vue';
export default{
    name: "TwitterView", 
    components: {TwitterVue}
}
</script>
<style>
body{
    color: black;
}

</style>