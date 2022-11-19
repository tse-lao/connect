<template>

    <div id="nav">
        <div class="nav-item" to="/" @click="$router.push('/')">
          <img src="@/assets/icons/dashboard.png" class="nav-item-icon" />
          <router-link to="/"> Home</router-link>
        </div>

        <div class="nav-item" @click="$router.push('/contracts')">
          <img class="nav-item-icon" src="@/assets/icons/smart-contracts.png" alt="Contracts" />
          <router-link to="/contracts">Contracts</router-link>
        </div>
        <div class="nav-item" @click="$router.push('/bounties')">
          <img class="nav-item-icon" src="@/assets/icons/bounty.png" alt="Dashboard" />
          <router-link to="/bounties">Bounties</router-link>
        </div>

       
      </div>

</template>
<script lang="ts">
export default{

}</script>

<style>

#logo img {
  filter: invert(0);
  width: 32px;
  height: 32px;
  opacity: 100%;
}

#logo {
  display: block;
  margin: auto;
  padding: 10% 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 24px;
  margin-top: 24px;
}


#nav {
    top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #cacacc;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
}

.nav-item:hover {
  filter: brightness(0) invert(1);
  cursor: pointer;
}

.nav-item:hover a {
  color: #fff !important;
}

.nav-item a {
  color: #cacacc;
  text-decoration: none;
}

.nav-item-icon {
  width: 24px;
  height: 24px;
  padding: 10px;
  filter: brightness(3) invert(1);
}

.nav-item-bounty {
  width: 42px;
  height: 42px;
  padding: 10px;
}

</style>