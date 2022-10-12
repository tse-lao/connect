import api from "../api/contracts";

export const contracts = {
  namespaced: true,
  state: {
    totalContracts: 0,
    contracts: [],
  },
  mutations: {
    totalContract(state, amount) {
      state.totalContracts = amount;
    },
    addContract(state, address){
        state.contracts.push(address)
    }
  },
  getters: {},
  actions: {
    getTotalContracts({state, commit, dispatch}){
       const result = api.getTotalContract().then((result) => {
        if(result != state.totalContracts){
            commit("totalContract", result)
            dispatch("getAllContracts")
        }
       }) 
       console.log(result)
    }, 
    getAllContracts({state, commit}){
        ///what we want to do is loop through all those things and add them, since none will be missing we do it based on the previous number. 
        console.log(state.totalContracts);
        for (let i = 0; i < state.totalContracts; i++) {
            const result = api.getContract(i).then((result) => {              
                    commit("addContract", result)
               }) 
               console.log(result)
          }
    }
  },
};
