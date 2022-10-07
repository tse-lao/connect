import { createLogger, createStore } from "vuex";
import { accounts } from "./modules/accounts";


const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
    modules:{
        account: accounts
    }, 
    
    strict: debug, 
    plugins: debug ? [createLogger()]: []
})