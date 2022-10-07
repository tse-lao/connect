// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import contracts from "@/assets/contracts/artifacts/ShareContract.json";
import Web3 from 'web3';

export default{
    async readShareContracts(address:String){
        //import here the contract abi. 
        const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
            contracts.abi,
            address
      );
    //TODO: make sure that we check if the contract exists. 
      const contractDetails = await contract.methods.getContractDetails().call();
      
      const json:Object = {
        "parentContract": contractDetails[1], 
        "owner" : contractDetails[0], 
        "link" : contractDetails[2], 
        "title" : contractDetails[3], 
        "fee" : web3.utils.fromWei(contractDetails[4]), 
        "status" : contractDetails[5], 
        
      }
      
      return json;
      
    }
}