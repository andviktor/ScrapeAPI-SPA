<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../../components/ui/ItemEditForm.vue';
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
                    'Authorization': 'Token ' + $cookies.get("apitoken")
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
                  'Authorization': 'Token ' + $cookies.get("apitoken")
              },
              body: JSON.stringify({
                  project: this.$route.params.project_id,
                  title: model.scraper_title,
                  description: model.scraper_description,
                  headers: model.scraper_headers,
                  source_urls: model.source_urls,
                  source_json_url_field: model.source_json_url_field
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
      },
      {
        type: 'textarea',
        name: 'scraper-source-urls',
        placeholder: 'Source URL(-s)',
        model: 'source_urls'
      },
      {
        type: 'text',
        name: 'scraper-source-json-url-field',
        placeholder: 'Source JSON URL field',
        model: 'source_json_url_field'
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
            title: 'Scrapers',
            to: 'scrapers',
            params: {
              key: 'project_id',
              value: this.$route.params.project_id
            }
        },
        {
            title: 'Create scraper'
        }
    ]"
    @save-event="saveItem"
  />
</template>
