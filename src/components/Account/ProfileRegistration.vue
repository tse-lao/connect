<template>
    <div>
        {{name}}
        <input v-model="newName" placeholder="newName"/>
        <button @click="registerName">Read name</button>
    </div>
</template>

<script lang="ts">
import {useAccountStore} from "@/stores/account";
import apiProfile from "@/store/api/profile"
export default{
    setup(){
        const account = useAccountStore();
        return {account}
    }, 
    data(){
        return{ 
            name: 'undefined', 
            newName: ''
        }
    },
    methods:{
        async interactWithChain(){
            const result = await apiProfile.readContract();
            console.log(result);
        }, 
        async getName(){
            const result = await apiProfile.getName();
            this.name = result;
        }, 
        async registerName(){
            console.log(this.newName)
            const result = await apiProfile.submitName(this.newName);
            console.log(result)
        }
    }, 
    mounted(){
        this.getName();
    }
}
</script>