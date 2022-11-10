<template>
  <main>
    <div>
      <QuillEditor theme="snow" v-model:content="proposalDescription" />
      
      
      <div class="column mtb-2">
        <h3>Attachments:</h3>
        <input type="file" @change="uploadFile" multiple />
        <ul v-if="attachments.length > 0">
          <li v-for="(attachment, key) in attachments" :key="key">
            {{ attachment.name }}
          </li>
        </ul>
      </div>

      <div class="row right">
        <button class="right" @click="createProposal">Propose</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import files from "../../store/api/files";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import bounties from "@/store/api/bounties"
import {useAccountStore} from "@/stores/account"
export default {
  name: "ProposalElement",
  components: {QuillEditor},
  data() {
    return {
      proposalDescription: "",
      attachments: [],
      links: [],
      file: null,
    };
  },
  setup(){
    const account = useAccountStore();

    return {account}
  },
  props:{
      address:{
          type: String,
          default: "nothing found",
      },
  },
  methods: {
    async createProposal() {
      //we need to upload all the attachments to the right column and attach those in the list.

      for (var i = 0; i < this.attachments.length; i++) {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(this.attachments[i]);
        reader.onloadend = async () => {
          console.log("File: ", Buffer(reader.result));
          const link:any = await files.uploadToIPFS(Buffer(reader.result));

          console.log(link)
          this.links.push(link)
        }
      }

      let jsonFormat = JSON.stringify({
        description: this.proposalDescription,
        attachments: this.attachments,
      });
      
      console.log(this.attachments);

      const proposalLink = await files.uploadToIPFS(jsonFormat);

      console.log(proposalLink);

      //THIS IS WORKING NOW WE NEED THE INTERACTION WITH
      const result = await bounties.createProposal(this.address, proposalLink, this.account.address)
      console.log(result)

    },

    uploadFile(event: any) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.attachments.push(event.target.files[i]);
      }
    },
  },
};
</script>

<style scoped>
textarea {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  border: none;
  border-radius: 4px;
  padding: 12px;
  margin: 12px;
}
</style>