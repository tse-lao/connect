<script lang="ts">
import Title from '@/components/Elements/Title.vue';
import { useAccountStore } from '@/stores/account';
import ContractAdmin from "../components/Contracts/ContractAdmin.vue";
import ContractData from "../components/Contracts/ContractData.vue";
import EditContract from "../components/Contracts/EditContract.vue";
import functions from "../store/api/files";
import web3Functions from "../store/api/web3";


export default {
  name: "ContractDetail",
  components: { EditContract, ContractAdmin, ContractData, Title  },
  data() {
    return {
      registered: false,
      menuSelect: "standard",
      result: "nor esult",
      contract: "",
      show: false,
      amount: "",
      owner: false,
      password: "",
      privateKey: null,
      inputData: {},
      newLink: "",
      entryForm: false,
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
  props: {
    contractLink: {
      type: String,
      default: "nothing found",
    },
  },
  //TODO: Pinia Account interactions make it better. 
 setup(){
    const account = useAccountStore()
    return {account}
 },

  mounted() {
    this.contract = this.$route.params.id as string;
    this.retrieveContract(this.contract);
    //now we want to call something that retireve the contrat.
  },

  methods: {
    /*     async getContractCreatorKey() {
      const provider = new ethers.providers.JsonRpcProvider(
        import.meta.env.VITE_INFURA
      );

      const web3 = new Web3(window.ethereum);
      const contractAddress = "0xf0bbE607A76089FD7A716b8E55e9E349ad8A956C";

      //const transactionDeploy = contract.deployTransaction()

      console.log(provider);

      const tx = await provider.getTransaction(
        "0xf20dc3ef4c826e205e2ff5ffa0c33f32b1abcae4fbe210a17249e704a3b15a5d"
      );
      const expandedSig = {
        r: tx.r,
        s: tx.s,
        v: tx.v,
      };

      console.log(expandedSig);
      const signature = web3.utils.joinSignature(expandedSig);
      const txData = {
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
        to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment
      };
      const rsTx = await web3.utils.resolveProperties(txData);
      const raw = web3.utils.serializeTransaction(rsTx); // returns RLP encoded tx
      const msgHash = web3.utils.keccak256(raw); // as specified by ECDSA
      const msgBytes = web3.utils.arrayify(msgHash); // create binary hash
      const recoveredPubKey = web.utils.recoverPublicKey(msgBytes, signature);
      const recoveredAddress = ethers.utils.recoverAddress(msgBytes, signature);

      console.log(recoveredPubKey);

      return recoveredPubKey;
    }, */

    async retrieveContract(contractAddress:string) {
      const result:Object = await web3Functions.readShareContracts(contractAddress);
      this.details = result as any;
      console.log(result);
      this.retrieveIPFS(this.details.link);
      
    },
    async retrieveIPFS(link:string) {
      const result = await functions.readIPFS(link);
      
      console.log("IPFS details retrieval..")
      console.log(result);
      this.formData = result.form;
      this.entryForm = true;
    },
    async submitDataToContract() {

      const stringedJSON = JSON.stringify(this.inputData);

      const encrypted = false;

      if (encrypted) {
        console.log("shoudl be encrypted");
      }

      const link:any = await functions.uploadToIPFS(stringedJSON);

      this.submitToContract(link);

      //now we need to make sure that we get the publickey.
      /* var pubKey = await this.getContractCreatorKey();
      console.log(pubKey);

      //nowe we want to create file to submit to there.
      EncryptToSmart(pubKey, stringedJSON).then((result) => {
        console.log(result);
        this.show = true;
        this.newLink = result;
      }); */
    },

    async submitToContract(link:string) {
      //create link from the the submission.
      //here we create a submission to the contract.
      //First we submit an not encrypted version.
      const result = await web3Functions.submitToShareContract(
        this.contract,
        link
      );
      
    },
    
    async deposit(){
      const result = await web3Functions.depositToShareContract(this.contract, this.amount);
      
    },
    
    async openCloseContract(){
      const result = await web3Functions.openCloseContract(this.contract);
    }
  },
};
</script>

<template>
  <div class="content">
    <Title>
        <template #title>
          {{details.title}}  
        </template>

        <template #actions>
          <img v-if="details.status"
            src="../assets/icons/interface-sign/lock.svg"
            alt="lock"
            @click="openCloseContract"
          />
          <img v-else src="../assets/icons/interface-sign/unlock.svg"
            alt="lock"
            @click="openCloseContract"/>
        </template>
    </Title>

    <div class="two-layer-template">
      <div class="left-two-layer-template">
        <div class="panel contract-details">
          <div class="row">
            <h4>{{details.title}}</h4>
          </div>
          <div class="row">
            <h4>Owner</h4>
            <span> {{ details.owner }}</span>
          </div>
          <div class="row">
            <h4>Parent Contract</h4>
            <span> {{ details.parentContract }}</span>
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
            <h4>Rewards</h4>
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