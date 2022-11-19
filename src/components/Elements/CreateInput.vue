<template>
    <div class="form-control">
        <div class="label-input">
            <input class="label-input" v-model="label"  placeholder="Type here to create label"/>
        </div>
        <input v-model="placeholder" placeholder="Type here for the placeholder" />
    </div>
</template>
<script lang="ts">

export default{
    name: "CreateInput", 

    data(){
        return{
            label: "", 
            placeholder: ""
        }
    }
}
</script>
<style>
.label-input{
    background: none;
    padding: 0rem !important;
    margin: 0;
}
.label-input:focus{
    border: none;
    outline:none;
}
</style>