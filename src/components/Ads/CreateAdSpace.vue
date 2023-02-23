<template>
    <div>
        <h1>Create Ad Space </h1>
        
        <p>Creation of Ad Space is possible now.. </p>
        <button @click="createAdSpace">Create Ad Space</button>
        
        <p>
            Create here the inventory based on timestamps
        </p>
        <button @click="createInventory">Create Inventory </button>
        <button @click="verifyContract">Verify </button>
        
    </div>
</template>

<script>
import adowner from "@/store/api/adowner";

export default ({
    name:"CreateAdSpace",
    data(){
        return{
            adSpace:{
                name:"",
                description:"",
                type:"",
                size:"",
                price:"",
                status:""
            }
        }
    },
    methods:{
        async createAdSpace(){
            try{
                const response = await adowner.createSpace();
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }, 
        async createInventory(){
            try{
                const response = await adowner.createAdInventory();
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }, 
        async verifyContract(){
            try{
                const response = await adowner.verifyContract();
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }
    }
    
})
</script>
