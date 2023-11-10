<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../components/ui/ItemEditForm.vue';
export default {
    components: {
      ItemEditForm
    },
    methods: {
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  title: model.project_title,
                  description: model.project_description
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
  <ItemEditForm
    title = "Create project"
    :model = "{
      project_title: '',
      project_description: ''
    }"
    :fields = "[
      {
        type: 'text',
        name: 'project-title',
        placeholder: 'Project title',
        model: 'project_title'
      },
      {
        type: 'textarea',
        name: 'project-description',
        placeholder: 'Project description',
        model: 'project_description'
      }
    ]"
    :breadcrumbs = "[
        {
            title: 'Projects',
            to: 'projects'
        },
        {
            title: 'Create a project'
        }
    ]"
    @save-event="saveItem"
  />
</template>