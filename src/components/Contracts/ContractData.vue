<script lang="ts">
import Loading from "@/components/Elements/Loading.vue";
import web3Functions from "@/store/api/web3";

export default {
  name: "ContractDAta",
  components: {Loading},
  data(){
    return {
        loading: true, 
        items: [],
    }
  },
  props: {
    address: {
      type: String,
      default: "nothing found",
    },
  },
  methods:{
    async readAllProfiles(){
       const result = await web3Functions.AllFromShareContract(this.address);
       console.log(result);
       this.items = result;
       
       this.loading = false;
    }
  }, 
  mounted(){
    this.readAllProfiles()
  }
};
</script>

<template>
  <div>
    <h1>Display the data</h1>
    <span>{{ address }}</span>
    
    <Loading v-if="loading" />
    <div
        v-for="(item, index) in items"
        :data="item"
        :key="index"
        
        v-else
      >
        {{item}}
      </div>
  </div>
</template>

<style scoped>
</style>