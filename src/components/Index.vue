<style scoped>
main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;

    border: 2px solid red;
}

main .rows {
    width: 70%;
    margin-top: 10%;
    /* border: 1px solid yellow; */
}

@media screen and (max-width: 768px) {
    .rows {
        width: 100% !important;
        margin-top: 10%;
        padding: 10px !important;
        /* border: 1px solid yellow; */
    }
}
</style>
<template>
    <main :class="bgColor ? 'bg-dark text-light' : 'bg-light'">
        <div class="rows">
            <div class=" mb-1 d-flex justify-content-between align-items-center border p-1">
                <div class="p-2">My Todo App</div>
                <div class="form-check form-switch me-3">
                    <input type="checkbox" class="form-check-input" :checked="bgColor" @change="bgColor = !bgColor" name=""
                        id="">
                    <label for="" form-check-label>{{ bgColor ? 'Light' : 'Dark ' }}</label>
                </div>
            </div>
            <div class=" d-flex justify-content-between ">
                <div class="d-flex align-items-center">
                    <select v-model="selectAction" @change="withselect"
                        :class="bgColor ? 'bg-dark text-light' : 'bg-light', ' h-75 ms-2'" name="" id=""
                        style="width: 200px;">
                        <option :disabled="'true'" selected>---with selected------</option>
                        <option value="">Delete</option>

                    </select>

                </div>
                <button type="button" @click="displayForm = !displayForm" class=" btn btn-outline-info "> New
                    item +
                </button>
            </div>

            <div class=" border mt-3" v-for="(x, index) in tasks">
                <div class="row p-3">
                    <span class="col-1"><input type="checkbox" v-model="selectedItem" :value="index" name="3" id=""></span>
                    <p class="col-4 "> {{ x.task }}</p>
                    <div class="col-3  ">
                        <span :ref="index" class="mx-auto  float-end"> {{ x.alert }}</span>
                    </div>
                    <div class="col">
                        <span class="btn btn-outline-info  float-end " @click="delete_task(index)">delete</span>
                    </div>
                </div>
            </div>

            <!-- Modal Body form -->
            <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
            <div class="modal" :class="{ 'd-block': displayForm }" id="modalForm">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content" :class="bgColor ? 'bg-dark text-light' : 'bg-light'">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">Add New Item</h5>
                            <!-- <button type="button" class="btn btn-close btn-outline-info" data-bs-dismiss="modal"
                                aria-label="Close"></button> -->
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="addItem()" ref="form">
                                <div class="mb-3">
                                    <label for="" class="form-label">Task</label>
                                    <input type="text" required v-model="form.task" id="" class="form-control"
                                        placeholder="new Task" />
                                </div>
                                <div class="mb-3">
                                    <label for="" required class="form-label">Time <small>adjust this time! </small></label>
                                    <input type="datetime-local" v-model="form.time" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Desc <small>(optional)</small></label>

                                    <textarea class="form-control" v-model="form.desc" id="" rows="3"></textarea>

                                </div>
                                <div class="mb-3 form-check">

                                    <input type="checkbox" v-model="form.alarm" class="form-check-input" />
                                    <label for="" class="form-check-label">Raise Alarm</label>
                                </div>
                                <button type="submit" :disabled="btndisable" class="btn btn-outline-info">Add Item</button>
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                @click="displayForm = !displayForm">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- notification modal -->
            <div class="modal" :class="{ 'd-block': alarm.displayalerm } ">
                <div class="modal-dialog modal-dialog-lg modal-dialog-centered">
                    <div class="modal-content" :class="bgColor ? 'bg-light text-dark' : 'bg-dark text-light'">
                        <div class="modal-header">
                            <p>Alarm</p>
                        </div>
                        <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                              <div><i class="fa-sharp fa fa-bell fa-shake fa-2xl"></i></div>
                              <div class="p-3 mt-3 w-100" :class="bgColor?'text-dark-emphasis':'text-info'">
                              {{ alarmDesc }}
                              
                              </div>
                        </div>
                        <div class="modal-footer">
                        <button class="btn btn-outline-info" @click="alarm.displayalerm=false; delete_task(alarm.index)">
                        Close & delete</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </main>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            'bgColor': true,
            selectedItem: [],
            tasks: [],
            displayForm: false,
            form: {
                task: "",
                time: null,
                alarm: true,
                desc: "",
                alert: null
            },
            
            selectAction: '---with selected------',
            btndisable: false,
            timeNow: null,
            alarm: {
                alarmDesc: null,
                 index:null
            },
           
            displayalerm:false
        }
    },

    methods: {
        setcookies() {
            const taskArray = JSON.stringify(this.tasks)
            Cookies.set('taskArray', taskArray, { expires: 7 })
        },

        addItem() {
            this.btndisable = true

            const action = setTimeout(() => {
                const date = new Date(this.form.time).getTime()
                const item = {
                    'task': this.form.task,
                    'time': date,
                    'alarm': this.form.alarm,
                    'desc': this.form.desc,
                    'alert': this.form.alert
                }
                this.tasks.push(item)
                this.displayForm = false
                this.setcookies()

                this.btndisable = false
                clearTimeout(action)
            }, 5000)



        },
        delete_task(index) {
            this.tasks.splice(index, 1)
            this.setcookies()
        },

        async withselect() {

            this.selectedItem.sort((a, b) => b - a)

            this.selectedItem.forEach(val => {
                this.tasks.splice(val, 1)
            })
            this.setcookies()
            this.selectAction = '---with selected------';
            this.selectedItem = []
        }

    },
    computed: {

    },

    created() {
        if (Cookies.get('taskArray')) {
            const task = JSON.parse(Cookies.get('taskArray'))
            this.tasks = task

        }
        setInterval(() => {
            const time = new Date().getTime()
            this.timeNow = time
            this.tasks.forEach((element, index) => {
                const task_time = element.time / 1000
                const timeNow = this.timeNow / 1000
                const alertTime = task_time - timeNow

                if (alertTime <= 0) {

                    element.alert = '00'
                    this.alarmDesc  = element.desc
                    this.alarm.displayalerm = true
                    this.alarm.index = index
                    
                    
                } else if (alertTime < 60) {
                    element.alert = '<1 min';

                } else if (alertTime < 3600) {
                    element.alert = '<1 hrs';

                } else if (alertTime < 86400) {
                    element.alert = '<1 day';

                } else {
                    element.alert = '>1 day';

                }



            });





        }, 1000)
    },

    beforeMount() {


    },
}
</script>
