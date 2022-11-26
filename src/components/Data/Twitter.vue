<template>
    <main>
        <div>
            <h3>Showcase all data below:</h3>
            <button @click="getFollowers">Show Twitter api data</button>
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
        }
    }
    }
</script>