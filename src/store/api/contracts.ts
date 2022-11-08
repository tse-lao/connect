import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import Web3 from "web3";
const mainContract = "0x57Eb4beD18FBAD5e405bAF606b1936a4E1754EAc";
const abi:any = contractInterface.abi;
export default {
    async getTotalContract(){
        const web3 = new Web3(window.ethereum);
    

        const factoryContract = new web3.eth.Contract(
            abi,
            mainContract
          );
    
          const totalContracts = await factoryContract.methods
            .countContracts()
            .call();
    
          console.log(totalContracts);
          let total = totalContracts;
          
          return total;
    },
    
    async getContract(inter:Number){
      
      const web3 = new Web3(window.ethereum);
    
      
      const factoryContract = new web3.eth.Contract(
          abi,
          mainContract
        );
  
        const address = await factoryContract.methods
          .pool(inter)
          .call();
        return address;
    }
}
