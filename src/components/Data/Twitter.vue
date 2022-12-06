<template>
    <main>
        <div class="twitter-content">
            <div class="Explanation">
                <h1>
                    Twitter Sentimental Analysis.
                </h1>
                <span>
                    You are able to check the tweets sentimental analysis, here we provide the option to check for
                    instance your own @[your username] tweets to see if your
                    tweets are overall positive or negative. Depending on the size it currently takes around 5 minutes
                    to gather the information from twitter.
                </span>
            </div>
            <input v-model="search" />
            <button @click="getTweets" :disabled="loading">Search Tweets</button>

            <Loading v-if="loading" />
            <div class="tweet-overview">
                <div v-if="(data != null && data.tweets.length > 0)" v-for="(item, key) in data.tweets" :key="key">
                    <Tweet>
                        <template #user>
                            {{ item[1] }}
                        </template>
                        <template #result><div>
                            {{ item[3] }}
                        </div></template>
                        <template #tweet>{{ item[2] }}</template>
                        <template #date>{{ item[0] }}</template>
                    </Tweet>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Loading from "@/components/Elements/Loading.vue"
import Tweet from "@/components/Data/Tweet.vue"
import { useToast } from "vue-toastification"
export default {
    name: "TwitterData",
    components: { Loading, Tweet},
    data() {
        return {
            data: {
                positiveCount: 0,
                negativeCount: 0,
                tweets: []
            },
            search: "",
            loading: false,
        }
    },
    setup(){
        const toast = useToast();

        return {toast}
    },
    methods: {
        getFollowers() {

            //change this to public IP address 
            try {
                fetch("http://192.168.0.102:9000/").then(result => result.json()).then(
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
            this.loading = true;
            this.data.tweets = []

                fetch("http://192.168.0.102:9000/tweets/" + this.search).then(result => result.json()).then(
                    data => {
                        console.log(data)
                        this.data = data;
                        this.loading = false
                    }
                ).catch((error) => {
                    window.alert("Currently the API is offline try again later.. ")
                    console.log(error)
                    this.loading = false;
                    
                })
           
        },
        signIn() {
            fetch("http://192.168.0.102:9000/twitter/authorize").then(result => result.json()).then(
                data => {
                    this.loading = false;
              
                    console.log(data)
                }
            )
        }
    }
}
</script>
<style>
.tweet-overview {
    display: flex;
    flex-direction: column;
    gap: 2rem;

}
.twitter-content{
    display: flex;
    flex-direction: column;
    max-width: 800px;
    align-content: center;
    align-self: center;
    align-items: center;
}

input{
    border: 1px solid black;
    color: black;
}
</style>