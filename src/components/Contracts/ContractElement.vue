<script lang="js">

export default {
    name:"ContractElement",
    props:{
        data:{
            type:String,
        }
    }, 
    mounted(){
        console.log(this.data);
    }
}
</script>

<template>
  <main>
    <div
      class="box"
      @click="$router.push({ path: `/contract/${data}`, params: { id: data } })"
    >
      <div class="main_info">
        <h1 class="title">Update needed for this.</h1>
      </div>
      <div class="bottom">
        <div class="box-extra">Contract: data in the contract</div>
      </div>
    </div>
  </main>
</template>
<style>
.box {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 12px;
}
.main-info h1 {
  font-size: 12px;
}

.bottom {
  display: flex;
  flex-direction: row;
}

.box:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0;
}
.top-box {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 8px;
}
.description {
  font-size: 14px;
  font-weight: 200;

  /**Truncate text**/
  overflow: hidden;
  line-height: 1.3rem;
  max-height: 8rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}

.additional {
  font-size: 12px;
  text-align: left;
  align-content: left;
  min-width: 100px;
}
.box-extra {
  margin: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
</style>