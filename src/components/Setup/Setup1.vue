<template>
        <div>
            <div class="step">
                <ol>
                    <li>
                        Visit <a href="https://metamask.io" target="_blank">https://metamask.io</a>
                    </li>
                    <li>
                        Hit "Download" in the menu bar. 
                    </li>
                    <li>
                        Click "Install MetaMask for Chrome" You will be directed to the Chrome Web Store. 
                    </li>
                    <img src="https://metamask.zendesk.com/hc/article_attachments/9914368739099" alt="download"/>

                    <li>
                        Click "Add to Chrome"
                    </li>
                    <li>
                        On the pop up, click "Add extension"
                    </li>
                    <img src="https://metamask.zendesk.com/hc/article_attachments/9914368713115" alt='extension'/>

                    <li>
                        After adding MetaMask Extension, MetaMask will automatically open. You can also make sure it's easily accessible in your toolbar by clicking the jigsaw icon in the top-right of the screen, and hitting the pin icon.
                    </li>
                </ol>
            </div>
            <button @click="changeStep">
                Next step
            </button>
        </div>
</template>

<script lang="ts">
export default {
    name: "setup1", 
    methods: {
        changeStep() {
            this.$emit("nextStep", "Setup2");
        }
    }

}
</script>
<style>
.step{
    margin: 2rem;

}
ol li{
    padding-bottom: 1rem;
}
.step img{
    max-width: 400px;
    max-height: 400px;
    width: auto;
    padding-bottom: 1rem;
}
</style>