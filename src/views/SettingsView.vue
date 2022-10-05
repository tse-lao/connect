
<template>
    <main>
      <div class="navigation-items">
          <div @click="$router.push('/settings/')" :active="$route.matched.some(({ name }) => name === '')">
            Overview
          </div>
          <div @click="$router.push('/settings/ethereum')">
            Ethereum 
          </div>
          <div @click="$router.push('/settings/extra')">
            IPFS
          </div>
           <div @click="$router.push('/settings/contracts')">
            Contracts
          </div>
      </div>
  
      <div class="settings-content">
       <RouterView />
      </div>
    </main>
  </template>