<template>
  <main>
    <h1>Dashboard</h1>
    <div class="row">
      <div class="column">
        <div class="panel">
            <TokenBalances />
        </div>
        <div class="panel">
            <TokenTransfers />
        </div>
      </div>

      <div class="panel fill">
        <Airdrop />
        <hr />
        Smart contract interactions
        <Transfer />
        
      </div>
    </div>


  </main>
</template>

<script lang="ts">
import Airdrop from "@/components/Dashboard/Airdrop.vue";
import TokenBalances from "@/components/Dashboard/TokenBalances.vue"
import TokenTransfers from "@/components/Dashboard/TokenTransfers.vue";
import Transfer from "@/components/Dashboard/Transfer.vue";

export default {
  name: "Dashboard",
  components: { TokenBalances, TokenTransfers, Transfer, Airdrop }
};
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  gap:1rem;
  flex-wrap: wrap;
}
.column{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.fill{
  align-items: stretch;
  align-self:stretch;
}
.align-content{
  align-content: center;
  align-items: center;
}
.gap3{
  gap: 3rem;
}
</style>