<template>
    <div class="form-control">
        <div class="label-input">
            <input class="label-input" v-model="data.label" placeholder="Type here to create label" />
        </div>
        <select>
            <option v-for="item, key in data.options" :key="key">
                {{item}}
            </option>
        </select>
        <input class="helptext-input" v-model="data.helptext" placeholder="help text you can type here.." type="text">
        <div class="options column">
            <div class="option-add">
                <input v-model="option" placeholder='type option here'/>
                <button @click="addOption">Add</button>
            </div>
        </div>
        <div class="input-requirements">
            <table>
                <tr>
                    <td> Required</td>
                    <td>
                        <label class="switch" for="checkbox">
                            <input type="checkbox" id="checkbox" v-model="data.required" />
                            <div class="slider round"></div>
                        </label>
                    </td>
                </tr>
            </table>
        </div>
        <div class="row-reverse">
            <button @click="addProperty">Save</button>
        </div>
    </div>
</template>
<script lang="ts">
import { checkbox } from '@formkit/inputs';
import type {Select}  from '@/common/types';

type DefaultValues = Pick<Select, 'options'>;

const defaultSelect:DefaultValues = {
    options: [], 
}

export default {
    name: "CreateSelect",
    data() {
        return {
            option: "", 
            data: {
                ...defaultSelect,
            } as Select, 
        };
    },
    methods:{
        addProperty(){
            this.$emit("add", this.data);
        },
        addOption(){
            console.log(this.data)
            this.data.options.push(this.option)
        }
    },
    mounted(){
        this.data.required = true;
    }, 
    components: { checkbox }
}
</script>
<style>
.label-input {
    background: none;
    padding: 0rem !important;
    margin: 0;
    color: rgba(235, 235, 235, 0.64) !important;
    line-height: 1.6;
    width: 90%;
    font-size: 15px;
    letter-spacing: 0.05em;
}

.label-input:focus {
    border: none;
    outline: none;
}

.placeholder-input {
    color: rgba(255, 255, 255, 0.5) !important;
}
table{
    margin: 0.5rem 0rem;
}
.tr{
    margin: 1rem 0rem;
}

.helptext-input {
    background: none !important;
    color: rgba(255, 255, 255, 0.5) !important;
    width: auto;
    padding: 0px;
    margin: -20px;
    margin-left: 5px;
    margin-bottom: 20px;
}

.helptext-input:focus {
    border: none;
    outline: none;
}

.simple-input{
    border-bottom: 1px solid rgba(0,0,0,0.8);
    border-radius: none;
    margin: 12px;
    padding: 4px !important;
}
.simple-label{
    margin-bottom: 1px;
}
.simple-input:focus {
    border: none;
    outline: none;
}
.two-rows {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

</style>