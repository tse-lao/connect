

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
import web3Functions from "../../store/api/web3";
import CreateInput from "../Elements/CreateInput.vue";

export default {
  name: "EditContract",
  components: {CreateInput}, 
  data(){
    return {
        newTitle: null,
        newFee: "0",
        selectType: "input", 
        formPreview: [],      
        createComponent: "CreateInput",
    }
  },
  props: {
    contractAddress: {
      type: String,
      default: "something"
    },
    contractDetails: {
      type: Object,
      default: {
        'title': "undefined", 
        'fee': "0"
      }
    },
    dataDetails: {
      type: Object,
      default: {}
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
        const result = await web3Functions.changeFeeShareContract(this.contractAddress, this.newFee);
      }
      
      if(this.newTitle != this.contractDetails.title){
        //now we change here a certain method. 
        console.log("unfortnuately not possible to change. ")
      }
      
    },
    selectType(type: string) {
      if (this.inputType === "select") {
        this.createComponent = "CreateSelect";
      } else this.createComponent = "CreateInput";
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