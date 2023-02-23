// import shareContract from "@/assets/contracts/JSON/ShareContract.json";
import AdInventory from "@/assets/smartContract/artifacts/contracts/AdInventory.json";
import AdSpace from "@/assets/smartContract/artifacts/contracts/AdSpace.json";
import { ethers } from "ethers";

const AdI: any = AdInventory;
const AdS: any = AdSpace;
//const web3 = new Web3(window.ethereum);
const provider = new ethers.providers.Web3Provider(window.ethereum);
export default {

    //only need an verifier account
    //deploy contract. 
    async createSpace() {
        new Promise(async (resolve, reject) => {
            const verifier = "0xfFf09621F09CAa2C939386b688e62e5BE19D2D56";

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (err) {
                reject(err);
            }
            const signer = provider.getSigner();
            const contractFactory = new ethers.ContractFactory(AdS.abi, AdS.data.bytecode, signer);
            const constructorArgs = [verifier];

            try {
                const contract = await contractFactory.deploy(...constructorArgs);
                resolve(contract.address)

            } catch (err) {
                reject(err)
            }
        });
    },


    async createAdInventory() {
        
        const date = new Date('April 1, 2023 00:00:00');
        const second = new Date('April 31, 2023 00:00:00');
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        const unixTimestamp2 = Math.floor(second.getTime() / 1000);
        console.log("start_time" + unixTimestamp)
        console.log("end_time" + unixTimestamp2)
        console.log("day" + 24 * 60 * 60 ); 
        console.log("module" + (unixTimestamp2 - unixTimestamp) / ( 24 * 60 * 60 ));
        
        const dummyData = {
            "name": "My Space",
            "symbol": "MYS", 
            "start_time": unixTimestamp, 
            "end_time": unixTimestamp2, 
            "interval": ( 4 * 60 * 60), 
            "ipfs_req": "mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a",
        };
        
        let args = [dummyData.name, dummyData.symbol, dummyData.start_time, dummyData.end_time, dummyData.interval, dummyData.ipfs_req];
        //hardcoded verifier account:
        new Promise(async (resolve, reject) => {
            // dummy data 
            const dummyAddress= "0xc148a4f4002d3c32a86f6a50231f986443440519";
            const loadContract = new ethers.Contract(dummyAddress, AdS.abi, provider);

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (err) {
                reject(err);
            }
            
            const signer = provider.getSigner();
            try{
                const contract = await loadContract.connect(signer).createInventory(...args);
                resolve(contract);
            }catch(err){
                reject(err)
            } 
        });
    },
    
    async verifyContract() {
        const dummyAddress= "0xc148a4f4002d3c32a86f6a50231f986443440519";

        new Promise(async (resolve, reject) => {
            // dummy data s
            const loadContract = new ethers.Contract(dummyAddress, AdS.abi, provider);

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (err) {
                reject(err);
            }
            
            const signer = provider.getSigner();
            try{
                const contract = await loadContract.connect(signer).verify();
                resolve(contract);
            }catch(err){
                reject(err)
            } 
        });
    }
    
    

}