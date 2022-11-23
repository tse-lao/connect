import contractInterface from "@/assets/smartContract/artifacts/contracts/ProfileRegistration.sol/ProfileRegistration.json";
import { useToast } from "vue-toastification";
import Web3 from "web3";
import {useAccountStore} from "@/stores/account"
import { registerRuntimeCompiler } from "vue";



const abi:any = contractInterface.abi;
const address = import.meta.env.VITE_PROFILE;
const toast = useToast();
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(
  abi,
  address
);

export default{
    async readContract(){

         const minBalance = await contract.methods.minBalance().call();
         const cost = await contract.methods.cost().call();
         const token = await contract.methods.token.call();

        return {minBalance: minBalance, cost: cost, tokenAddress:token}        
    }, 

    async getName(){
        const account = useAccountStore();
        console.log(account.address)
        const name = await contract.methods.username(account.address).call()
        console.log(name);
        if(name.length < 3){
            return account.address;
        }
        return name;
    }, 

    async submitName(value:string){
        const account = useAccountStore();
        console.log(value)
        if(value == ""){
            toast.error("Make sure that you have valid username")
            return;
        }
        const check = await contract.methods.registeredName(value).call(); 
        console.log(check)
        if(check){
            toast.error("This name is already registered");
            return;
        }

        await contract.methods.register(value).send({from: account.address})
    }   
}