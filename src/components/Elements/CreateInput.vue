<template>
    <div class="form-control">
        <div class="label-input">
            <input class="label-input" v-model="label" placeholder="Type here to create label" />
        </div>
        <input class="placeholder-input" v-model="placeholder" placeholder="Type here for the placeholder" />
        <input class="helptext-input" v-model="helptext" placeholder="help text you can type here.." type="text">
        <div class="input-requirements">
            <table>
                <tr>
                    <td> Required</td>
                    <td>
                        <label class="switch" for="checkbox">
                            <input type="checkbox" id="checkbox" v-model="requirements.required" />
                            <div class="slider round"></div>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>Min length</label> 
                        <input type="number" class="simple-input" v-model="requirements.min_length">
                    </td>
                    <td>
                        <label> Max length</label>
                        <input type="number" class="simple-input" v-model="requirements.max_length" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import { checkbox } from '@formkit/inputs';



export default {
    name: "CreateInput",
    data() {
        return {
            label: "",
            placeholder: "",
            value: "",
            helptext: "",
            requirements: {
                required: true,
                min_length: 0,
                max_length: 0,
            }
        };
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