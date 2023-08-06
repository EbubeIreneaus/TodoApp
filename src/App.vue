<style>
main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

main .rows {
  width: 70%;
  margin-top: 10%;
  /* border: 1px solid yellow; */
}
.screenloader{
  width:100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  background-color: black;

}
.screenloader img{
width:200px;
height: 200px;
}
@media screen and (max-width: 768px) {
  main .rows {
    width: 90%;
    margin-top: 10%;
    /* border: 1px solid yellow; */
  }
}
</style>
<template>
  
  <main :class="theme">
    <div class="rows">
      <div class="mb-1 d-flex justify-content-between align-items-center border p-1" >
        <span class="btn" :class="theme" ref="bar" @click="comp = 'index'" v-html="home"></span>
        <button class="btn" :class="theme" @click="changeTheme"><i class="fa" :class="dark_mode?'fa-moon':'fa-sun'"></i></button>
      </div>

      <div ref="componetTag" class="d-none">
        <component
          :is="comp"
          @redirect="comp = 'index'"
          @edit-task="editForm"
          :_edit="edit_task"
          @add-task="comp = 'new-item'"
        ></component>
      </div>
    </div>
    <div class="screenloader animate__animated" ref="screenloader">
  <img :src="loader" alt="aaaa">
  </div>
  </main>
</template>

<script>
import Cookies from "js-cookie";
import Loader from './assets/loader.gif'

export default {
  data() {
    return {
      dark_mode: null,
      comp: "index",
      edit_task: "",
      loader:Loader
    };
  },
  computed: {
    home() {
      let x;
      if (this.comp === "index") {
        x = "My Task App";
      } else {
        x = '<i class="fas fa-arrow-left"></i>';
      }
      return x;
    },
    theme(){
      if (this.dark_mode) {
        return 'bg-dark text-light '
      } else {
        return 'bg-light text-dark '
      }
    }
  },
  methods: {
    setcookies() {
      Cookies.set("taskArray", taskArray, { expires: 7 });
    },

    editForm(task) {
      this.edit_task = task;
      this.comp = "edit";
    },
    changeTheme(){
      if(this.dark_mode){
        Cookies.set('theme', 'light')
        this.dark_mode = false
      }else{
        Cookies.set('theme', 'dark')
        this.dark_mode = true
      }
    },
    domLoaded(){
      this.$refs.screenloader.classList.add('animate__slideOutLeft')

      this.$refs.componetTag.classList.remove('d-none')
    }
  },

  mounted() {
    if (Cookies.get('theme')) {
      this.dark_mode = Cookies.get('theme') == 'dark'?true:false
    }else{
      Cookies.set('theme', 'light')
    }

    window.addEventListener('load', ()=>{
      setTimeout(this.domLoaded, 5000)
    })

  },
};
</script>
