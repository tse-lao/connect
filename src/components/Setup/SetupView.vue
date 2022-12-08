<template>
    <main>
        <div class="onboarding">
            <div class="profile-default">
            </div>
            
            <component @nextStep="changeStep" v-bind:is="selectedComponent"></component>
        </div>
        <!--We can create something better and simpler. -->
    </main>
</template>
<script lang="ts">
import Setup1 from '@/components/Setup/Setup1.vue';
import Setup2 from '@/components/Setup/Setup2.vue';
import Setup3 from '@/components/Setup/Setup3.vue';


export default {
    name: "SetupView",
    components: {
        Setup1, Setup2, Setup3
    },
    setup(){
        
    },
    data() {
        return {
            selectedComponent: "Setup1"
        }
    }, methods: {
        checkStatus(){
            if(window.ethereum){
                console.log("We have implement window ethereum.");
                this.changeStep("Setup2")
            }
        }, 
        changeStep(step: string) {
            this.selectedComponent = step;
        }
    }, 
    mounted(){
        this.checkStatus()
    }
}

</script>

<style>
.onboarding{
    display: flex;
    flex-direction: column;
    align-content:center;
    justify-content: center;
    align-items: center;
    
}
.profile-default{
    border: 1px solid black;
    height: 124px;
    width: 124px;
    background: lightgray;
    border-radius: 50%;
}
</style>