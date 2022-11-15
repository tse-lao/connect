
export default {
    async getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        //get balance 
        const balance = await window.ethereum.request({method: 'getBalance'})
        return {account:account, balance:balance};

    }


}

