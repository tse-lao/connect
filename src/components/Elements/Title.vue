<template>
  <div class="top-content">
    <div class="back" @click="$router.go(-1)">
      <img
        src="../../assets/icons/backward.svg"
        class="back-icon"
        alt="go back"
      />
    </div>
    
    <h3>
        <slot name="title"></slot>
    </h3>

    <div class="options">
        <slot name="actions"></slot>
   
    </div>
  </div>
</template>
<style>
.top-content {
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-around;
}
.back-icon {
  height: 24px;
  width: 24px;
  filter: invert(1);
}
.options {
  display: flex;
  gap: 1.5em;
}
.options img {
  filter: invert(1);
  opacity: 50%;
  height: 2rem;
}
img:hover {
  opacity: 100%;
  cursor: pointer;
}
</style>