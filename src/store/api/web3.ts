// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import shareContract from "@/assets/contracts/artifacts/ShareContract.json";
import { store } from '@/store/index';
import Web3 from 'web3';


export default {
  async readShareContracts(address: String) {
    //import here the contract abi. 
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    const contractDetails = await contract.methods.getContractDetails().call();

    const balance = await contract.methods.getBalance().call()
    const json: Object = {
      "parentContract": contractDetails[1],
      "owner": contractDetails[0],
      "link": contractDetails[2],
      "title": contractDetails[3],
      "fee": web3.utils.fromWei(contractDetails[4]),
      "status": contractDetails[5],
      "balance": balance,

    }
    console.log(balance);

    return json;

  },

  async changeFeeShareContract(address: String, newFee: String) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    let sender = store.state.account.address;
    const changeFee = web3.utils.toWei(newFee);

    const approve = await contract.methods
      .changeFee(changeFee)
      .send({ from: sender })
      .then((receipt) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error) => {
        console.log(error);
      });
  },
  
  
  async openCloseContract(address: String) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    let sender = store.state.account.address;

    const approve = await contract.methods
      .closeOrOpen()
      .send({ from: sender })
      .then((receipt) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error) => {
        console.log(error);
      });
      
      console.log(approve)
  },
  

  async depositToShareContract(address: String, amount: Number) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    let sender = store.state.account.address;
    const newAmount = web3.utils.toWei(amount);

    const approve = await contract.methods
      .deposit()
      .send({ from: sender , value: newAmount})
      .then((receipt) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async submitToShareContract(address: String, link: String) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    
    let sender = store.state.account.address;
    
    const approve = await contract.methods
      .userSubmission(link, true)
      .send({ from: sender })
      .then((receipt) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, 
  
  async AllFromShareContract(address:String){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      shareContract.abi,
      address
    );
    
    let sender = store.state.account.address;
    
    const result = await contract.methods.getProfiles().call();
    console.log(result);
    
    return result;
  }, 
  
}