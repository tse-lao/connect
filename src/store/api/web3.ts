// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import shareContract from "@/assets/contracts/artifacts/ShareContract.json";
import Web3 from 'web3';
import {useAccountStore} from "@/stores/account"
import { useToast } from "vue-toastification";
import contracts from "./contracts";


const toast = useToast();
const abi: any = shareContract.abi;

const account = useAccountStore();

export default {

  async readShareContracts(address: string) {
    //import here the contract abi. 


    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    const contractDetails = await contract.methods.getContractDetails().call();
    const balance = await contract.methods.getBalance().call()
    const title = await contract.methods.title().call();
    console.log("title: ", title);
    console.log(contractDetails);
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

  async changeFeeShareContract(address: string, newFee: string) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );
    //TODO: make sure that we check if the contract exists
    const changeFee = web3.utils.toWei(newFee);

    const approve = await contract.methods
      .changeFee(changeFee)
      .send({ from: account.address })
      .on((receipt: Object) => {
        console.log("approved");
        console.log(receipt);
        toast.success('succesfully approved the contract', receipt)
        //on success we can update the allownace.
      })
      .catch((error: Error) => {
        console.log(error);
      });
  },


  async openCloseContract(address: string) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 

    const approve = await contract.methods
      .closeOrOpen()
      .send({ from: account.address })
      .on('transactionHash', function (transactionHash:any) { 
        toast.success('starting with this transactionHash', transactionHash.message)
       })
      .on('receipt', function (receipt:any) {
        console.log(receipt.contractAddress)
        toast.success('updated contract with', receipt.contractAddress) // contains the new contract address
        
      })
      .catch((error: any) => {
        toast.error(error.message)
      });

    console.log(approve)
  },


  async depositToShareContract(address: string, amount: string) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );
    //TODO: make sure that we check if the contract exists. 
    const newAmount = web3.utils.toWei(amount);

    await contract.methods
      .deposit()
      .send({ from: account.address, value: newAmount })
      .then((receipt: Object) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error: Error) => {
        toast.error(error.message)

      });

  },

  async submitToShareContract(address: string, link: string) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );


    await contract.methods
      .userSubmission(link, true)
      .send({ from: account.address })
      .then((receipt: Object) => {
        console.log("approved");
        console.log(receipt);

        //on success we can update the allownace.
      })
      .catch((error: Error) => {
        console.log(error);
      });

  },

  async AllFromShareContract(address: string) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      address
    );


    const result = await contract.methods.getProfiles().call();
    console.log(result);

    return result;
  },

}