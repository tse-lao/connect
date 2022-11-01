import { defineStore } from "pinia";
import api from "../store/api/contracts";


export const useContractStore = defineStore('contracts', {
    
    state: () => ({
        totalContracts: 0,
        contracts: [],
      }),
      
      //GETTERS
      getters:{
       
      },

    //ACTIONS
 actions: {
    getTotalContracts(){
        const result = api.getTotalContract().then((result) => {
         if(result != this.totalContracts){
             this.totalContracts = result
             this.getAllContracts()
         }
        }) 
        console.log(result)
     }, 
     getAllContracts(){
         ///what we want to do is loop through all those things and add them, since none will be missing we do it based on the previous number. 
         console.log(this.totalContracts);
         for (let i = 0; i < this.totalContracts; i++) {
             const result = api.getContract(i).then((result) => {              
                     this.contracts.push(result)
                }) 
                console.log(result)
           }
     }
    
 }
    
})