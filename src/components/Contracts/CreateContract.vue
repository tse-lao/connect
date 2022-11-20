<template>
  <Title>
    <template #title>
      {{data.title}}
    </template>
    <template #actions>
      <button @click="startContract" class="succes">Submit</button>
    </template>
  </Title>
  <div class="contract">
    <!--  What information do we need to add here?  -->
      <div class="panel">
          <div class="form-control">
            <label>Title</label>
            <input v-model="data.title" />
          </div>
          <div class="form-control">
            <label>Fee</label>
            <input type="number" v-model="data.reward" />
          </div>
          <div class="form-control">
            <label>End date</label>
            <input type="date" v-model="data.end_date" />
          </div>
      </div>
      <div class="panel no-bg">
        <h3>Description</h3>
        <QuillEditor />
      </div>

        <div class="panel no-bg flex-start column">
        <Select />
          <div class="inline-panel">  
            <CreateInput />
          </div>
            
       </div>
      <div class="panel">
          <FormKit
            v-for="(value, key) in dataCode"
            v-bind:key="key"
            :type="value.$formkit"
            :name="value.name"
            :label="value.label"
            :classes="{
              outer: 'mb-5 color-white',
              label: 'block mb-1 font-bold text-sm',
              inner:
                'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
              input:
                'w-full h-10 px-3 border-none text-base text-white-700 placeholder-gray-400',
              help: 'text-xs text-gray-500',
            }"
          />
        </div>
      </div>
    
</template>
<script lang="ts">
import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import Title from "@/components/Elements/Title.vue"
import CreateInput from "../Elements/CreateInput.vue";
import functions from "@/store/api/files";
import { QuillEditor } from "@vueup/vue-quill";
import { mapState } from "vuex";
import Web3 from "web3";
import createForm from "./forms/createContract.json";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import createInput from "./forms/createInput.json";
import Select from "../Elements/Select.vue";

export default {
  components: { Title, QuillEditor, CreateInput, Select }, 
  data() {
    return {
      data: {
        title: " ", 
        description: " ",
        reward: 0, 
        end_data: "",
      },
      inputFormat: {},
      description: "",
      form: "",
      inputForm: "",
      dataCode: [],
    };
  },
  methods: {
    async createContract(link) {
      //find something smarter for thi
      const mainContract = "0x57Eb4beD18FBAD5e405bAF606b1936a4E1754EAc";
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        contractInterface.abi,
        mainContract
      );

      //make sure that we extract the user address.
      console.log(this.accounts);

      const approve = await contract.methods
        .createNewContract(link, this.title, "", web3.utils.toWei("0"), true)
        .send({ from: this.accounts })
        .then((receipt) => {
          console.log("approved");
          console.log(receipt);

          //on success we can update the allownace.
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(approve);
    },

    async startContract() {
      var data = {
        data: this.data,
        form: this.dataCode,
      };

      const stringedJSON = JSON.stringify(data);
      const result = await functions.uploadToIPFS(stringedJSON);

      //write file to IPFS here.
      this.createContract(result);
    },

    async onSubmit() {
      console.log(this.data);
    },
    onAddSubmit() {
      this.inputFormat.$formkit = this.inputFormat.type;
      this.dataCode.push(this.inputFormat);
      this.inputFormat = {};
    },
  },
  mounted() {
    this.form = createForm;
    this.inputForm = createInput;
  },
  computed: mapState({
    accounts: (state) => state.account.address,
  }),
};
</script>
<style>
.contract {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem;
}
.form_input {
  display: flex;
  flex-direction: column;
  border: none;
  margin-bottom: 8px;
}
.no-bg{
  background:none;
  padding: 0px;
}
.panel{
  align-self: flex-start;

}
input {
  margin: 12px;
  margin-left: 0;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  color: white !important;
}
.formkit-input {
  color: white !important;
}

.create-form{
  display: flex;
  flex-direction: row-reverse;
  gap: 3rem;
  flex-wrap: wrap;
}

.second-section{
  display: flex;
  margin-right: 3em;
  flex-direction: row-reverse;
}

textarea {
  border-radius: 6px;
  padding: 8px;
  font-size: 12px;
}

.createForm {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.formkit-help{
  color: rgba(255, 255, 255, 0.4) !important;
}

.class-form .formkit-actions{
  display: none;
}
</style>