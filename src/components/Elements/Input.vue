<template>
    <div class="form-control">
        <div class="label">
            {{data.label}}
        </div>
        <input class="input" type="input" :placeholder="data.placeholder" v-model="inputValue"/>
        <div class="helptext-input">{{data.helptext}}</div>
    </div>
</template>
<script lang="ts">
export default{
    name: "InputField", 
    data(){
       return{
            inputValue:"", 
       } 
    }, 
    props: {
        data: {
            type: Object,
            required:true
        }
    }, 
    watch:{
        inputValue(newValue){
                let newData = {
                    key: this.data.label.trim(), 
                    value: newValue
                }
                this.$emit('value-child', newData)
            
        }
    }
}
</script>
<style scoped>
.form-control{
    margin-bottom: 2rem;
}
.helptext-input{
    color: rgba(255,255,255,0.3);
    font-weight: 300;
    font-style: italic;
    margin-top: 0rem;
}
</style>