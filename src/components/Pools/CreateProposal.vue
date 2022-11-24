<template>
  <main>
    <div>
      <h3>Create Proposal</h3>
      <QuillEditor theme="snow" v-model:content="proposalDescription" ref="editor" />
      
      <div class="column mtb-2">
        <h3>Attachments: 
          <input id="file" class="custom-file-input" type="file" @change="uploadFile" multiple />
        <label for="file">Upload</label>
        </h3>
       
       
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
      title: "notimportantnow", 
      proposalDescription: "",
      attachments: [],
      links: [{}],
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
            console.log(reader)
         const link:any = await files.uploadToIPFS(Buffer(reader.result));
          this.links.push(link)
        }
      }

      const content = this.$refs.editor.getHTML() 

      console.log(content)



      let jsonFormat = JSON.stringify({
        description: content,
        attachments: this.links,
      });
      
      console.log(this.attachments);

      const proposalLink = await files.uploadToIPFS(jsonFormat);

      console.log(proposalLink);

      //THIS IS WORKING NOW WE NEED THE INTERACTION WITH
      const result = await bounties.createProposal(this.title, this.address, proposalLink, this.account.address)
      console.log(result)

    },

    uploadFile(event: any) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.attachments.push(event.target.files[i]);
        console.log(event.target.files[i])
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

[type="file"] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}
input[type="file"] + label {
  /* File upload button styles */
  background-color:  rgba(0,189,126,1);
  border-radius: 6px;
  color: rgba(0,0,0,1);
  text-transform: uppercase;
  font-size: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  transition: background-color 0.3s;
}
[type="file"]:focus + label,
[type="file"] + label:hover {
  /* File upload hover state button styles */
  background-color: rgba(0,189,126,0.5);

}
[type="file"]:focus + label {
  /* File upload focus state button styles */
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
</style>