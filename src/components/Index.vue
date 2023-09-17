<style scoped>
.task_text {
  width: 70% !important;
}
.task_text p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  margin: 0;
}
.task_text i {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  line-height: 16px;
}
.ddd{
    top:70%;
    left: 0%;
}

@media screen and (max-width: 768px) {
  .rows {
    width: 100% !important;
    margin-top: 10%;
    padding: 10px !important;
    /* border: 1px solid yellow; */
  }
  .act .btn {
    padding: 10px;
  }
}
</style>
<template>
  <div class="animate__animated animate__slideInUp mt-3">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <select
          v-model="selectAction"
          @change="withselect"
          :class="(bgColor ? 'bg-dark text-light' : 'bg-light', ' h-75 ms-2')"
          name=""
          id=""
          style="width: 200px"
        >
          <option :disabled="'true'" selected>---with selected------</option>
          <option value="">Delete</option>
        </select>
      </div>
      <button
        type="button"
        @click="$emit('add-task')"
        class="btn btn-outline-info"
        ref="newItemBtn"
      >
        new item +
      </button>
    </div>

    <div
      class="animate__animated animate__slideInLeft border mt-3"
      v-for="(x, index) in tasks" :key="index"
    >
      <div class="d-flex p-1 align-items-center justify-content-between">
        <span class="me-1 p-1"
          ><input type="checkbox" v-model="selectedItem" :value="index" name="3" id=""
        /></span>
        <div class="task_text p-1">
          <p>{{ x.title }}</p>
          <i
            ><small>{{ x.desc }}</small></i
          >
        </div>
        <!-- <div class="  ">
                        <span :ref="index" class=""> {{ x.date }}</span>
                    </div> -->
        <div class="d-flex act">
          <span class="btn position-relative " data-bs-toggle="tooltip" :title="cvtDate(x.date)"
            :class="timeColor(x.date)"><i class="fas fa-clock"></i
          >
          </span>
          <span class="btn text-info" @click="edit_task(index)"
            ><i class="fas fa-pen"></i
          ></span>
          <span class="btn text-danger" @click="delete_task(index)"
            ><i class="fas fa-trash"></i
          ></span>
        </div>
          
      </div>
    </div>
  </div>

  <!-- notification modal -->
  <div class="modal" :class="{ 'd-block': alarm.displayalerm }">
    <div class="modal-dialog modal-dialog-lg modal-dialog-centered">
      <div
        class="modal-content"
        :class="bgColor ? 'bg-light text-dark' : 'bg-dark text-light'"
      >
        <div class="modal-header">
          <p>Alarm</p>
        </div>
        <div
          class="modal-body d-flex flex-column justify-content-center align-items-center"
        >
          <div><i class="fa-sharp fa fa-bell fa-shake fa-2xl"></i></div>
          <div
            class="p-3 mt-3 w-100"
            
          >
           {{ alarm.desc }}

           <audio ref="alarmAudioTag" :src="alarm.beep"></audio>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-outline-info"
            @click="
              alarm.displayalerm = false;
              delete_task(alarm.index);
              $refs.alarmAudioTag.pause()
            "
          >
            Close & delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import alarmbeep from '../assets/alarm.wav'
export default {
  data() {
    return {
      tasks: [],
      alarm: {
        displayalerm: false,
        desc:'',
        index:null,
        beep: alarmbeep
      },
      displayForm: false,
      selectAction: "---with selected------",
      selectedItem: [],
    };
  },
computed:{

},
  methods: {
    setcookies() {
      const taskArray = JSON.stringify(this.tasks);
      Cookies.set("items", taskArray, { expires: 7 });
    },
    async withselect() {
      this.selectedItem.sort((a, b) => b - a);

      this.selectedItem.forEach((val) => {
        this.tasks.splice(val, 1);
      });
      this.setcookies();
      this.selectAction = "---with selected------";
      this.selectedItem = [];
    },
    timeColor(date){
        let x = this.cvtDate(date)
      
        if (x.search('mins') !== -1) {
            return 'text-success'
        } else if (x.search('hrs') != -1) {
            return 'text-info'
        } else if (x.search('day') !== -1 || x.search('days') !== -1) {
            return 'text-danger'
        } else  {
            return 'disabled border-0'
        }
    },

    addItem() {
      this.btndisable = true;

      const action = setTimeout(() => {
        const date = new Date(this.form.time).getTime();
        const item = {
          task: this.form.task,
          time: date,
          alarm: this.form.alarm,
          desc: this.form.desc,
          alert: this.form.alert,
        };
        this.tasks.push(item);
        this.displayForm = false;
        this.setcookies();

        this.btndisable = false;
        clearTimeout(action);
      }, 5000);
    },
    delete_task(index) {
      this.tasks.splice(index, 1);
      this.setcookies();
    },
    resizenewItemBtn() {
      if (window.innerWidth < 400) {
        this.$refs.newItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      } else {
        this.$refs.newItemBtn.innerHTML = "new item +";
      }
    },
    edit_task(index) {
      const edit_form = {
        index: index,
        title: this.tasks[index].title,
        desc: this.tasks[index].desc,
        date: this.tasks[index].date,
      };
      this.$emit("edit-task", edit_form);
    },
    cvtDate(date){
        const now = new Date().getTime()
        const day =  (date - now )/ 1000
        const get_time = new Date()
        get_time.setSeconds(day)

        if (day < 1) {
            return 'missed'
        }else if (day < 3600){
            return `${get_time.getMinutes() + 1}mins Left`
        }else if (day <= 86400 ) {
            return `${String(get_time.getHours()).padStart(2,'0')} hrs Left`
        }else if(day <= 86400 * 2){
            return `${String(get_time.getDay())} day Left`
        }else{
            return `${String(get_time.getDay())} days Left`

        }
    }, 
    checkAlarm(){
      let date, now, day
      for (const task of this.tasks) {
        
        date = task.date
        now = new Date().getTime()
        day = (date - now)/1000
        if(day < 1 && day > -60){
          this.alert(task.index, task.desc)
        }

      }
    },
    alert(index, desc){
      this.alarm.index = index
      this.alarm.desc = desc
      this.alarm.displayalerm = true
      this.$refs.alarmAudioTag.play()
    }
  },

  mounted() {
    if (Cookies.get("items")) {
      const task = JSON.parse(Cookies.get("items"));
      this.tasks = task;
    }
    this.resizenewItemBtn();
    addEventListener("resize", this.resizenewItemBtn);
    this.$refs.alarmAudioTag.volume = 1.0
    setInterval(this.checkAlarm, 1000)
  },
};
</script>
