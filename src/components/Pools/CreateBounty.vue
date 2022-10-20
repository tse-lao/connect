<template>
    <main>
        <div class="form-input">
            <label for="title">Title</label>
            <input v-model="form.title"/>
        </div>
        <div class="form-input">
            <label>Fee</label>
            <input type="number"  v-model="form.fee"/>
        </div>
        <div class="form-input">
            <label> Description</label>
            <textarea v-model="form.description"/>
        </div>
        <div class="form-input">
            <label> Tags</label>
            <input  v-model="form.tags"/>
        </div>
        <div class="form-input">
            <label> Type </label>
            <input v-model="form.type"/>
        </div>
        <div>
            <button @click="readPools">Read Pools</button>
        </div>
    </main>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
    name: "CreateBounty", 
    data(){
        return {
            bounty: 0, 
            
            form: {
                title: "", 
                fee: " ", 
                tags:[], 
                description: "",
                type: ""
                
            }
        }
    }, 
    computed:{
        ...mapGetters({
            pools: "bounties/getPools"
        })
    }, 
    methods:{
        readPools(){
            console.log(this.pools);
        }
    }
}
</script>


<style>
.form-input{
    display: flex;
    flex-direction: column;
    max-width: 500px;
}
textarea{
    background: rgba(255,255,255,0.1);
    color: var(--color-text);
    border: none;
    border-radius: 4px;
    padding: 12px;
    margin: 12px;
}
</style>