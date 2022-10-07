<script>
import contractInterface from "@/assets/contracts/artifacts/ShareContract.json";
import Web3 from "web3";
import functions from "@/store/api/files";

export default {
  name: "ContractDetail",
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
    async getContractCreatorKey() {
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
      const recoveredPubKey = web.utils.recoverPublicKey(
        msgBytes,
        signature
      );
      const recoveredAddress = ethers.utils.recoverAddress(msgBytes, signature);

      console.log(recoveredPubKey);

      return recoveredPubKey;
    },

    async retrieveContract(contractAddress) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        contractInterface.abi,
        contractAddress
      );
      const contractDetails = await contract.methods.getContractDetails().call();

 
        this.details.owner = contractDetails[0];
        this.details.link = contractDetails[2];
        this.details.title = contractDetails[3];
        this.details.parentContract = contractDetails[1];
        this.details.fee = contractDetails[4];
      

      
      this.retrieveIPFS(contractDetails[2]);
    },

    async retrieveIPFS(link) {
      const result = functions.readIPFS("QmVCKMJRjomyx88seTrgWn94CpeC6Ep1Vbo4vA4mJR9D6d");
      console.log(result);
      
    },

    async submitDataToContract() {
      console.log(this.inputData);

      const stringedJSON = JSON.stringify(this.inputData);
      console.log(stringedJSON);

      //now we need to make sure that we get the publickey.
      var pubKey = await this.getContractCreatorKey();
      console.log(pubKey);

      //nowe we want to create file to submit to there.
      EncryptToSmart(pubKey, stringedJSON).then((result) => {
        console.log(result);
        this.show = true;
        this.newLink = result;
      });
    },

    async submitToContract(password) {
      console.log("submittingToContract now");
      console.log(this.password);
      const provider = new ethers.providers.JsonRpcProvider(
        import.meta.env.VITE_INFURA
      );

      if (password.length > 1) {
        await GetAccount(password).then((result) => {
          console.log(result);

          console.log(result[0].address);

          this.privateKey = result[0].private_key;
        });
      }

      console.log(this.privateKey);
      const wallet = new ethers.Wallet(this.privateKey, provider);

      const submitContract = new ethers.Contract(
        this.contract,
        contractInterface.abi,
        wallet
      );

      console.log(submitContract);

      try {
        const tx = await submitContract.userSubmission(this.newLink, false);
        console.log(tx);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <main class="content">
    <div class="top-content">
      <div class="back" @click="$router.push('/contracts')">
        <img
          src="../assets/icons/backward.svg"
          class="back-icon"
          alt="go back"
        />
      </div>

     {{details.title}}
    </div>

    <!-- We want to build a switch here for the view, that provides the owner to look atmmore details. -->

    <div class="submenu">
      <div class="menu-item" @click="menuSelect = 'standard'">
        Standard details.
      </div>
      <div class="menu-item" @click="menuSelect = 'owner'">Onwer options.</div>
    </div>

    <div v-if="menuSelect === 'standard'">
      <div class="basic-info">
        <div class="extra-details">
          <table class="additional">
            <tr>
              <th>Owner</th>
              <td>{{ details.owner }}</td>
            </tr>
            <tr>
              <th>Parent Contract</th>
              <td>{{ details.parentContract }}</td>
            </tr>
            <tr>
              <th>Contract Address</th>
              <td>{{ contract }}</td>
            </tr>
            <tr>
              <th>IPFS link</th>
              <td @click="retrieveIPFS">{{ details.link }}</td>
            </tr>
            <tr>
              <th>Fee</th>
              <td>{{ details.fee }}</td>
            </tr>
            <tr>
              <th>End date</th>
              <td>{{ data.data.endDate }}</td>
            </tr>
          </table>
        </div>
        <div class="description">
          {{ data.data.description }}
        </div>
      </div>
      <div class="box-extra"></div>

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

    
  </main>
</template>
  <style >
main {
  display: flex;
  padding: 32px;
  margin-left: 32px;
  flex-direction: column;
  text-align: left;
}
.back-icon {
  height: 16px;
  width: 16px;
}
.top-content {
  display: flex;
  align-items: center;
  align-self: center;
}

.back {
  padding: 24px;
  cursor: pointer;
}
.title {
  font-size: 32px;
  font-weight: 300;
}

.basic-info {
  display: flex;
  flex-direction: row;
}

.additional {
  font-size: 14px;
}
td,
th {
  padding-right: 24px;
}
.box-extra {
  gap: 12px;
}
.registerForm {
  margin-top: 24px;
  align-items: center;
}

.submenu {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.menu-item {
  border: 1px solid green;
  padding: 12px;
  border-radius: 8px;
}

.menu-item:hover {
  cursor: pointer;
  background: green;
}
</style>