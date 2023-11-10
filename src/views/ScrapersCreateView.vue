<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        project: {}
      }
    },
    components: {
      ItemEditForm
    },
    methods: {
        getProject() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+this.$route.params.project_id+'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.project = resp
            })
            .catch(error => console.log(error))
        },
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  project: this.$route.params.project_id,
                  title: model.scraper_title,
                  description: model.scraper_description,
                  headers: model.scraper_headers
              })
          })
          .then(resp => {
              if(resp.status == 201) {
                this.$router.push({
                  path: '/scrapers/'+this.project.id
                })
                .then(() => {
                  toast('Scraper "'+ this.scraper_title +'" has been successfully created.', {
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
  <ItemEditForm
    title = "Create scraper"
    :model = "{
      scraper_title: '',
      scraper_description: '',
      scraper_headers: ''
    }"
    :fields = "[
      {
        type: 'text',
        name: 'scraper-title',
        placeholder: 'Scraper title',
        model: 'scraper_title'
      },
      {
        type: 'textarea',
        name: 'scraper-description',
        placeholder: 'Scraper description',
        model: 'scraper_description'
      },
      {
        type: 'textarea',
        name: 'scraper-headers',
        placeholder: 'Headers',
        model: 'scraper_headers'
      }
    ]"
    :breadcrumbs = "[
        {
            title: this.project.title,
            to: 'projects_edit',
            params: {
              key: 'id',
              value: this.$route.params.project_id
            }
        },
        {
            title: 'Scrapers',
            to: 'scrapers',
            params: {
              key: 'project_id',
              value: this.$route.params.project_id
            }
        },
        {
            title: 'Create a scraper'
        }
    ]"
    @save-event="saveItem"
  />
</template>
