// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import contractPool from "@/assets/smartContract/artifacts/contracts/Pool.sol/contractPool.json";
import PoolContract from "@/assets/smartContract/artifacts/contracts/Pool.sol/PoolContract.json";
import PoolFactory from "@/assets/smartContract/artifacts/contracts/PoolFactory.sol/PoolFactory.json";
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
            const taskContract = new web3.eth.Contract(PoolContractABI, bountyAddress);
            const balance = await taskContract.methods.contractBalance().call();
            
            await taskContract.methods.proposal().call().then(
                (res:string) => {
                        bounties.push({ address: bountyAddress, proposal: res, balance: balance });
                }
            );
        }
  
        return {total: counter, bounties: bounties, contractName: name}
        
    }, 
    
    async readBounty(address:string){
        const taskContract = new web3.eth.Contract(PoolContractABI, address);
        const balance = await taskContract.methods.contractBalance().call();
        
        const newProp = await taskContract.methods.proposal().call();
     
        const name = await taskContract.methods.name().call();

        const devCount = await taskContract.methods.devCount().call();
        const userCount = await taskContract.methods.userCount().call();
        const locked = await taskContract.methods.locked().call();

        
        return({ address: address, proposal: newProp, balance: balance, name: name, locked: locked, devCount: devCount, userCount:userCount });
    }, 

    async createBounty(name:string, address:string, link:string, account:string){
        const PoolContract = new web3.eth.Contract(contractPoolABI, address);
        
        //make sure there is a valid string in here. 
        if(link !== undefined && link !== ""){
            
            const tokenAddress = "0x53ED56F9AaDF3AADE8e8C7CB730AF4e6BDa90815"
            
            try{
                await PoolContract.methods.createNewPool(name, link, tokenAddress).send({from:account})
                .on('confirmation', function(confirmationNumber:any, receipt:any){
                    console.log(receipt);
                    
                    if(confirmationNumber === 24){
                        console.log("succesfully uploaded the contract. ")
                    }
                })
                .on('receipt', function(receipt:any){
                    console.log("succesfully created the follwoing contract:")
                    console.log(receipt)
                })
            }catch(error:unknown){
                console.log(error);
            }
           
        }
        
        console.log("error occured in creating the link. ")
    }, 

    async createProposal(title: string, address:string, proposal:string, account:string){
        const taskContract = new web3.eth.Contract(PoolContractABI, address);
       const result = await taskContract.methods.submitProposal(title, proposal).send({from:account})
    },

    async getAllProposals(address:string){
        const taskContract = new web3.eth.Contract(PoolContractABI, address);

        //this is the amount of the proposals there are. 
        const totalProposals = await taskContract.methods.devCount().call();

        console.log(totalProposals)

        let developersList = [];

        for(var i=1; i <= totalProposals; i++){
            console.log(i);
            let developer = await taskContract.methods.developer(i).call();
            //now we have the address so we can do 
            let proposal = await taskContract.methods.devWorks(developer).call();

            developersList.push({developer: developer, proposal:proposal});
        }

        return developersList;

    }, 
    async voteProposalUp(address:string, user:string, account:string){
        console.log("address:  ", address)
        console.log("users: ", user)
        console.log("account: ", account)

        //now we check if it is corresponding to everythign. 
        const taskContract = new web3.eth.Contract(PoolContractABI, address)

        const vote = await taskContract.methods.voteProposal(user).send({from:account})

        console.log(vote);
    }, 


    async depositToContract(contract:string, account:string, amount: string){
        //so we need to have amount. 

        const taskContract = new web3.eth.Contract(PoolContractABI, contract); 

        try{
            await taskContract.methods.deposit(amount).send({from:account})
            .on('confirmation', function(confirmationNumber:any, receipt:any){
                console.log(receipt);
                
                if(confirmationNumber === 24){
                    console.log("succesfully uploaded the contract. ")
                }
            })
            .on('receipt', function(receipt:any){
                console.log("succesfully created the follwoing contract:")
                console.log(receipt)
            })
        }catch(error:unknown){
            console.log(error);
        }
    }

}