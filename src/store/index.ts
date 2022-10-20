import { createLogger, createStore } from "vuex";
import { accounts } from "./modules/accounts";
import { bounties } from "./modules/bounties";
import { contracts } from "./modules/contracts";


const debug = process.env.NODE_ENV !== "production";

export const store:any = createStore({
    modules:{
        account: accounts,
        contracts: contracts,
        bounties: bounties
    }, 
    
    strict: debug, 
    plugins: debug ? [createLogger()]: []
})