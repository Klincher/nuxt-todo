export const state = () => ({
  tasks: [],
});

export const mutations = {
  ADD_TASK(state, task) {
    this.$axios
      .$post("http://localhost/api/tasks", {
        title: task,
        description: "qwerty",
      })
      .then((response) => {
        console.log(response);
        state.tasks = [{ title: response.title, description: response.description, done: false }, ...state.tasks];
      });
  },
  ADD_TASKS(state, tasks) {
    state.tasks = [...tasks, ...state.tasks];
  },
  REMOVE_TASK(state, task) {
    state.tasks.splice(state.tasks.indexOf(task), 1);
  },
  TOGGLE_TASK(state, task) {
    task.done = !task.done;
  },
};
