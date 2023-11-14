<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        project: {},
        project_loaded: false
      }
    },
    components: {
      ItemEditForm
    },
    methods: {
        getProject() {
              fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+this.$route.params.id+'/', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                  }
              })
              .then(resp => resp.json())
              .then(resp => {
                  this.project = resp
                  this.project_loaded = true
              })
              .catch(error => console.log(error))
        },
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+this.project.id+'/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  title: model.title,
                  description: model.description
              })
          })
          .then(resp => {
              if(resp.status == 200) {
                this.$router.push({
                  path: '/projects'
                })
                .then(() => {
                  toast('Project "'+ model.title +'" has been successfully changed.', {
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
    },
    created() {
      this.getProject()
    }
}
</script>

<template>
  <ItemEditForm v-if="project_loaded"
    :title = project.title
    :model = project
    :fields = "[
      {
        type: 'text',
        name: 'project-title',
        placeholder: 'Project title',
        model: 'title'
      },
      {
        type: 'textarea',
        name: 'project-description',
        placeholder: 'Project description',
        model: 'description'
      }
    ]"
    :breadcrumbs = "[
        {
            title: 'Dashboard',
            to: 'dashboard'
        },
        {
            title: 'Projects',
            to: 'projects'
        },
        {
            title: this.project.title
        }
    ]"
    @save-event="saveItem"
  />
</template>
