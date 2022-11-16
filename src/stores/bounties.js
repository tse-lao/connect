import { defineStore } from "pinia";
import api from "../store/api/bounties";


export const useBountyStore = defineStore('bounties', {
    
    state: () => ({
    
            totalBountyPools: 0,
            factoryAddress: import.meta.env.VITE_POOL_FACTORY,
            bounties: []
      }),
      
      //GETTERS
      getters:{
        getBountyByAddress: (state) => {
            
            return (address) => state.bounties.find(bounty => bounty.address === address)
          },
      },

    //ACTIONS
 actions: {
     
    
     getAllBounties(){
        const result = api.countPools(this.factoryAddress).then((result) => {
            if (result != this.totalBountyPools) {
                
                this.totalBountyPools = result
                //loop through all the pools to check the status. 
                console.log(this.totalBountyPools)
                console.log(result)
                this.getBountyPools();
            }
        })
       
    },
    
     getBountyPools() {
        ///what we want to do is loop through all those things and add them, since none will be missing we do it based on the previous number. 
        for (let i = 0; i < this.totalBountyPools; i++) {
            api.getContractAddress(this.factoryAddress, i).then((result) => {
                const bountyAddress = result;
                api.getBountyDetail(bountyAddress).then((result) =>{
                    const pushObject = {
                        "address": bountyAddress,
                        "totalBounties": result.total, 
                        'bounties': result.bounties, 
                        "name": result.contractName
                    }
                    
                    this.bounties.push(pushObject)
                    
                })
            })
        }
    },
    
     async getBounty(address){
        let result = await api.readBounty(address);
        //here we can get the bounty name and bounty devCount 
    

        return result
    },
    
     createBounty(data){
        api.createBounty(data.name, data.address, data.proposal, data.account).then((result) => {
            console.log(result);
            this.$toast("Succesfully created the contract...!")
        })
    }  
 }
})