import { Store } from 'vuex';
export { };

declare global{
    interface Window{
        ethereum: any;
    }
}

declare module '@vue/runtime-core' {
    interface State {
        accounts: any, 
        contract: any
    }
    
    interface ComponentCustomProperties{
        $store: Store<State>
    }
}