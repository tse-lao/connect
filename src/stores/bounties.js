import { defineStore } from "pinia";
import api from "../store/api/bounties";


export const useBountyStore = defineStore('bounties', {
    
    state: () => ({
    
            totalBountyPools: 0,
            factoryAddress: "0x62243cf153962dc0919103CaBc24b0fF56f04105",
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
                    
                    console.log(pushObject);
                    this.bounties.push(pushObject)
                    
                    console.log(this.bounties);
                })
            })
        }
    },
    
     async getBounty(address){
  
        let  result = await api.readBounty(address);

        
        return result
    },
    
     createBounty(data){
        api.createBounty(data.address, data.proposal, data.account).then((result) => {
            console.log(result);
        })
    }
    
 }
    
})