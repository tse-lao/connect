<template>
    <div>
        <h1>{{name}}</h1>
        <div class="column gap">
          <span class="enum">Address: {{ details.address }}</span>
          <span class="enum">Public: {{ details.publicKey }}</span>
          <span class="enum">Private: {{ details.privateKey }}</span>
        </div>
    </div>
</template>

<script lang="ts">
export default({
    name: "AccountWallet", 
    props: {
        name: {
            type: String,
        }, 
        details:{
            type: Object,
            required: true
        }
    },
})
</script>