<template>
  <main>
    <h1>Task Board</h1>
    <p>Create a list of tasks</p>

    <div class="create-new">
      <input type="text" v-model="newTask" placeholder="Add a new task" />
      <button @click="addTask">Add</button>
    </div>

    <div class="tasks">
      <Task v-for="(task, i) in $store.state.tasks" :key="i" :task="task" />
    </div>
  </main>
</template>

<script>
export default {
  async mounted() {
    const tasks = await this.$axios.$get("http://localhost/api/tasks");
    this.$store.commit("ADD_TASKS", tasks);
  },

  data() {
    return {
      newTask: "",
      newDescription: "",
    };
  },

  methods: {
    addTask() {
      if (this.newTask) {
        this.$store.commit("ADD_TASK", this.newTask);
        this.newTask = "";
      }
    },
  },
};
</script>
