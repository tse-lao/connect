<template>
    <main>
        <div class="column gap3">
            <div class="row align-content gap3">
                <img class="icon-token" src="@/assets/images/cf_logo_Logo.png" />
                <span class="balance">
                    {{account.tokenBalance}}
                </span>
                <h4>
                    CFT
                </h4>
            </div>
            <div class="row align-content gap3">
                <img class="icon-token" src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=023" />
                <span class="balance">
                    {{account.balance}}
                </span>
                <h4>
                    MATIC
                </h4>
            </div>
        </div>

    </main>
</template>
<script lang="ts">
import {useAccountStore} from "@/stores/account"

export default {
    name: "TokenBalances",
    setup(){
        const account = useAccountStore()

        return {account}
    }
}

</script>

<style>
.icon-token {
    height: 32px;
    width: 32px;
}
</style>