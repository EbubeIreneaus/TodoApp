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
    <div class="w-100  mt-2 animate__animated animate__slideInRight">
        <div>
        <h3 class="text-center mt-3 shadow p-1 border">Add New Task</h3>

        <form @submit.prevent="submitItem">
        <div ref="newItemForm" class="form-section mt-5" style="height:150px">
            <div id="title" class="mb-3 animate__animated animate__slideInLeft d-none ">
              <label for="" class="form-label ms-2">Title:</label>
              <input type="text"
                class="form-control" v-model="form.title" required>
            </div>
            <div id="desc" class="mb-3 animate__animated animate__slideInRight d-none">
              <label for="" class="form-label ms-2">Description: <small>(optional)</small></label>
           <textarea v-model="form.desc" class="w-100"  rows="3" placeholder="What do want?"></textarea>
            </div> 
             <div id="date" class="mb-3 animate__animated animate__slideInRight d-none">
              <label for="" class="form-label ms-2">DateTime: </label>
              <input type="datetime-local"
                class="form-control" v-model="form.date" required>
            </div>
        </div>


  <div class="w-50 float-end">

      <button class="btn btn-outline-info" ref="backBtn" :disabled="this.default == 1?true:false" @click="goBack"> prev</button>
      <button class="btn btn-outline-info float-end" @click="goNext" ref="nextBtn" type="button"> Next</button>
  </div>
    </form>
    </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            default: 1,
            form: {
                title: "",
                desc: "",
                date: ''
            },
            items: []
        }
    },

    methods: {
        submitItem() {
            if (this.form.title == '') {
                alert('Title Must Be Filled Out')
                this.nextSlide('date', 'title')
                this.default = 1
                return
            } else if (this.form.date == '') {
                alert('Date Must Be Filled Out')
                return
            }
            this.form.date = new Date(this.form.date).getTime()
            this.items.push(this.form)
            Cookies.set('items', JSON.stringify(this.items), { expires: 7 })
            this.default = 1
            this.$emit('redirect')
        },
        nextSlide(slideOut, slideIn) {
            document.getElementById(slideOut).classList.add('animate__slideOutLeft', 'd-none')
            document.getElementById(slideIn).classList.remove('d-none', 'animate__slideOutLeft');
        },
        goNext() {
            let index = this.default
            if (index == 1) {
                this.nextSlide('title', 'desc')
                // document.getElementById().classList.
            } else if (index == 2) {
                this.nextSlide('desc', 'date')
                this.$refs.nextBtn.innerHTML = 'submit'
                this.$refs.nextBtn.setAttribute('type', 'submit')
            } else {
            }
            this.default += 1;
        },

        goBack() {
            let index = this.default
            if (index == 2) {
                this.nextSlide('desc', 'title')
            } else if (index == 3) {
                this.nextSlide('date', 'desc')
                this.$refs.nextBtn.innerHTML = 'next'
                this.$refs.nextBtn.setAttribute('type', 'button')
            }
            this.default -= 1;
        }
    },

    mounted() {
        if (Cookies.get('items')) {
            this.items = JSON.parse(Cookies.get('items'))
        }
        setTimeout(() => {
            document.getElementById('title').classList.remove('d-none')
        }, 1000)

    },
}
</script>