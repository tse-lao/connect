<template>
    <div class="form-control">
        <div class="label">
            {{data.label}}
        </div>
        <input class="input" type="input" :placeholder="data.placeholder" :value="data.value" />
        <div class="helptext">{{data.helptext}}</div>
    </div>
</template>
<script lang="ts">

export default{
    name: "InputField", 
    props: {
        data: {
            type: Object,
            required:true
        }
    }
}
</script>