<script lang="ts">
import { mapState } from "vuex";

export default {
  computed: mapState({
    accounts: (state:any) => state.account.address,
  }),
};
</script>

<template>
  <div class="account_details">Account: {{accounts}}</div>
</template>
<style>
.account_details {
  position: absolute;
  background:#353442;
  top:64px;
  right: 1rem;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  z-index: 100;
}
</style>