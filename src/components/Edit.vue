<style scoped>
input {
  box-shadow: none !important;
  border-top: none !important;
  border-right: none !important;
  border-left: none !important;
  outline: none !important;
}
</style>

<template lang="">
  <div class="w-100 mt-2 animate__animated animate__slideInRight"> <div> <h3
  class="text-center mt-3 shadow p-1 border">Edit Task</h3> <div ref="newItemForm"
  class="form-section mt-5" style="height:150px"> <div id="title" class="mb-3
  animate__animated animate__slideInLeft d-none "> <label for="" class="form-label
  ms-2">Title:</label> <input type="text" class="form-control" v-model="_edit.title"
  required> </div> <div id="desc" class="mb-3 animate__animated animate__slideInRight
  d-none"> <label for="" class="form-label ms-2">Description:
  <small>(optional)</small></label> <textarea v-model="_edit.desc" class="w-100" rows="3"
  placeholder="What do want?"></textarea> </div> <div id="date" class="mb-3
  animate__animated animate__slideInRight d-none"> <label for="" class="form-label
  ms-2">DataTime: </label> <input type="datetime-local" class="form-control"
  v-model="_edit.date" required> </div> </div> <div class="w-50 float-end"> <button
  button="button" class="btn btn-outline-info" ref="backBtn" :disabled="this.default ==
  1?true:false" @click="goBack"> prev</button> <button class="btn btn-outline-info
  float-end" @click="goNext" ref="nextBtn" type="button"> Next</button> </div> </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  props: {
    _edit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      default: 1,
      items: [],
    };
  },

  methods: {
    submitItem() {
      if (this.valid_form()) {
        this._edit.date = new Date(this._edit.date).getTime();
        this.items[this._edit.index].title = this._edit.title;
        this.items[this._edit.index].desc = this._edit.desc;
        let fmt_date = new Date(this._edit.date).getTime();
        this.items[this._edit.index].date = fmt_date;
        Cookies.set("items", JSON.stringify(this.items), { expires: 7 });
        this.$emit("redirect");
      }
    },
    nextSlide(slideOut, slideIn) {
      document.getElementById(slideOut).classList.add("animate__slideOutLeft", "d-none");
      document
        .getElementById(slideIn)
        .classList.remove("d-none", "animate__slideOutLeft");
    },
    valid_form() {
      if (this._edit.title == "") {
        alert("Title Must Be Filled Out");
        this.nextSlide("date", "title");
        this.default = 1;
        return false;
      } else if (this._edit.date == "") {
        alert("Date Must Be Filled Out");
        return false;
      } else {
        return true;
      }
    },
    goNext() {
      let index = this.default;
      if (index == 1) {
        this.nextSlide("title", "desc");
      } else if (index == 2) {
        this.nextSlide("desc", "date");
        this.$refs.nextBtn.innerHTML = "submit";
      } else {
        this.submitItem();
      }
      this.default += 1;
    },

    goBack() {
      let index = this.default;
      if (index == 2) {
        this.nextSlide("desc", "title");
      } else if (index == 3) {
        this.nextSlide("date", "desc");
        this.$refs.nextBtn.innerHTML = "next";
      }
      this.default -= 1;
    },
    formDateTime() {
      let date, year, month, day, hour, minute;
      date = new Date(this._edit.date);
      year = date.getFullYear();
      month = String(date.getMonth() + 1).padStart(2, "0");
      day = String(date.getDay() + 1).padStart(2, "0");
      hour = String(date.getHours() + 1).padStart(2, "0");
      minute = String(date.getMinutes() + 1).padStart(2, "0");
      this._edit.date = `${year}-${month}-${day}T${hour}:${minute}`;
    },
  },

  mounted() {
    if (Cookies.get("items")) {
      this.items = JSON.parse(Cookies.get("items"));
    }
    setTimeout(() => {
      document.getElementById("title").classList.remove("d-none");
    }, 1000);
    this.formDateTime();
  },
};
</script>
