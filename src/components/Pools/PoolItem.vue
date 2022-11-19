<script lang="ts">
import ProfilePicture from "@/components/Account/ProfilePicture.vue";

//TODO: make better interface to be used all around the application'
export default {
    name:"ContractElement",
    components: {ProfilePicture},
    data(){
      return {
        contractdata: null,
        loading: false,
      }
    },
    props:{
        data:{
            type:Object,
            default: {
              name: "", 
              tokenBalance: 0,
                address: null, 
                proposal: undefined, 
                balance: 0,
                
            }
            
        }
    },
    methods:{
      async readInfo(){
        //TODO: Read the data that is placed. 
        console.log(this.data);
      }
      
    },
    mounted(){
        this.loading = false;
        this.readInfo();
    }
}
</script>

<template>
  <main v-if="!loading">
    <div class="box"  @click="$router.push({ path: `/bounties/${data.address}`, params: { id: data.address } })" >
      <div class="element">
        <div >
          <ProfilePicture />
        </div>
      </div>
      <div class="element bigger">
          <h4>{{ data.name }}</h4>
         <span class="small"> {{data.address}}</span>
      </div>
      <div class="element">
        <div >
          <ProfilePicture :address="data.address" />
        </div>
      </div>
      <div class="element">
        <span>Balance</span>
        <span>{{data.tokenBalance}}</span>
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