<script lang="ts">
import { useBountyStore } from '@/stores/bounties';
import type PoolDetail from "../common/types";
import Title from "../components/Elements/Title.vue";
import CreateBounty from "../components/Pools/CreateBounty.vue";
import PoolItem from "../components/Pools/PoolItem.vue";
export default {
  name: "Bounties",
  components: { Title, PoolItem, CreateBounty },
  data() {
    return {
      startCreate: false, 
      factoryAddress: "0x62243cf153962dc0919103CaBc24b0fF56f04105" as any,
      pools: [] as PoolDetail[],
      selectedAddress: null, 
      selected: [],
      loading: true,
    };
  },
  methods: {
    async readPools() {
        //TODO: PINIA INTEGRATION ENEDED.
        
        this.bounty.getAllBounties();
        
        
        //now this is read correctly and we can read it from the store. 
        
        //but for this we need some more inforamtion, like the name of the contract etc. 
        this.loading = false;
    },
    
    async selectedBounties(address:any){
      
        this.selectedAddress = address;
        
        
    }, 
   
  },
  mounted(){
        this.readPools();
    },
    
    setup(){
      const bounty = useBountyStore();
      
      return{
        bounty, bountyAddress: bounty.getBountyByAddress
      }
    },
};
</script>
<template>
  <main>
    <Title>
      <template #title> Bounties System </template>
      <template #actions>
        <img
            src="../assets/icons/web-technology/add-files.svg"
            alt="add_files"
            @click="startCreate = !startCreate"
          />
      </template>
    </Title>

    <div v-if="startCreate" class="">
        <CreateBounty />
    </div>
    <div v-else class="content-with-filter">
      <div class="filter" >
            <span @click="selectedBounties(item.address)" v-for="(item, key) in bounty.bounties" :key="key">{{item.name}} ({{item.totalBounties}})</span>
      </div>
      <div class="content" v-if="selectedAddress != null">
        <!--List make sure we get it based on the listing -->
         <PoolItem  v-for="(item, key) in bountyAddress(selectedAddress).bounties" :key="key" :v-bind="item" :data="item" />
     </div>
    </div>
  </main>
</template>


<style scoped>
.content-with-filter {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin: 2rem;
}
.content-with-filter .filter {
  display: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.filter span{
    font-weight: 400;   
}
.filter span:hover{
    color: #92e2a7;
    cursor: pointer;
}
.content-with-filter .content {
  display: 3;
}
</style>