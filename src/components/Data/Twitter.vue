<template>
    <main>
        <div>
            <h3>Showcase all data below:</h3>
            <button @click="getFollowers">Show Twitter api data</button>
            <button @click="getTweets">Show tweets</button>
            <p>
                {{data}}
            </p>
        </div>
    </main>
</template>

<script lang="ts">
    export default{
        name: "TwitterData", 
        data(){
            return{
                data: null, 
            }
        },
        methods: {
            getFollowers(){

                //change this to public IP address 
                try{
                    fetch("http://0.0.0.0:9000/followers/connectfastv1/").then(result => result.json()).then(
                    data => {
                        console.log(data)
                        this.data = data;
                    }
                )
                }
                catch(e){
                    console.log(e)
                }            
            
        }, 

        getTweets(){
            try{
                    fetch("http://0.0.0.0:9000/tweets/connectfastv1/").then(result => result.json()).then(
                    data => {
                        console.log(data)
                        this.data = data;
                    }
                )
                }
                catch(e){
                    console.log(e)
                }   
        }, 

        analyzeAutomatedTweets(){
            //here we will analyze all the followers and brand and the engagement of the users with the tweets. 

            try{
                fetch("https://0.0.0.0:9000/twitter/resultsofusers/username").then(result => result.json())
                .then(data => {
                    console.log(data)
                    this.data = data;
                })
            }
        }
    }
    }
</script>