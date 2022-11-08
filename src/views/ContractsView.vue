<script lang="ts">
import ContractElementVue from "@/components/Contracts/ContractElement.vue";
import CreateContractVue from "@/components/Contracts/CreateContract.vue";
import LoadingVue from "@/components/Elements/Loading.vue";
import { useContractStore } from "../stores/contracts";

export default {
  name: "ContractView",
  components: { ContractElementVue, CreateContractVue, LoadingVue },
  data() {
    return {
      createOn: false,
      mainContract: "0xF5268BbBf2D33E99c63F9056dA853dB46C8018A8",
      loading: true,
    };
  },

  methods: {
    async getContracts() {
      //TODO: PINIA INTEGRATION CONTRACTS NEEDED. 
      this.contracts.getTotalContracts();
      //we need an account for this.
      this.loading = false;
      console.log(this.contracts.contracts)
     
    },
    showCreate() {
      this.createOn = !this.createOn;
    },
  },
  setup(){
    const contracts = useContractStore()
    
    return {
      contracts
    }
  },
  mounted() {
    this.getContracts();
  }
};
</script>

<template>
  <div>
    <div class="actions">
      <h3>Contracts ({{contracts.totalContracts}})</h3>
      <button class="success" @click="showCreate">Create Contract</button>
    </div>

    <div v-if="createOn">
      <CreateContractVue />
    </div>
    <LoadingVue v-if="loading" />

    <div class="grid-container" v-else> 
      <ContractElementVue
        v-for="(item, index) in contracts.contracts"
        :data="item"
        :key="index"
      />
    </div>
  </div>
</template>

<style>
.grid-container {
  display:flex;
  flex-direction: column;
  gap: 3 rem;
}
.actions {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
}
</style>
