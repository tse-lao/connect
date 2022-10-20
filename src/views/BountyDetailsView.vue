<script lang="ts">
import { mapGetters, mapState } from 'vuex';
import ContractAdmin from "../components/Contracts/ContractAdmin.vue";
import ContractData from "../components/Contracts/ContractData.vue";
import EditContract from "../components/Contracts/EditContract.vue";
import Title from "../components/Elements/Title.vue";


export default {
  name: "ContractDetail",
  components: { EditContract, ContractAdmin, ContractData, Title },
  data() {
    return {
      bountryAddress: null,
      details: {
        owner: "",
        parentContract: "",
        link: "",
        fee: "",
        title: "DefaultTitle",
        status: true,
        balance: 0
      },
      data: {
        data: {
          fee: "undefined",
          endDate: undefined,
          description: "undefined",
        },
      },
      formData: [],
    };
  },
  computed: {...mapState({
    account: (state:any) => state.account
  }),
  ...mapGetters({
    getBountyDetail: "bounties/getBountyDetail"
  })
},

  mounted() {
    this.bountryAddress = this.$route.params.address as string;
  this.getDetails();
    //now we want to call something that retireve the contrat.
  },

  methods: {
    //check if the proposal is there or not. 
    getDetails(){
        const result = this.getBountyDetail(this.bountryAddress);
        
        console.log(result);
    }
  
  },
};
</script>

<template>
  <div class="content">
    <Title>
        <template #title>Bounty Details</template>    
    </Title>

    <div class="two-layer-template">
      <div class="left-two-layer-template">
        <div class="panel contract-details">
          <div class="row">
            <h4>{{details.title}}</h4>
          </div>
          <div class="row">
            <h4>Contract Address</h4>
            <span> {{ bountryAddress }}</span>
          </div>
          <div class="row">
            <h4>Proposal</h4>
            <span> {{getBountyDetail.proposal }}</span>
          </div>
          <div class="row">
            <h4>Contract</h4>
            <span>{{ contract }}</span>
          </div>
          <div class="row">
            <h4>IPFS</h4>
            <span>{{ details.link }}</span>
          </div>
          <div class="row">
            <h4>Fee</h4>
            <span>{{ details.fee }}</span>
          </div>
          
        </div>
        <div class="panel contract-stats">
          <div class="row">
            <h4>Balance</h4>
            <span> {{details.balance}}</span>
          </div>
          <div class="row">
            <h4>Open status</h4>
            <span v-if="details.status" class="open">OPEN</span>
            <span v-else class="closed">Closed</span>
          </div>
          <div class="row">
            <h4>Encryption Method</h4>
            <span> ETHCKS</span>
          </div>
          <div class="row">
            <button @click="openCloseContract" v-if="details.status">close</button>
            <button @click="openCloseContract" v-else>open</button>
          </div>
          
          <div class="row">
            <input v-model="amount"/>
            <button @click="deposit">Deposit</button>
          </div>
          
          </div>
      </div>
      <div class="box-width">
        <div class="submenu">
          <div class="menu-item" @click="menuSelect = 'standard'">
            FORM format
          </div>
          <div class="menu-item" @click="menuSelect = 'owner'" v-if="owner">
            Owner options
          </div>
          <div class="menu-item" @click="menuSelect = 'data'">
            Contract Data
          </div>

        </div>

        <div class="panel" v-if="menuSelect === 'standard'">
          <div>
            <FormKit
              type="form"
              @submit="submitDataToContract"
              v-model="inputData"
              v-if="entryForm"
            >
              <FormKitSchema :schema="formData" />
            </FormKit>
          </div>
        </div>
        <div class="panel" v-if="menuSelect === 'owner'">
          
          <EditContract
            :contractDetails="details"
            :contractAddress="contract"
            :dataDetails="formData"
          />
          
        </div>
        
        <div class="panel" v-if="menuSelect === 'data'">
          <ContractData :address="contract"/>
        </div>
       
      </div>
    </div>
    <!-- We want to build a switch here for the view, that provides the owner to look atmmore details. -->
  </div>
</template>

<style scoped>
.back-icon {
  height: 24px;
  width: 24px;
  filter: invert(1);
}
.open{
  color: #92e2a7;
  font-weight: 900;
}
.closed{
  color: #DB8D85;
  font-weight: 900;
}
.left-two-layer-template {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.back {
  padding: 24px;
  cursor: pointer;
}
.two-layer-template {
  display: flex;
  flex-direction: column;
}
table {
  text-align: left;
}
.panel {
  background: #21212a;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  flex: 1;
  gap: 16px;
}
.submenu{
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}
.submenu .menu-item{
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  cursor: pointer;
}
.box-width{
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem;
}

.row{
  margin-bottom: 1rem;
}
.submenu .menu-item:hover {
  border: 1px solid rgba(255,255,255,0.8);
  background: rgba(0,0,0,0.4)
}
@media (min-width: 1024px) {
  .two-layer-template {
    display: flex;
  }
  .left-two-layer-template {
    flex-direction: row;
  }
}
</style>