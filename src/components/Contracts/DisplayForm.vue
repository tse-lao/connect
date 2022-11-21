<template>
    <div>
        <div v-for="item, key in formElements" :key="key">
            <component v-bind:is="item.inputType" :data="item.data" />
        </div>
        <div class="row-reverse">
            <button>Submit</button>
        </div>
    </div>

</template>


<script lang="ts">
import select from '../Elements/Select.vue';
import input from "../Elements/Input.vue"

export default {
    name: "DisplayForm",
    components: { select, input },
    data() {
        return {
            form: [{}], 
        }
    },
    props: {
        formElements: {
            type: Array,
            default: []
        }
    }
}
</script>