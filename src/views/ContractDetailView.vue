<script lang="ts">
import ContractAdmin from "@/components/Contracts/ContractAdmin.vue";
import EditContract from "@/components/contracts/EditContract.vue";
import functions from "@/store/api/files";
import web3Functions from "@/store/api/web3";

export default {
  name: "ContractDetail",
  components: { EditContract, ContractAdmin },
  data() {
    return {
      registered: false,
      menuSelect: "standard",
      result: "nor esult",
      contract: null,
      show: false,
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
      },
      data: {
        data: {
          fee: "undefined",
          endDate: undefined,
          description: "undefined",
        },
      },
      formData: {},
    };
  },
  props: {
    contractLink: {
      type: String,
      default: "nothing found",
    },
  },

  mounted() {
    this.contract = this.$route.params.id;
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

    async retrieveContract(contractAddress) {
      const result = await web3Functions.readShareContracts(contractAddress);
      this.details = result;
      this.retrieveIPFS(result.link);
    },
    async retrieveIPFS(link) {
      const result = await functions.readIPFS(link);
      this.formData = result.form;
      if (this.formData.length > 0) {
        this.entryForm = true;
      }
    },
    async submitDataToContract() {
      console.log(this.inputData);

      const stringedJSON = JSON.stringify(this.inputData);
      console.log(stringedJSON);

      const encrypted = false;

      if (encrypted) {
        console.log("shoudl be encrypted");
      }

      const result = await functions.uploadToIPFS(stringedJSON);

      this.submitToContract(result);

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

    async submitToContract(link) {
      //create link from the the submission.
      //here we create a submission to the contract.
      //First we submit an not encrypted version.
      const result = await web3Functions.submitToShareContract(
        this.contract,
        link
      );

      console.log(result);
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="top-content">
      <div class="back" @click="$router.push('/contracts')">
        <img
          src="../assets/icons/backward.svg"
          class="back-icon"
          alt="go back"
        />
      </div>
    </div>

    <div class="two-layer-template">
      <div class="left-two-layer-template">
        <div class="panel contract-details">
          <div class="row">
            <h4>Owner</h4>
            <span> {{ details.owner }}</span>
          </div>
          <div>
            <h4>Parent Contract</h4>
            <span> {{ details.parentContract }}</span>
          </div>

          <h4>Contract</h4>
          <span>{{ contract }}</span>

          <h4>IPFS</h4>
          <span>{{ details.link }}</span>
          <h4>Fee</h4>
          <span>{{ details.fee }}</span>
        </div>
        <div class="panel contract-stats">
          <table>
            <tr>
              <td>Total Participants</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Total Participants</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Total Participants</td>
              <td>1000</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="right-two-layer-template">
        <div class="submenu">
          <div class="menu-item" @click="menuSelect = 'standard'">
            Standard details.
          </div>
          <div class="menu-item" @click="menuSelect = 'owner'">
            Onwer options.
          </div>
        </div>

        <div v-if="menuSelect === 'standard'">
          <div class="registerForm">
            <h4>Data form for submission.</h4>
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
        <div v-if="menuSelect === 'owner'">
          <EditContract
            :contractDetails="details"
            :contractAddress="contract"
            :dataDetails="formData"
          />

          <ContractAdmin :contractAddress="contract" />
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
  align-items: center;
  align-content: center;
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
  flex-direction: row;
  gap: 12px;
  margin-bottom: 12px;
}
.submenu .menu-item{
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  cursor: pointer;
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