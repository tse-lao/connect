<script lang="ts">
import { mapGetters, mapState } from 'vuex';
import ContractAdmin from "../components/Contracts/ContractAdmin.vue";
import ContractData from "../components/Contracts/ContractData.vue";
import EditContract from "../components/Contracts/EditContract.vue";
import DepositToContact from "../components/Elements/DepositToContact.vue";
import ListEvents from "../components/Elements/ListEvents.vue";
import Title from "../components/Elements/Title.vue";
import Proposal from "../components/Pools/Proposal.vue";
import files from "../store/api/files";
import { useBountyStore } from '../stores/bounties';


export default {
  name: "ContractDetail",
  components: { EditContract, ContractAdmin, ContractData, Title, DepositToContact, ListEvents, Proposal },
  data() {
    return {
      bountyAddress: '',
      amount: 0, 
      details: {
                title: "", 
                pool:"",
                poolDetails: {
                  address: "0x", 
                  balance: 0, 
                  name: "not found"
                },
                status: true,
                estimatedFee: " ", 
                tags:[], 
                description: "",
                type: "", 
                experience: 0, 
                timeCommitment: 0, 
                deadline: null,
                acceptanceCriteria: "", 
                resources: "", 
                contactDetails: "", 
                proposal: "", 
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
  //PINIA integration
  setup(){
    const bounty = useBountyStore();

    return {
      // you can return the whole store instance to use it in the template
      bounty,
    };
  },
  computed: {...mapState({
    account: (state:any) => state.account
  }),
  ...mapGetters({
    getBountyByAddress: "bounties/getBountyByAddress"
    
  })
},

  mounted() {
    this.bountyAddress = this.$route.params.address as string;
    this.getDetails();
    //now we want to call something that retireve the contrat.
  },

  methods: {
    //check if the proposal is there or not. 
    async getDetails(){
      console.log(this.bountyAddress)
      
      //TODO: get bounty need to be called from ponia. 
      
       const result = await this.bounty.getBounty(this.bountyAddress)
       
       //const result =  await this.$store.dispatch("bounties/getBounty", this.bountyAddress);
        this.details.balance = result.balance;
        const proposal = await files.readIPFS(result.proposal);
        
        this.details = proposal;
        this.details.proposal = result.proposal;
        
        this.details.balance = result.balance;
        
        //TODO: PINIA update needed here. 
        const poolDetails = this.getBountyByAddress(proposal.pool);

        this.details.poolDetails = poolDetails;

    }
  
  },
};
</script>

<template>
  <div class="content">
    <Title>
        <template #title>
          <div class="row title">
            <span class="badge">{{details.poolDetails.name}}</span>
            <h4>{{details.title}}</h4>
          </div>
        </template>    
    </Title>

    <div class="two-layer-template">
      <div class="left-two-layer-template">
        <div class="panel contract-details">
        
          <div class="row">
            <h4>Contract Address</h4>
            <span> {{ bountyAddress }}</span>
          </div>
          <div class="row">
            <h4>Contact Details</h4>
            <span>Telegram: KS_94</span>
            <span>Discord: #lao_tse</span>
          </div>
         
          <div class="row">
            <h4>Proposal</h4>
            <span> {{details.proposal }}</span>
          </div>
          
          <div class="row">
            <h4>Participants</h4>
            <span>0 participants</span>
          </div>
        
         
          <div class="row">
            <h4>Fee</h4>
            <span> {{details.balance }} / {{ details.estimatedFee }}</span>
          </div>
          <div class="row">
            <DepositToContact :address="bountyAddress"/>
          </div>
          
        </div>
        <div class="panel">
          <div class="row">
            <h4>Description</h4>
            <span> {{details.description}}</span>
          </div>
          <div class="row">
            <h3>Create Proposal</h3>
            <Proposal />
            
          </div>
          
          </div>
          
      </div>
     
    </div>
    <!-- We want to build a switch here for the view, that provides the owner to look atmmore details. -->
    
    <div class="panel">
      <ListEvents :contractAddress="bountyAddress" />
    </div>
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
  align-content: flex-start;
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
  align-self: flex-start;
}
.submenu{
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}
.title{
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
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
.badge{
  background: #92e2a7;
  color: rgba(0,0,0,0.8);
  padding: 0.4rem;
  border-radius: 2px;
  font-weight: 600;
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