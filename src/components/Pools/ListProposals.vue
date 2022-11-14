<template>
    <main>
        <div class="proposals" v-for="item, key in proposals" :key="key">
            <div class="proposal-item">
                <div class="voting">
                    <i class="arrow up"></i>
                    <h3>0 </h3>
                    <i class="arrow down"></i>
                
                </div>

                <div class="proposal-content">
                    <div v-html="item.description">
                    </div>
                    <div>
                        <span>
                            Attachments 1
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import bounties from "@/store/api/bounties"
import files from "@/store/api/files"

export default ({
    name: "ListProposals",
    data() {
        return {
            proposals: [] as any, 
            contract:""
        }
    },
    props: {
        contract: {
            type: String,
            default: "0xB93bf6A96C4fe06f6F3BBa3e93690AE66E810fDe",
        },
    },
    methods: {
        async readAllProposals() {
            console.log(this.contract);
            //we get an array of links here, we need to convert it to something else, namely files.
            const result:any[] = await bounties.getAllProposals(this.contract)

         
            //now we need a list to read from files. 
            if(result.length > 0){
                const proposalsDetails = await files.readIPFSList(result);
                this.proposals = proposalsDetails;
                console.log(proposalsDetails)
            }

            

        },
        convert(text:string){

                let parser = new DOMParser();
                let doc = parser.parseFromString(text, 'text/html');
                return doc.body.outerHTML;
        }
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
</style>