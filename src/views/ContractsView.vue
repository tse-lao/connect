<script lang="ts">
import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import ContractElementVue from "@/components/Contracts/ContractElement.vue";
import CreateContractVue from "@/components/Contracts/CreateContract.vue";
import Web3 from "web3";

export default {
  name: "ContractView",
  components: { ContractElementVue, CreateContractVue },
  data() {
    return {
      createOn: false,
      mainContract: "0xF5268BbBf2D33E99c63F9056dA853dB46C8018A8",
      loading: true,
      contracts: [],
    };
  },

  methods: {
    async getContracts() {
      //we need an account for this.
      const web3 = new Web3(window.ethereum);

      const factoryContract = new web3.eth.Contract(
        contractInterface.abi,
        this.mainContract
      );

      const totalContracts = await factoryContract.methods
        .countContracts().call();

      console.log(totalContracts);
      let total = totalContracts;

      for (let i = 0; i < total; i++) {
        let address = await factoryContract.methods.pool(i).call();
        this.contracts.push(address);
      }

      this.loading = false;

      console.log(totalContracts);
    },
    showCreate() {
      this.createOn = !this.createOn;
    },
  },
  mounted() {
    this.getContracts();
  },
};
</script>

<template>
  <main>
    <TitleVue title="Contracts" />
    <div class="actions">
      <button class="btn-success" @click="showCreate">Create Contract</button>
    </div>

    <div v-if="createOn">
      <CreateContractVue />
    </div>
    <Loading v-if="loading" />
    <div class="grid-container" v-else>
      <ContractElementVue
        v-for="(item, index) in contracts"
        :data="item"
        :key="index"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 24px;
  padding: 0;
}
.grid-container {
  display: flex;
  flex-wrap: wrap;
}
.actions {
  display: flex;
  flex-direction: row;
}
</style>
