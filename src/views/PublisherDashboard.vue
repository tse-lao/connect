<template>
    <div>
        <h1>Publisher Dashboard</h1>
        <CreateAdSpace />
    </div>
</template>

<script lang="ts">
import CreateAdSpace from "../components/Ads/CreateAdSpace.vue"

export default ({
    name: "PublisherDashboard", 
    components: {
        CreateAdSpace
    }, 
    data() {
        return {
            
        }
    },
    setup(){

    }
})
</script>