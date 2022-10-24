<script lang="ts">
import token from "../../store/api/token";

export default{
    
    name: "EventsList",
    data() {
        return {
            events: [],
            loading: true
        };
    }, 
    methods:{
        async listAllEvents(){
            
            if(this.contractAddress !== ""){
                const result:any = await token.getAllEvents(this.contractAddress);
                console.log(result);
                this.events = result;
                console.log(this.events);
                
                this.loading = false
                
                
            }
        }
    }, 
    mounted(){
        this.listAllEvents();
    },
    props:{
        contractAddress:{
            type: String, 
            default: ""
        }
    }
}
</script>
<template>
    <div v-if="!loading">
        <div v-for="(element, key) in events" :key="key">
            {{element.signature}}
        </div>
    </div>
    <div v-else>
        No events have been found on this contract yet...
    </div>
</template>
