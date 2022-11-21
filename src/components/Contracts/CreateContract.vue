<template>
  <Title>
    <template #title>
      {{ data.title }}
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

    <div class="panel no-bg column">
      <Select @selectType="selectType" />
      <div class="inline-panel">
        <component v-bind:is="createComponent" @add="addProperty" />
      </div>

    </div>
    <div class="panel">
      <DisplayForm v-if="formPreview.length > 1" :formElements="formPreview" />
    </div>
  </div>

</template>
<script lang="ts">
import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import Title from "@/components/Elements/Title.vue"
import CreateInput from "../Elements/CreateInput.vue";
import CreateSelect from "../Elements/CreateSelect.vue";
import functions from "@/store/api/files";
import { QuillEditor } from "@vueup/vue-quill";
import { mapState } from "vuex";
import Web3 from "web3";
import createForm from "./forms/createContract.json";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import createInput from "./forms/createInput.json";
import Select from "../Elements/Select.vue";
import DisplayForm from "./DisplayForm.vue";
import {useAccountStore} from "@/stores/account"
import { date } from "@formkit/i18n";
import { useToast } from "vue-toastification";

export default {
  components: { Title, QuillEditor, CreateInput, Select, CreateSelect, DisplayForm },
  setup(){
    const account = useAccountStore();
    const toast = useToast()

    return {account, toast};
  },
  data() {
    return {
      data: {
        title: " ",
        description: " ",
        reward: 0,
        end_date: "",
      },
      inputFormat: {},
      description: "",
      form: "",
      inputForm: "",
      inputType: "input",
      createComponent: "CreateInput",
      dataCode: [],
      formPreview: [{}]
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
      const createAccount = await contract.methods
        .createNewContract(link, this.data.title, "", web3.utils.toWei("0"), true)
        .send({ from: this.account.address })
        .then((receipt:any) => {
          console.log(receipt);
          this.toast.success("Creation is done. ")
          //on success we can update the allownace.
        })
        .catch((error:any) => {
          console.error(error);
          this.toast.error(error.message)

        });

    },

    async startContract() {
      var data = {
        data: this.data,
        form: this.formPreview,
      };

      const stringedJSON = JSON.stringify(data);
      const result = await functions.uploadToIPFS(stringedJSON);

      //write file to IPFS here.
      this.createContract(result);
    },

    async onSubmit() {
      console.log(this.data);
    },


    addProperty(data: any) {
      console.log(data)
      this.formPreview.push({ data: data, inputType: this.inputType })
    },
    selectType(type: string) {
      this.inputType = type;
      if (type === 'select') {
        this.createComponent = 'CreateSelect';
      } else
        this.createComponent = 'CreateInput';

    }
  },
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

.no-bg {
  background: none;
  padding: 0px;
}

.panel {
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

.create-form {
  display: flex;
  flex-direction: row-reverse;
  gap: 3rem;
  flex-wrap: wrap;
}

.second-section {
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

.formkit-help {
  color: rgba(255, 255, 255, 0.4) !important;
}

.class-form .formkit-actions {
  display: none;
}
</style>