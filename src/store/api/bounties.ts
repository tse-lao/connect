// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import contractPool from "@/assets/contracts/artifacts/contractPool.json";
import PoolContract from "@/assets/contracts/artifacts/PoolContract.json";
import PoolFactory from "@/assets/contracts/artifacts/PoolFactory.json";
import Web3 from 'web3';

const PoolFactoryABI: any = PoolFactory.abi;
const contractPoolABI: any = contractPool.abi;
const PoolContractABI: any = PoolContract.abi;
const web3 = new Web3(window.ethereum);

export default {

    async countPools(address: string) {
        const PoolFactoryContract = new web3.eth.Contract(
            PoolFactoryABI,
            address
        );
        //TODO: error handling. 
        const count: number = await PoolFactoryContract.methods.countContracts().call();
        return count;

    },

    async getContractAddress(address: string, i: number) {
        const PoolFactoryContract = new web3.eth.Contract(
            PoolFactoryABI,
            address
        );
        //TODO: error handling. 
        const contractAddress: string = await PoolFactoryContract.methods.pool(i).call();
        
        return contractAddress;
    },
    
    async getBountyDetail(address:string){
        const PoolContract = new web3.eth.Contract(contractPoolABI, address); 
        
        //this we need to convert to an integer in order to work. 
        const totalPools:any = await PoolContract.methods.countContracts().call();
        
        const name:any = await PoolContract.methods.link().call();
        const counter = parseInt(totalPools)
        
        const bounties = [] as any
        //now we want to use the totalPools for something more workty. 
        
        for(let i=0; i < totalPools; i++){
            //this is probably not correct and we need to find the correct one for the proposal and stuff pleace investigsate whcih contract we ned to use. 
            
            const bountyAddress = await PoolContract.methods.pool(i).call();
            console.log(bountyAddress);
            const taskContract = new web3.eth.Contract(PoolContractABI, bountyAddress);
            const balance = await taskContract.methods.contractBalance().call();
            
            console.log(balance);
            await taskContract.methods.proposal().call().then(
                (res:string) => {
                        bounties.push({ address: bountyAddress, proposal: res, balance: balance });
                }
            );
        }
  
        return {total: counter, bounties: bounties, contractName: name}
        
    }, 
    
    async readBounty(address:string){
        const taskContract = new web3.eth.Contract(PoolContractABI, bountyAddress);
        const balance = await taskContract.methods.contractBalance().call();
        
        console.log(balance);
        await taskContract.methods.proposal().call().then(
            (res:string) => {
                    return({ address: address, proposal: res, balance: balance });
            }
        );
    }

}