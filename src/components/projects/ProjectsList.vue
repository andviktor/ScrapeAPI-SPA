<script>
import { toast } from 'vue3-toastify'
import DeleteItemButton from '../ui/DeleteItemButton.vue'
export default {
    name: "ProjectsList",
    components: {
        DeleteItemButton
    },
    data() {
        return {
            projects: []
        }
    },
    methods: {
        getProjects() {
            fetch('http://127.0.0.1:8000/api/projects/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.projects = resp;
            })
            .catch(error => console.log(error))
        },
        deleteProject(id) {
            fetch('http://127.0.0.1:8000/api/projects/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                }
            })
            .then(resp => {
              if(resp.status == 204) {
                  let project = this.projects.filter(project => project.id === id)
                  this.projects = this.projects.filter(project => project.id !== id)
                  toast('Project "'+project[0].title+'" has been successfully deleted.', {
                    type: 'success'
                  })
              }
              else{
                toast("Error code: "+resp.status, {
                  type: 'error'
                });
              }
              
          })
          .catch(error => toast("Error: "+error, {
                type: 'error'
              }))
        }
    },
    created() {
        this.getProjects()
    }
}
</script>

<template>
        <div class="content-header row">
          <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">Projects</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'dashboard'}">Dashboard</RouterLink>
                  </li>
                  <li class="breadcrumb-item active">Projects
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="content-header-right col-md-4 col-12 d-none d-md-inline-block">
            <div class="btn-group float-md-right">
                <RouterLink :to="{name: 'projects_create'}" class="btn-gradient-secondary btn-sm white">Create a project</RouterLink>
            </div>
          </div>
        </div>
        <div class="content-body">
            <div id="projects">
                <div class="projects-table-th d-none d-md-block">
                    <div class="col-12">
                        <div class="row px-1">
                            <div class="col-md-3 col-12 py-1">
                                <p class="mb-0">Title</p>
                            </div>
                            <div class="col-md-6 col-12 py-1">
                                <p class="mb-0">Description</p>
                            </div>
                            <div class="col-md-3 col-12 py-1">
                                <p class="mb-0">Actions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="projects-table-tbody">
                    <section 
                        v-for="project in projects" 
                        v-bind:key="project.id" 
                        class="card pull-up"
                    >
                        <div class="card-content">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-md-3 col-12 py-1">
                                            <p class="mb-0"><span class="d-inline-block d-md-none text-bold-700 mr-1">Title:</span>{{ project.title }}</p>
                                        </div>
                                        <div class="col-md-6 col-12 py-1">
                                            <p class="mb-0"><span class="d-inline-block d-md-none text-bold-700 mr-1">Description:</span>{{ project.description }}</p>
                                        </div>
                                        <div class="col-md-3 col-12 py-1">
                                            <p class="mb-0">
                                                <RouterLink :to="{name: 'projects_edit', params: {id: project.id}}" class="mb-0 mr-1 btn-sm btn btn-outline-info round">Edit</RouterLink>
                                                <DeleteItemButton @delete-event="deleteProject(project.id)" />
                                            </p>
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

<style scoped></style>