

<template>
  <div>
    <div class="class-form">
      <div class="input-form">
        <label>Title</label>
        <input class="form-input" v-model="newTitle"/>
      </div>
      <div class="input-form">
        <label>Fee</label>
        <input v-model="newFee" />
      </div>
      <div class="input-form">
        <label>Owner</label>
        <input name="" disabled />
      </div>
      <button @click="getForm">Update Contract</button>
    </div>
  </div>
</template>

<script lang="ts">
import web3Functions from "@/store/api/web3";

export default {
  name: "EditContract",
  data(){
    return {
        newTitle: null,
        newFee: 0,
    }
  },
  props: {
    contractAddress: {
      type: String,
    },
    contractDetails: {
      type: Object,
    },
    dataDetails: {
      type: Array,
    },
  },
  mounted(){
    this.newTitle = this.contractDetails.title;
    this.newFee = this.contractDetails.fee;
  },
  methods: {
    async getForm() {
      console.log(this.dataDetails);
      console.log(this.contractDetails);
      //check if its different. 
      
      if(this.newFee != this.contractDetails.fee){
        //now we change here a certain functionalit.
        console.log(this.contractAddress);
        console.log(this.newFee);
        const result = await web3Functions.changeFeeShareContract(this.contractAddress, this.newFee);
      }
      
      if(this.newTitle != this.contractDetails.title){
        //now we change here a certain method. 
        console.log("unfortnuately not possible to change. ")
      }
      
    },
  },
};
</script>


<style scoped>
label {
  margin-right: 20px;
}
.input-form{
    display: flex;
    flex-direction: column;
}
</style>