<template>
    <div>
        <div @click="select = !select">
            Selecteer item.
        </div>
        <div v-if="select">
            <div v-for="item, key in options" :key="key">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default{
    name: "SelectComponent", 

    data(){
        return{
            select: false, 
            options: [
                "input", "select", "textarea"
            ]
        }
    }
}
</script>