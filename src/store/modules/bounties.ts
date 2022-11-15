import api from "../api/bounties";

export const bounties = {
    namespaced: true,
    state: {
        totalBountyPools: 0,
        bountyPools: [],
        factoryAddress: "0x62243cf153962dc0919103CaBc24b0fF56f04105", 
    },
    mutations: {
        totalBountyPools(state, amount) {
            state.totalBountyPools = amount;
        },
        addBounty(state, value){
            state.bountyPools.push(value);
        }
    },
    getters: {
        getBountyByAddress: (state) => (address:string) => {
            if(address != null){
                return state.bountyPools.find(bounty => bounty.address === address)
            }
                return state.bountyPools
          }, 
          getPools: (state) => {
            return state.bountyPools;
          },
          getBountyDetail:(state) => (address:string) => {
            
            
            return null;
          }
    },
    actions: {
        getAllBounties({ state, commit, dispatch }) {
            //

            const result = api.countPools(state.factoryAddress).then((result) => {
                if (result != state.totalBountyPools) {
                    commit("totalBountyPools", result)
                    //now we dispatch this if there is a change to loop through all of them. 
                    dispatch("getBountyPools")
                }
            })
            console.log(result)
        },
        
        //TODO: this need to be split up, so we dont have to rerender all when a new one is entered;
        getBountyPools({ state, commit }) {
            ///what we want to do is loop through all those things and add them, since none will be missing we do it based on the previous number. 
            for (let i = 0; i < state.totalBountyPools; i++) {
                api.getContractAddress(state.factoryAddress, i).then((result) => {
                    const bountyAddress = result;
                    api.getBountyDetail(bountyAddress).then((result) =>{
                        const pushObject = {
                            "address": bountyAddress,
                            "totalBounties": result.total, 
                            'bounties': result.bounties, 
                            "name": result.contractName
                        }
                        commit("addBounty", pushObject);
                    })
                })
            }
        }, 
        
       async getBounty({state, commit}, address:string){
      
            let  result = await api.readBounty(address);

            
            return result
        }, 
        
     
        
    },
};
