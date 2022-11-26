<template>
    <div>
        <Twitter />


        Let me see all your cookies and data.
        <button @click="readCookies"> Read my cookies</button>

        <div>
            <label>
                Clipboard Text
            </label>
            <span>
                {{clipboard}}
            </span>
        </div>
        <div>
            <label>
                IP
            </label>
            <span>
                {{ip}}
            </span>
        </div>                                                                                                                                                                                                                                                                             cookieData                                                                                                                                                                                                                                                                                  }}
    </div>
</template>

<script lang="ts">
import Twitter from './Twitter.vue';


export default {
    name: "CookiesView",
    data() {
        return {
            cookieData: {},
            ip: {},
            clipboard: "",
        };
    },
    methods: {
        readCookies() {
            var pairs = document.cookie.split(";");
            var cookies = {};
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
            }
            this.cookieData = cookies;
            this.readAllInformation();
        },
        readAllInformation() {
            let navi = navigator;
            console.log(navi);
            this.readClipboard();
            this.readIPAddress();
        },
        readClipboard() {
            navigator.clipboard.readText().then((clipText) => this.clipboard = clipText);
        },
        readIPAddress() {
            fetch("https://api.ipify.org/?format=json").then((results) => console.log(results.json()))
                .then(data => console.log(data));
        }
    },
    components: { Twitter}
}
</script>