<template>
    <div>
        The account of the user is:{{account}}
    </div>
</template>

<script lang="ts">
import airdrop from "@/store/api/airdrop"
export default{
    name: "AirdropInteraction", 
    data(){
        return {
            account: "",
        }
    },
    methods:{
        startUp(){
            console.log("trying..")
            const result = airdrop.readAccount();
            this.account = result;
            console.log(result);
        }
    }, 
    mounted(){
        this.startUp();
    }
}
</script>