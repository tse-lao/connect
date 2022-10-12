import api from "../api/accounts";

export const accounts = {
  namespaced: true,
  state: {
    address: null,
    balance: 1000,
  },
  mutations: {
    newAccount(state, newAddress) {
      state.address = newAddress;
    },
  },
  getters: {},
  actions: {
    loginAccount({ state, commit }) {
      if (window.ethereum) {
        //write a function and update  for now we do it raw
        const account = api.getAccount().then((result) => {
            commit("newAccount", result)
        });
       console.log(account)
      }
    },
  },
};
