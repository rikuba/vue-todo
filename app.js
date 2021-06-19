/* globals Vue */

const generateId = () => Math.random().toString(36).slice(2).toUpperCase()

const app = new Vue({
  data: {
    newTaskText: '',
    tasks: []
  },
  mounted () {
    try {
      this.tasks = JSON.parse(localStorage.tasks || '[]')
    } catch {
      this.tasks = []
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler (tasks) {
        localStorage.tasks = JSON.stringify(tasks)
      }
    }
  },
  methods: {
    addNewTask () {
      if (!this.newTaskText) {
        return
      }

      const task = {
        id: generateId(),
        text: this.newTaskText,
        isCompleted: false
      }
      this.tasks.push(task)
      this.newTaskText = ''
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
    }
  }
})

app.$mount('#app')
