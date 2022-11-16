<template>
    <main>
        <div class="proposals" v-for="item, key in proposals" :key="key">
            <div class="proposal-item">
                <div class="voting">
                    <i class="arrow up" @click="voteProposalUp(item.developer)"></i>
                    <h3>0 </h3>
                    <i class="arrow down"></i>
                
                </div>

                <div>
                    <div  class="proposal-content" v-html="item.proposal.description">
                    </div>
                    <div>
                        <span>
                            Attachments 1
                        </span>
                        <span>{{item.developer}}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import bounties from "@/store/api/bounties"
import files from "@/store/api/files"
import bountyApi from "@/store/api/bounties"
import {useAccountStore} from "@/stores/account"

export default ({
    name: "ListProposals",
    data() {
        return {
            proposals: [] as any, 
            contract:""
        }
    },
    setup(){
        const account = useAccountStore();

        return {account}
    }, 
    methods: {
        async readAllProposals() {
            console.log(this.contract);
            //we get an array of links here, we need to convert it to something else, namely files.
            const result:any[] = await bounties.getAllProposals(this.contract)

            console.log(result);
         
            //now we need a list to read from files. 
            if(result.length > 0){
                for(var i = 0; i < result.length; i++){
                     console.log(result[i].proposal)
                    const proposalsDetails = await files.readIPFS(result[i].proposal);
                    this.proposals.push({developer: result[i].developer, proposal: proposalsDetails});
                    console.log(proposalsDetails)
                }
             
            }

            

        },
        convert(text:string){

                let parser = new DOMParser();
                let doc = parser.parseFromString(text, 'text/html');
                return doc.body.outerHTML;
        }, 
        async voteProposalUp(developer:string){
            console.log(developer);
            console.log(this.contract);

           // const result = await bountyApi.voteProposalUp(this.contract, developer, this.account.address)

            window.alert("not yet implemented")

        }, 
    },
    mounted() {
        this.contract = this.$route.params.address as string;
        this.readAllProposals();
    },

})
</script>
<style>
.proposal-item{
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 2rem;
    flex: 1;
    background: rgba(255,255,255 0.65);
}
.voting{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.voting img{
    height: 24px;
    width: 24px;
}
.arrow {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  border: solid green;
  border-width: 0 3px 3px 0;

}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  border: solid red;
  border-width: 0 3px 3px 0;
}
.arrow:hover{
    border-width: 0 6px 6px 0;
    cursor: pointer;
}
.voting h3{
    margin: 0;
}

.proposal-content{
    max-height: 250px;
    overflow-y: scroll;
}
</style>