<template>
  <div class="contract_create">
    <!--  What information do we need to add here?  -->
    <div class="first-section">
      <div class="class-form panel">
        <FormKit type="form" v-model="data">
          <FormKitSchema :schema="form" :data="data" />
        </FormKit>
      </div>

      <div class="create-form">
        <div class="enterForm panel">
          <FormKit type="form" @submit="onAddSubmit" v-model="inputFormat">
            <FormKitSchema :schema="inputForm" :data="inputFormat" />
          </FormKit>
        </div>

        <div class="previewForm panel">
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
    </div>
    <div class="second-section">
      <button @click="startContract" class="succes">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import functions from "@/store/api/files";
import { mapState } from "vuex";
import Web3 from "web3";
import createForm from "./forms/createContract.json";
import createInput from "./forms/createInput.json";

export default {
  data() {
    return {
      data: {},
      inputFormat: {},
      title: "",
      total_reward: 0.0,
      reward_per_account: 0.0,
      min_people: 1,
      data_format: "",
      end_data: "",
      country: "",
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
.contract_create {
  padding: 24px;
  margin: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.first-section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
}
.two_section_form {
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: center;
  align-items:center;
}
.form_input {
  display: flex;
  flex-direction: column;
  border: none;
  margin-bottom: 8px;
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
.panel{
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  align-content: center;
  align-items: center;
}
.class-form .formkit-actions{
  display: none;
}
</style>