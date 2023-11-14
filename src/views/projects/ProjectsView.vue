<script>
import { toast } from 'vue3-toastify'
import ItemsList from '../../components/ui/ItemsList.vue'
export default {
    name: "ProjectsList",
    components: {
        ItemsList
    },
    data() {
        return {
            projects: [],
            items_loaded: false
        }
    },
    methods: {
        getProjects() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.projects = resp;
                this.items_loaded = true
            })
            .catch(error => console.log(error))
        },
        deleteItem(id) {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
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

<template>{{ api_key }}
    <ItemsList v-if="items_loaded"
        item_title = "Project"
        items_title = "Projects"
        :items = projects
        :columns = "[
            {
                title: 'title',
                header: 'Title',
                header_class: 'col-md-3',
                class: 'col-md-3'
            },
            {
                title: 'description',
                header: 'Description',
                header_class: 'col-md-9',
                class: 'col-md-4 col-lg-5'
            }
        ]"
        action_buttons_class = "col-md-5 col-lg-4"
        :action_buttons = "[
            {
                title: 'Scrapers',
                to: 'scrapers',
                params: {
                    name: 'project_id',
                    key: 'id'
                },
                class: 'btn-outline-success'
            },
            {
                title: 'Edit',
                to: 'projects_edit',
                params: {
                    name: 'id',
                    key: 'id'
                },
                class: 'btn-outline-info'
            }
        ]"
        :delete_button = "true"
        @delete-event="deleteItem"
        :breadcrumbs = "[
            {
                title: 'Dashboard',
                to: 'dashboard'
            },
            {
                title: 'Projects'
            }
        ]"
        :top_buttons = "[
            {
                title: 'Create a project',
                to: 'projects_create'
            }
        ]"
    />
</template>

<style scoped></style>