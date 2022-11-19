<template>
    <div class="account">
        <div class="profile-icon" @click="account.getAccount()">
            <ProfilePicture ref="profilePic" :address="account.address" />
        </div>
        <div class="stats">
            <span class="account-trunc">{{ account.address }}</span>
            <span class="account-balance">
                {{ account.balance }}
            </span>

        </div>

    </div>

</template>

<script lang="ts">
import { useAccountStore } from "@/stores/account"
import ProfilePicture from "../Account/ProfilePicture.vue";
export default {
    components: { ProfilePicture },
    setup() {
        const account = useAccountStore();

        return { account }
    },
}
</script>
<style>
.account {
    display: flex;
    flex-direction: row;
}

.stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.account-trunc {
    width: 80px;
    direction: rtl;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.account-balance {
    font-weight: 500;
}

.profile-pic {
    height: 64px;
    position: fixed;
    width: 64px;
    border-radius: 50%;
    border: 1px solid #000;

}

.profile-pic:hover {
    opacity: 0.5;
}

.profile-icon {
    margin: auto;
    padding: 8px;
}

.profile-icon:hover {
    opacity: 0.5;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.4)
}
</style>