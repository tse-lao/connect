<script lang="ts">
import { mapState } from "vuex";

export default {
  computed: mapState({
    accounts: (state) => state.account.address,
  }),
};
</script>

<template>
  <div id="account_details">Account: {{accounts}}</div>
</template>
<style>
#account_details {
  background: rgba(255,255,255,0.1);
  position: relative;
  bottom: 200;
  left: 200;
  width: 200px;
  height: 200px;
}
</style>