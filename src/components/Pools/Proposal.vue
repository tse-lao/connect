<template>
  <main>
    <div>
      <textarea v-model="proposalDescription"></textarea>

      <input type="file" @change="uploadFile" multiple />

      <div v-if="attachments.length > 0">
        Attachments:
        <ul>
          <li v-for="(attachment, key) in attachments" :key="key">
            {{ attachment.name }}
          </li>
        </ul>
      </div>

      <button @click="uploadFile">Add Attachments</button>

      <div class="row">
        <button @click="createProposal">Propose</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import files from "../../store/api/files";
import DashboardView from "../../views/DashboardView.vue";

export default {
  name: "ProposalElement",
  data() {
    return {
      proposalDescription: "",
      attachments: [],
      file: null,
    };
  },
  methods: {
    async createProposal() {
      //we need to upload all the attachments to the right column and attach those in the list.
      const reader = new window.FileReader();

      for (var i = 0; i < this.attachments.length; i++) {
        reader.readAsArrayBuffer(this.attachments[i]);
        reader.onloadend = async () => {
          console.log("File: ", Buffer(reader.result));
          const link = await files.uploadToIPFS(Buffer(reader.result));
          this.attachments[i].push({ ipfs: link });
        }
      }

      let jsonFormat = JSON.stringify({
        description: this.proposalDescription,
        attachments: this.attachments,
      });
      
      console.log(this.attachments);

      const link = await files.uploadToIPFS(jsonFormat);

      //now we try to upload everything to the contract.
      console.log(link);

      console.log(
        "now we should have hte attachments ready that can be put in a json, together with the following "
      );
    },
    uploadFile(event: any) {
      console.log(event.target.files.length);

      for (var i = 0; i < event.target.files.length; i++) {
        this.attachments.push(event.target.files[i]);
      }
    },
  },
  components: { DashboardView },
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