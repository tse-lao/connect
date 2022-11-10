<template>
    <main>
        <div class="column list gap3">
            <div  v-for="result, key in results" :key="key">
                <h3 class="event">
                    {{result.event}}
                </h3>

                <div class="column event-log">
                    <span class="from">
                        {{result.returnValues.owner}} 
                    </span>
                    <span class="to">
                        {{result.returnValues.spender}}
                    </span>
                    <span>
                        {{result.returnValues.value/ (10**16)}}
                    </span>
                </div>
               
            </div>

        </div>
    </main>
</template>

<script lang="ts">
const tokenAddress = "0x53ED56F9AaDF3AADE8e8C7CB730AF4e6BDa90815"

import tokenApi from "@/store/api/token";
export default{
    name:"TokenTransfers", 
    data(){
        return{
            results: {}
        }
    },
    methods:{
        async readAllInteractions(){
            const result = await tokenApi.getAllEvents(tokenAddress);
            console.log(result)
            this.results = result;
        }
    }, 
    mounted(){
        this.readAllInteractions();
    }
}
</script>

<style>
.list{
    max-height: 400px;
    overflow-y: scroll;
}
</style>