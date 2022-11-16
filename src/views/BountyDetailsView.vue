<script lang="ts">
import { mapGetters, mapState } from 'vuex';
import ContractAdmin from "../components/Contracts/ContractAdmin.vue";
import ContractData from "../components/Contracts/ContractData.vue";
import EditContract from "../components/Contracts/EditContract.vue";
import DepositToContact from "../components/Elements/DepositToContact.vue";
import ListEvents from "../components/Elements/ListEvents.vue";
import Title from "../components/Elements/Title.vue";
import Proposal from "../components/Pools/CreateProposal.vue";
import files from "../store/api/files";
import ListProposals from '@/components/Pools/ListProposals.vue';

import { useBountyStore } from '../stores/bounties';
import { useAccountStore } from '../stores/account';


export default {
  name: "ContractDetail",
  components: { EditContract, ContractAdmin, ContractData, Title, DepositToContact, ListEvents, Proposal, ListProposals },
  data() {
    return {
      bountyAddress: '',
      amount: 0,
      details: {
        title: "",
        pool: "",
        status: true,
        estimatedFee: " ",
        tags: [],
        description: "",
        developers: 0, 
        users: 0, 
        type: "",
        acceptanceCriteria: "",
        contactDetails: [],
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
  setup() {
    const bounty = useBountyStore();
    const account = useAccountStore();

    return {
      // you can return the whole store instance to use it in the template
      bounty,
      account
    };
  },

  mounted() {
    this.bountyAddress = this.$route.params.address as string;
    this.getDetails();
    //now we want to call something that retireve the contrat.
  },

  methods: {
    //check if the proposal is there or not. 
    async getDetails() {

      //TODO: get bounty need to be called from ponia. 
      const result = await this.bounty.getBounty(this.bountyAddress)


      this.details.balance = result.balance;
      const proposal = await files.readIPFS(result.proposal);

      console.log(result);

      console.log(proposal);

      this.details.title = result.name;

 

      this.details = proposal;
      this.details.proposal = result.proposal;

      this.details.users = result.userCount;
      this.details.developers = result.devCount;

      this.details.balance = result.balance;

    }

  },
};
</script>

<template>
  <div class="content">
    <Title>
      <template #title>
        <div class="row title">
          <span class="badge">PARENT</span>
          <h4>{{ details.title }}</h4>
        </div>
      </template>
    </Title>

    <div class="two-layer-template">
      <div class="left-two-layer-template">
        <div class="panel contract-details">

          <div class="label">
            <h4>Contract Address</h4>
            <span> {{ bountyAddress }}</span>
          </div>
          <div class="label">
            <h4>Contact Details</h4>
            <div class="contact-list" v-for="item, key in details.contacts" :key="key">
              <img v-if="item.medium == 'Telegram'" src="https://www.freepnglogos.com/uploads/telegram-logo-png-0.png" alt="medium"
                class="medium-icon" />
                <a v-if="item.medium == 'Telegram'" :href="'//t.me/' + item.username" target="_blank">
                  {{ item.username }}
                </a>

                <img v-if="item.medium == 'Discord'" src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" alt="medium"
                class="medium-icon" />
                <a v-if="item.medium == 'Discord'" :href="'//t.me/' + item.username" target="_blank">
                  {{ item.username }}
                </a>
            </div>
          </div>

          <div class="label">
            <h4>Proposal</h4>
            <span> {{ details.proposal }}</span>
          </div>

          <div class="label">
            <h4>Participants</h4>
            <span>{{details.users}} participants</span>
          </div>

          <div class="label">
            <h4>Devs</h4>
            <span>{{details.developers}} devs</span>
          </div>


          <div class="label">
            <h4>Fee</h4>
            <span> {{ details.balance }} / {{ details.estimatedFee }}</span>
          </div>


          <div class="label">
            <DepositToContact :address="bountyAddress" />
          </div>

        </div>
        <div class="panel">
          <div class="tags">
            <div class="tag" v-for="item, key in details.tags" :key="key">
              {{item}}
              </div>
          </div>
        
          <span v-html="details.description"></span>
        </div>

      </div>

    </div>
    <!-- We want to build a switch here for the view, that provides the owner to look atmmore details. -->
    <div class="row">
      <div class="panel">
        <h3>Create Proposal</h3>
        <Proposal :address="bountyAddress" />
      </div>
      <div class="panel no-bg scroll-list">
        <ListProposals :contract="bountyAddress" />
      </div>

      <div class="panel">
        <ListEvents :contractAddress="bountyAddress" />
      </div>
    </div>

  </div>

</template>

<style scoped>
.back-icon {
  height: 24px;
  width: 24px;
  filter: invert(1);
}

.open {
  color: #92e2a7;
  font-weight: 900;
}

.closed {
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

.contact-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem;
}

.contact-list span {
  font-weight: 600;
}

.medium-icon {
  height: 24px;
  width: 24px;
}

.tags{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem;
}

.tag{
  background: #62B1BD;
  color:#21212a;
  border-radius: 6px;
  padding: 0.5rem;
}

.two-layer-template {
  display: flex;
  flex-direction: column;
}

table {
  text-align: left;
}

.column {
  display: flex;
  flex-direction: column;
}

.panel {
  background: #21212a;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  flex: 1;
  gap: 16px;
}

.scroll-list {
  overflow-y: scroll;
}
.no-bg{
  background: none;
}

.submenu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.title {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.submenu .menu-item {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
}

.box-width {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem;
}

.badge {
  background: #92e2a7;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.4rem;
  border-radius: 2px;
  font-weight: 600;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.label {
  margin-bottom: 1rem;
}

.submenu .menu-item:hover {
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.4)
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