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
        this.bounty.getAllBounties();
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
      
    return{ bounty, bountyAddress: bounty.getBountyByAddress }
  },
};
</script>
<template>
  <main>
    <Title>
      <template #title> Bounties System </template>
      <template #actions>
        <img v-if="!startCreate"
            src="../assets/icons/interface-sign/circle-plus.svg"
            alt="add_files"
            @click="startCreate = !startCreate"
          />
          <img v-else 
          src="../assets/icons/interface-sign/close.svg"
            alt="add_files"
            @click="startCreate = !startCreate"
          />
      </template>
    </Title>

    <div v-if="startCreate" class="">
        <CreateBounty />
    </div>
    <div v-else class="row content-with-filter">
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
  align-content: center;
}
.content-with-filter .filter {
  display: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.filter span{
    font-weight: 400;   
    background: #92e2a7;
    padding: 0.5rem;
    color: #302c33;
    border-radius: 2px;
}
.filter span:hover{
    background: #92e2a7ba;
    cursor: pointer;
}
.content-with-filter .content {
  display: 3;
}
</style>