<template>
  <div>
    <!-- add New Task -->
    <div class="d-flex justify-content-center">
      <div class="card">
        <div class="card-body">
          <input
            class="form-control"
            v-model="form.title"
            type="text"
            placeholder="Add New Task"
          />
          <br />
          <textarea
            class="form-control"
            v-model="form.description"
            placeholder="Add New Description"
            cols="30"
            rows="3"
          ></textarea>
          <br />
          <button class="btn btn-primary" @click="addTask">Add Task</button>
        </div>
      </div>
    </div>

    <div
      class="d-flex justify-content-center"
      v-for="(task, t) in tasks"
      :key="t"
    >
      <div class="card m-2" style="width: 18rem">
        <div class="card-body">
          <p class="card-text">{{ task.title }}</p>
          <div class="d-flex flex-row">
            <button class="btn btn-primary m-2" @click="deleteTask(task.id)">
              Delete
            </button>
            <button
              class="btn btn-primary m-2"
              data-bs-toggle="modal"
              data-bs-target="#editTask"
              @click="currentTask = task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal editTask -->
      <div
        class="modal fade"
        id="editTask"
        tabindex="-1"
        aria-labelledby="editTaskLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editTaskLabel">Change description</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <textarea
              v-if="currentTask"
              class="modal-body form-control"
              cols="30"
              rows="3"
              v-model="currentTask.description"
            ></textarea>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="currentTask = null"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      currentTask: null,
      form: {
        title: null,
        description: null,
      },
    };
  },

  async mounted() {
    const tasks = await this.$axios.$get("http://localhost/api/tasks");
    this.tasks = tasks;
  },

  methods: {
    async deleteTask(id) {
      await this.$axios.$delete("http://localhost/api/tasks/" + id);

      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    async addTask() {
      this.$axios
        .$post("http://localhost/api/tasks", this.form)
        .then((response) => {
          console.log(response);
          this.tasks = [
            {
              title: response.title,
              description: response.description,
            },
            ...this.tasks,
          ];
        });
      this.form.title = "";
      this.form.description = "";
    },
  },
};
</script>

<style>
</style>