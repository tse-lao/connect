<template>
    <main class="form">
        <div class="form-input">
            <label for="title">Title</label>
            <input v-model="form.title" />
        </div>

        <div class="form-input-select">
            <button class="select" @click="form.pool = item.address" v-for="(item, key) in bounties.bounties" :key="key"
                :class="{ active: form.pool === item.address }">{{ item.name }}</button>
        </div>

        <div class="two-form-input">
            <div class="form-input">
                <label>Estimated Fee</label>
                <input type="number" v-model="form.estimatedFee" />
            </div>
            <div class="form-input">
                <label>Deadline</label>
                <input type="date" v-model="form.deadline" />
            </div>
        </div>
        <div class="form-input">
            <label> Tags</label>
            <vue3-tags-input :tags="form.tags" placeholder="input tags" />
            <span>Seperate the tags with a [SPACE] or [ENTER]  </span>
        </div>

        <div class="form-input">
            <label> Description</label>
            <QuillEditor theme="snow" class="editor" v-model:content="form.description" />
        </div>
      
        <div class="form-input">
            <label> Acceptance Criteria </label>

            <QuillEditor theme="snow" class="editor" v-model:content="form.acceptanceCriteria" content-type="html" />
        </div>
        <div class="form-input">
            <label> Contract Details </label>
            <div class="two-input">
                <select class="select" v-model="form.medium">
                    <option selected>Telegram</option>
                    <option>Discord</option>
                    <option>Email</option>
                </select>
                <input v-model="form.username" placeholder="enter username.."/>
                <button @click="addContact">Add</button>
            </div>

            <div class="form-display" v-for="item, key in form.contacts" :key="key">
                <span>
                    {{item.medium}}
                </span>
                <span>
                    {{item.username}}
                </span>
                <button class="danger sm" @click="deleteContact(key)">Delete</button>
            </div>

        </div>

        <div class="form-input">
            <button @click="submitBounty">submit</button>
        </div>


    </main>
</template>

<script lang="ts">
import files from "../../store/api/files";
import { useAccountStore } from '@/stores/account'
import { useBountyStore } from '@/stores/bounties'
import Vue3TagsInput from 'vue3-tags-input'
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    name: "CreateBounty",
    components: { QuillEditor, Vue3TagsInput},
    setup() {
        const account = useAccountStore();
        const bounties = useBountyStore();

        return { account, bounties }
    },
    data() {
        return {
            bounty: 0,
            tag: '',
            form: {
                title: "",
                pool: "",
                estimatedFee: " ",
                tags: [],
                description: "",
                type: "",
                deadline: null,
                acceptanceCriteria: '',
                resources: "",
                medium: "Telegram", 
                username: "",
                contacts: [] as any,
            }
        }
    },
    methods: {
        async submitBounty() {

            let stringified = JSON.stringify(this.form)
            const result: any = await files.uploadToIPFS(stringified);

            //gives me back a link that can be used. 
            console.log(result);

            //now lets go. 
            if (this.account.address != null) {
                this.$store.dispatch("bounties/createBounty", { address: this.form.pool, proposal: result, account: this.account.address })
            } else {
                console.log('please login first')
            }

        }, 
        addContact(){
            if(this.form.medium != "" && this.form.username != ""){
                this.form.contacts.push({
                    "medium": this.form.medium,
                    "username": this.form.username
                })
            }

            console.log("testing if it works ")

            console.log(this.form.contacts)
        }, 
        deleteContact(id:number){
            this.form.contacts.splice(id, 1);
        }
    }
}
</script>


<style>
.form {
    display: flex;
    flex-direction: column;
    align-content: center;
    max-width: 500px;
    margin: auto;
    gap: 2rem;
}
.two-form-input{
    display: flex;
    justify-content:space-evenly;
    width: 100%;
}

.form-input {
    display: flex;
    flex-direction: column;
    max-width: 500px;
}

textarea {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    border: none;
    border-radius: 4px;
    padding: 12px;
    margin: 12px;
}

.select {
    text-transform: capitalize;
    font-size: 12px;
    padding: 0.4rem;
    background-color: rgba(255, 255, 255, 0.2);
}
.form-display{
    display: flex;
    gap: 2rem;
    margin: 1rem;
}

.form-display span{
   font-weight: 400;
   text-align: left;
   align-self: left;
}

.form-input-select {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    gap: 2rem;
    flex-wrap: wrap;
}

.active {
    background-color: hsl(160deg 100% 37%);
}

.editor {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid black;
    outline: none;
}


</style>