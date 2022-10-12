import contractInterface from "@/assets/contracts/artifacts/Contracts.json";
import Web3 from "web3";

export default {
    async getTotalContract(){
        const web3 = new Web3(window.ethereum);
    
        const mainContract = "0xF5268BbBf2D33E99c63F9056dA853dB46C8018A8";
        const factoryContract = new web3.eth.Contract(
            contractInterface.abi,
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
    
      const mainContract = "0xF5268BbBf2D33E99c63F9056dA853dB46C8018A8";
      const factoryContract = new web3.eth.Contract(
          contractInterface.abi,
          mainContract
        );
  
        const address = await factoryContract.methods
          .pool(inter)
          .call();
  
        
        
        return address;
    }
}
