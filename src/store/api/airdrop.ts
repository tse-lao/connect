// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import Airdrop from "@/assets/smartContract/artifacts/contracts/Airdrop.sol/Airdrop.json";
import {useAccountStore} from "@/stores/account"
import Web3 from 'web3';

const AirdropABI: any = Airdrop.abi;
const web3 = new Web3(window.ethereum);

const account =  useAccountStore();
export default {
    //first of all we want to get the account we are using from store. 

    readAccount(){
        return account.address;
    }
}