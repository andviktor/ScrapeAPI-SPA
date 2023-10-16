<script>
import { toast } from 'vue3-toastify'
export default {
    data() {
      return {
        project_title: '',
        project_description: ''
      }
    },
    methods: {
        createProject() {
          fetch(`http://127.0.0.1:8000/api/projects/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
              },
              body: JSON.stringify({
                  title: this.project_title,
                  description: this.project_description
              })
          })
          .then(resp => {
              if(resp.status == 201) {
                this.$router.push({
                  path: '/projects'
                })
                .then(() => {
                  toast('Project "'+ this.project_title +'" has been successfully created.', {
                    type: 'success'
                  });
                })
              }
              else{
                resp.json().then((data) => {
                  for (var key in data) {
                    toast(key.toUpperCase() +": "+data[key], {
                      type: 'error'
                    });
                  }
                });
                
              }
              
          })
          .catch(error => toast("Error: "+error, {
                type: 'error'
              }))
        }
    }
}
</script>

<template>
        <div class="content-header row">
          <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">Create project</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'projects'}">Projects</RouterLink>
                  </li>
                  <li class="breadcrumb-item active">Create a project
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="content-body">
          <div class="row">
              <div class="col-12">
                  <section class="card">
                      <div class="card-content">
                          <div class="card-body">
                              <div class="col-12">
                                  <div class="row">
                                      <div class="col-12">
                                          <form class="form-horizontal row mt-2">
                                              <div class="col-12">
                                                  <fieldset class="form-label-group">
                                                      <input v-model="project_title" type="text" class="form-control" id="project-title" placeholder="Project title" required="" autofocus="">
                                                      <label for="project-title">Project title</label>
                                                  </fieldset>
                                                  <fieldset class="form-label-group">
                                                      <textarea v-model="project_description" class="form-control" id="project-description" placeholder="Project description" autofocus="" rows="5"></textarea>
                                                      <label for="project-description">Project description</label>
                                                  </fieldset>
                                              </div>
                                              <div class="col-12 text-right">
                                                  <button @click="createProject()" type="button" class="btn-gradient-primary my-1">Save</button>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
              </div>
          </div>
        </div>
</template>
