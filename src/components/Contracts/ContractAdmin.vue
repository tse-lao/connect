<template>
    <div>
        <button @click="readProfiles">Read all from contract</button>
    </div>
</template>
<script lang="ts">
import web3Functions from "@/store/api/web3";

export default{
    name:"Contract Management", 
    methods:{
        async readProfiles(){
            const result = web3Functions.AllFromShareContract("0x9e051BF4e2DD6Cf3194A5c04Ec441124278eA9E3");
            console.log(result);
            
        }
    }
}
</script>
