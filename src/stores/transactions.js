import { defineStore } from "pinia";


//transaction: 
// transactionhash
// transaction network
// confirmation. 
// status

export const useTransactionStore = defineStore('transactions', {
    
    state: () => ({
        transactions: 0, 
        transaction:[],
        transacting: false
        
      }),
      
      //GETTERS
      getters:{
        
      },

    //ACTIONS
 actions: {
    getTransactions(){
        
     }, 
     setTransaction(data){
        
     }
    
 }
    
})