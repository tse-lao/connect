<template>
    <main class="form">
        <div class="form-input">
            <label for="title">Title</label>
            <input v-model="form.title"/>
        </div>
        
        <div class="form-input-select">
            <button class="select" @click="form.pool = item.address"  v-for="(item, key) in pools" :key="key" :class="{active: form.pool === item.address}">{{item.name}}</button>
        </div>
        <div class="form-input">
            <label>Estimated Fee</label>
            <input type="number"  v-model="form.estimatedFee"/>
        </div>
        <div class="form-input">
            <label>Deadline</label>
            <input type="date"  v-model="form.deadline"/>
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
            <label> Experience </label>
            <input v-model="form.experience"/>
        </div>
        <div class="form-input">
            <label> Time commitment </label>
            <input v-model="form.timeCommitment"/>
        </div>
        <div class="form-input">
            <label> Acceptance Criteria </label>
            <textarea v-model="form.acceptanceCriteria"/>
        </div>
        <div class="form-input">
            <label> Contract Details </label>
            <input v-model="form.contactDetails"/>
        </div>
        
        <div class="form-input">
            <button @click="submitBounty">submit</button>
        </div>
        
       
    </main>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex';
import files from "../../store/api/files";

export default {
    name: "CreateBounty", 
    data(){
        return {
            bounty: 0, 
            
            form: {
                title: "", 
                pool:"",
                estimatedFee: " ", 
                tags:[], 
                description: "",
                type: "", 
                experience: 0, 
                timeCommitment: 0, 
                deadline: null,
                acceptanceCriteria: "", 
                resources: "", 
                contactDetails: "", 
            }
        }
    }, 
    computed:{
        ...mapState({
            account: (state:any) => state.account
        }), 
        ...mapGetters({
            pools: "bounties/getPools"
        })
    }, 
    methods:{   
        async submitBounty(){
            
            let stringified = JSON.stringify(this.form)
            const result:any = await files.uploadToIPFS(stringified);
            
            //gives me back a link that can be used. 
            console.log(result);
            
            //now lets go. 
            if(this.account.address != null){
                this.$store.dispatch("bounties/createBounty", {address: this.form.pool, proposal: result, account: this.account.address})
            }else{
                console.log('please login first')
            }
            
        }
    }
}
</script>


<style>
.form{
    display: flex;
    flex-direction: column;
    align-content: center;
    max-width: 500px;
    margin: auto;
    gap: 1rem;
}
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

.select{
    text-transform: capitalize;
    font-size: 12px;
    padding: 0.4rem;
    background-color: rgba(255,255,255,0.2);
    
}
.form-input-select{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    gap: 2rem;
    flex-wrap: wrap;
}
.active{
    background-color: hsl(160deg 100% 37%);
}
</style>