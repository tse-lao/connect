<script lang="js">
import api from "@/store/api/web3";
import ProfilePicture from "@/components/Account/ProfilePicture.vue";

//TODO: make better interface to be used all around the application'
export default {
    name:"ContractElement",
    components: {ProfilePicture},
    data(){
      return {
        contractdata: null,
        loading: true,
      }
    },
    props:{
        data:{
            type:String,
        }
    },
    methods:{
      async readContract(){
        //TODO: implement the contract. 
         const result = await api.readShareContracts(this.data);
         
         console.log(result);
         
         this.contractData = result;
         
         console.log(this.contractData);
         this.loading= false;
        
      }
      
    },
    mounted(){
      
        this.loading = true;
        this.readContract(this.data);
        console.log(this.data);
        
    }
}
</script>

<template>
  <main v-if="!loading">
    <div class="box"  @click="$router.push({ path: `/contract/${data}`, params: { id: data } })" >
      <div class="element">
        <div >
          <ProfilePicture :address="data" />
        </div>
      </div>
      <div class="element bigger">
          <h4>{{ contractData.title }}</h4>
         <span class="small"> {{data}}</span>
      </div>
      <div class="element">
        <div >
          <ProfilePicture :address="contractData.owner" />
        </div>
        
        <span class="truncate">{{contractData.owner}}</span>
      </div>
      <div class="element">
        <span>Reward</span>
        <span>{{contractData.fee}}</span>
      </div>
    </div>
  </main>
</template>
<style>
.box {
  border-radius: 8px;
  display: flex;
  flex: 1;
  gap: 6px;
  flex-direction: row;

  align-items: center;
  padding: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 12px;
  width: 100%;
}
.small{
  font-size: 10px;
}
.truncate {
  width:64px;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow: ellipsis;
}
.element{
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex:1;
  text-align:center;
}

.box:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
}
span{
  font-size: 14px;
  font-weight: 100;
}
.icon-class {
  position: relative;
}
.bigger{
  flex: 4;
  text-align: left;
}
.special {
  background: red;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  position: relative;
    top: -20px;
    right: -33px;
}
.restyle_picture {
  border-radius: 50%;
  height: 12px;
  width: 12px;
}
</style>