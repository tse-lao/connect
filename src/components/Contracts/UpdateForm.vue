<script lang="ts">
import createInput from "./forms/createInput.json";

export default {
  name: "UpdateForm",
  data() {
    return {
      inputForm: [],
      dataCode: [],
      inputFormat: {},
    };
  },
  methods: {
    updateContract() {
        var data = {
        form: this.dataCode,
      };

      const stringedJSON = JSON.stringify(data);
      const result = await functions.uploadToIPFS(stringedJSON);
      console.log(result);
      
      //TODO: update here. 
      
      
    },
    onAddSubmit() {
      this.inputFormat.$formkit = this.inputFormat.type;
      this.dataCode.push(this.inputFormat);
      this.inputFormat = {};
    },
  },
  mounted() {
    this.inputForm = createInput;
  },
  props: {
    address: {
      type: String,
      default: "nothing found",
    },
  },
};
</script>

<template>
  <div>
    <div class="create-form">
      <div class="enterForm panel">
        <FormKit type="form" @submit="onAddSubmit" v-model="inputFormat">
          <FormKitSchema :schema="inputForm" :data="inputFormat" />
        </FormKit>
      </div>

      <div class="previewForm panel">
        <FormKit
          v-for="(value, key) in dataCode"
          v-bind:key="key"
          :type="value.$formkit"
          :name="value.name"
          :label="value.label"
          :classes="{
            outer: 'mb-5 color-white',
            label: 'block mb-1 font-bold text-sm',
            inner:
              'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
            input:
              'w-full h-10 px-3 border-none text-base text-white-700 placeholder-gray-400',
            help: 'text-xs text-gray-500',
          }"
        />
      </div>
    </div>
    <div class="second-section">
      <button @click="startContract" class="succes">Submit</button>
    </div>
  </div>
</template>

<style scoped>
</style>