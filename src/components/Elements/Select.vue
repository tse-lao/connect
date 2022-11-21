<template>
    <div class="select" ref="target" >
        <div class="form-input">
            <div class="label">{{data.label}}</div>
            <div class="select-item" @click="modal = !modal">
            {{selected}}
        </div>
        <div class="helptext">{{data.helptext}}</div>
        <div class="select-options" v-if="modal">
            <div @click="selectOption(item)" class="select-option" v-for="item, key in data.options" :key="key">
                {{item}}
            </div>
        </div>
        </div>
     
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default{
    name: "SelectComponent", 
    setup() {
    const target = ref(null)
    const modal = ref(false)

    onClickOutside(target, (event) => {
        modal.value = false;
        
    })

        return { target, modal }
    },
    data(){
        return{
            select: false, 
            options: [
                "input", "select"
            ], 
            selected: "Pick an option",
        }
    }, 
    methods:{
        selectOption(data:string){
            this.modal = false;

            this.selected = data; 
            this.$emit("selectType", this.selected);
        }
    },
    props:{
        data:{
            type: Object, 
            default: {
                options: ["input", "select"],
            }
        }
    }
}
</script>

<style>
.select{
    margin-bottom: 2rem;
}
.select-item{
    padding: 1rem;
    cursor: pointer;
    width: 300px;
   background:rgb(36,32,41);
    border: 1px solid #293236;
    border-radius: 8px;
    display: block;
}
.select-item::after{
    position:absolute;
    align-content: flex-end;
    right: 0;
    margin-right: 1rem;
    content: '\25BC';
}
.select-options{
    position: absolute;
    top: 100;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align:center;
    max-height: 10rem;
    border: 1px solid black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    overflow: scroll;
    
}
.select-option{
    padding: 1rem;
    width: 100%;
    background: rgb(36,32,41);
}
.select-option:hover{
    background: #293236;
    cursor: pointer;
}
</style>