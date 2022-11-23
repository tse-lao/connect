<template>
  <div class="file">
    <div class="type" v-if="file.fileType == 'directory'">
      <img src="../../assets/icons/interface-sign/more-alt.svg" />
    </div>
    <div class="type" v-else>
      <img src="../../assets/icons/interface-sign/more-alt.svg" />
    </div>
    <div class="name">
      {{ file.name }}
      <span class="date">
        {{ file.last_modified }}
      </span>
    </div>
    <div class="size" v-if="file.fileType == 'directory'">xx items</div>
    <div class="size" v-else>
      {{ Math.round(file.size / 10000, 2) / 100 }} MB
    </div>
    <div class="options">
      <img
        src="../../assets/icons/interface-sign/more-alt.svg"
        @click="console.log('something')"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default {
    props: {
    file: {
        type: Object
    }}
    
}
</script>

<style>
img {
  height: 24px;
  width: 24px;
}
.file{
  display: flex;
  font-family: monospace;
  gap: 8px;
  width: 100%;
  align-content: center;
  align-items: center;
  background: #21212a;
  color: #afafb2;
  border-radius: 4px;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 8px;
}
.file:hover{
  cursor:pointer;
  background: #313138;
}
.file div{
  margin: 4px 8px;
}
span::before{
  content: "\A";
  white-space: pre;
}
.date{
  font-size: 10px;
  font-style: italic;
  flex: 2;
}
.name {
  flex:6;
  align-content: center;
}
.file .options{
  transform: rotate(90deg);
  height: 8px;
}
</style>