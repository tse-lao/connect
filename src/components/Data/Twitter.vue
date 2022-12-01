<template>
    <main>
        <div>
            <h3>Showcase all data below:</h3>
            <button @click="signIn">Sign me In on Twitter</button>
            <button @click="getTweets">Show tweets</button>
            <p>
                {{ data }}
            </p>
        </div>
    </main>
</template>

<script lang="ts">
export default {
    name: "TwitterData",
    data() {
        return {
            data: null,
        }
    },
    methods: {
        getFollowers() {

            //change this to public IP address 
            try {
                fetch("http://0.0.0.0:9000/followers/connectfastv1/").then(result => result.json()).then(
                    data => {
                        console.log(data)
                        this.data = data;
                    }
                )
            }
            catch (e) {
                console.log(e)
            }

        },

        getTweets() {
            try {
                fetch("http://0.0.0.0:9000/tweets/connectfastv1/").then(result => result.json()).then(
                    data => {
                        console.log(data)
                        this.data = data;
                    }
                )
            }
            catch (e) {
                console.log(e)
            }
        },
        signIn() {
            let consumerToken = import.meta.env.VITE_TWITTER_CONSUMER_TOKEN;
            const rootUrl = "https://twitter.com/i/oauth2/authorize";
            const options = {
                redirect_uri: "http://app.localhost:5147/twitter", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
                client_id: "cV9Gems2dWxnSWs2OTlyUXhEUDQ6MTpjaQ",
                state: "state",
                response_type: "code",
                scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "), // add/remove scopes as needed
            };
            const qs = new URLSearchParams(options).toString();
            let url =  `${rootUrl}?${qs}`

            url = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=cV9Gems2dWxnSWs2OTlyUXhEUDQ6MTpjaQ&redirect_uri=https://app.connect-fast.com/twitter&scope=tweet.read%20users.read%20follows.read%20follows.write"

            window.open(url, '_blank').focus();
        }
    }
}
</script>