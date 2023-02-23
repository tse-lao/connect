<template>
  <div>
    <div v-for="(item, key) in formElements" :key="key">
      <component
        v-bind:is="item.inputType"
        :data="item.data"
        @value-child="valueChange"
      />
    </div>

    <div class="row">
      <div class="toggle">
        <input type="checkbox" id="checkbox" v-model="encrypt" />
        <label for="checkbox"></label>
      </div>
      
      <text>
        Encrypt so its only visible for the contract owner.
      </text>
    </div>
    <div class="row-reverse">
      <button @click="submitForm">Submit</button>
    </div>
  </div>
</template>


<script lang="ts">
import input from "../Elements/Input.vue";
import select from "../Elements/Select.vue";

export default {
  name: "DisplayForm",
  components: { select, input },
  data() {
    return {
      form: {},
      errors: [],
      encrypt: true
    };
  },
  setup() {
    //we need to setup a json option hre.
  },
  props: {
    formElements: {
      type: Array,
      default: [],
    },
  },
  methods: {
    submitForm() {
      console.log(this.form);
      
      this.form['encrypt'] = this.encrypt;

      //we can check if all is well.

      for (let element in this.formElements) {
        let data: object = this.formElements[element];
        console.log(this.formElements[element].data);
      }
      this.$emit("formSubmit", this.form);
    },
    valueChange(inputValue: any) {
      this.form[inputValue.key] = inputValue.value;
    },
  },
};
</script>

<style>
.toggle {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 34px;
  }
  
  .toggle input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle label {
    background-color: #ddd;
    border-radius: 34px;
    cursor: pointer;
    display: block;
    height: 20px;
    position: absolute;
    top: 7px;
    left: 7px;
    right: 7px;
    transition: all 0.3s ease-in-out;
    width: 40px;
  }
  
  .toggle label:before {
    background-color: #fff;
    border-radius: 50%;
    content: "";
    height: 20px;
    left: 0;
    position: absolute;
    top: 0;
    transition: all 0.3s ease-in-out;
    width: 20px;
  }
  
  .toggle input[type="checkbox"]:checked + label {
    background-color: #66bb6a;
  }
  
  .toggle input[type="checkbox"]:checked + label:before {
    transform: translateX(20px);
  }
</style>