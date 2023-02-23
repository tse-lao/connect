<template>
  <main>
    <h1>Messaging system for sharing encryption modals.</h1>
    
    <span> The returned public key is </span>
    <h4>{{publicKey}}</h4>
    
    <span>Which should be the address:</span>
    <h4>{{address}}</h4>
    <button @click="convertTransactionToPubKey">Retrieve public key</button>
    
    
    
  
    <div class="row">
      <div class="person">
        <AccountWallet name="Alice" :details="alice"/>
        <button @click="createAlice">Create Wallet</button>
      </div>
      <div class="person">
        <AccountWallet name="Bob" :details="bob"/>
        <button @click="createBob">Create Bob</button>
      </div>
    </div>

    <input v-model="email" placeholder="enter email" />
    <button @click="encryptData">Encrypt data</button>

    <h5>Encrypted message</h5>
    <span>{{ encrypted }}</span>

    <button @click="decryptMessage">decrypt mesage</button>
  </main>
</template>

<script lang="ts">
import token from "@/store/api/token";
import EthCrypto from "eth-crypto";
import { ethers } from "ethers";
import Web3 from "web3";
import { useAccountStore } from "../../stores/account";
import AccountWallet from './Elements/AccountWallet.vue';

export default {
  name: "StoreData",
  components: { AccountWallet },
  data() {
    return {
      email: "",
      alice: {
        address: "",
        publicKey: "",
        privateKey: "",
      },
      bob: {
        address: "",
        publicKey: "",
        privateKey: "",
      },
      encrypted: "",
      decryptPayload: {
        signature: "",
        message: "",
      },
      publicKey: "",
      address: ""
    };
  },
  setup() {
    const account = useAccountStore();

    return { account };
  },
  methods: {
    async encryptData() {
      //first we create signature.
      const signature = EthCrypto.sign(
        this.alice.privateKey,
        EthCrypto.hash.keccak256(this.email)
      );

      console.log(signature);
      const payload = {
        message: this.email,
        signature,
      };
      console.log(payload);
      const encrypted = await EthCrypto.encryptWithPublicKey(
        this.bob.publicKey, // by encrypting with bobs publicKey, only bob can decrypt the payload with his privateKey
        JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
      );

      const encryptedString = EthCrypto.cipher.stringify(encrypted);

      this.encrypted = encryptedString;
    },
    createAlice() {
      const alice = EthCrypto.createIdentity();
      this.alice = alice;
      console.log(alice);
    },
    createBob() {
      const bob = EthCrypto.createIdentity();
      this.bob = bob;
      console.log(bob);
    },

    async decryptMessage() {
      const encryptedObject = EthCrypto.cipher.parse(this.encrypted);
      const decrypted = await EthCrypto.decryptWithPrivateKey(
        this.bob.privateKey,
        encryptedObject
      );

      const decryptedPayload = JSON.parse(decrypted);
      this.decryptPayload = decryptedPayload;
      // check signature
      const senderAddress = EthCrypto.recover(
        decryptedPayload.signature,
        EthCrypto.hash.keccak256(decryptedPayload.message)
      );
      console.log(
        "Got message from " + senderAddress + ": " + decryptedPayload.message
      );
    },

    async reply() {
      const answerMessage = "And I am Bob Kelso";
      const answerSignature = EthCrypto.sign(
        this.bob.privateKey,
        EthCrypto.hash.keccak256(answerMessage)
      );
      const answerPayload = {
        message: answerMessage,
        signature: answerSignature,
      };

      const alicePublicKey = EthCrypto.recoverPublicKey(
        this.decryptPayload.signature,
        EthCrypto.hash.keccak256(this.decryptPayload.message)
      );

      const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
        alicePublicKey,
        JSON.stringify(answerPayload)
      );

      console.log(encryptedAnswer);
    },

    async getAnyPublicKey() {
      //we get all the events from the signup smart contract.
      const result = await token.getAllEvents(
        "0x59ff8a97a7d1766d06c9d4a48356b3a76b78dc18"
      );

      this.convertTransactionToPubKey(result[0].transactionHash);
      //we need just on transactions
      //now that we have transactions, we will be using the following method to retrieve
    },

    async convertTransactionToPubKey(hash) {
      // const test = await this.sendTransation();
      const web3 = new Web3(window.ethereum);
      const tx = await web3.eth.getTransaction("0x95bca19591becfd669b3a0b6e7daa2394b251722b425ca02c2ab06cdaa996b46");

      const expandedSig = {
        r: tx.r,
        s: tx.s,
        v: tx.v,
      };
      const signature = ethers.utils.joinSignature(expandedSig);
      const txData = {
        gasPrice: ethers.utils.hexlify(parseInt(tx.gasPrice)),
        gasLimit: ethers.utils.hexlify(tx.gas || tx.gasLimit) ,
        value: ethers.utils.hexlify(parseInt(tx.value)),
        nonce: ethers.utils.hexlify(tx.nonce),
        data: tx.input,
        chainId: 0x13881,
        to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment, okay this make sense, but what can we do now..
      };
      const rsTx = await ethers.utils.resolveProperties(txData);
      const raw = ethers.utils.serializeTransaction(rsTx); // returns RLP encoded tx
      const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
      const msgBytes = ethers.utils.arrayify(msgHash);
      const recoveredPubKey = ethers.utils.recoverPublicKey(
        msgBytes,
        signature
      );
      const recoveredAddress = ethers.utils.recoverAddress(msgBytes, signature);
      console.log(recoveredAddress)
      this.publicKey = recoveredPubKey;
      this.address = recoveredAddress;
    },
  },
};
</script>
<style scoped>
.person {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}
.person button {
  width: 150px;
}
</style>