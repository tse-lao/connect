<script lang="ts">
import Loading from "@/components/Elements/Loading.vue";
import functions from "@/store/api/files";
import web3Functions from "@/store/api/web3";
import Table from "../Elements/Table.vue";

export default {
  name: "ContractDAta",
  components: {Loading, Table},
  data(){
    return {
        loading: true, 
        items: [] as any,
        tableHeaders: [] as any
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
      //this.items = result;
       
      for(let item in result){
          const link = result[item][3]
          const ipfs = await functions.readIPFS(link);
          
          this.items.push({
            user : result[item][0], 
            data: ipfs, 
            downloads: result[item][1], 
            balance: result[item][2], 
            encrypted: result[item][4], 
            active: result[item][5]      
          })
          
          this.tableHeaders = ['user', 'data', 'downloads', 'balance', 'encrypted', 'active']
        }

          
       
       this.loading = false;
    },
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

        <Table :headers="tableHeaders" :rows="items" />
  </div>
</template>

<style scoped>
</style>