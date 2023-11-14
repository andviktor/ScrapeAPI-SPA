<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        project: {},
        scraper: {},
        project_loaded: false,
        scraper_loaded: false
      }
    },
    components: {
      ItemEditForm
    },
    methods: {
          getProject() {
              fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+this.scraper.project+'/', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
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
          getScraper() {
              fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.$route.params.id+'/', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                  }
              })
              .then(resp => resp.json())
              .then(resp => {
                  this.scraper = resp
                  this.scraper_loaded = true
                  this.getProject()
              })
              .catch(error => console.log(error))
        },
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.scraper.id+'/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  title: model.title,
                  description: model.description,
                  headers: model.headers,
                  source_urls: model.source_urls,
                  source_json_url_field: model.source_json_url_field
              })
          })
          .then(resp => {
              if(resp.status == 200) {
                this.$router.push({
                  path: '/scrapers/'+model.project
                })
                .then(() => {
                  toast('Scraper "'+ model.title +'" has been successfully changed.', {
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
      this.getScraper()
    }
}
</script>

<template>
  <ItemEditForm v-if="project_loaded && scraper_loaded"
    :title = scraper.title
    :model = scraper
    :fields = "[
      {
        type: 'text',
        name: 'scraper-title',
        placeholder: 'Scraper title',
        model: 'title'
      },
      {
        type: 'textarea',
        name: 'scraper-description',
        placeholder: 'Scraper description',
        model: 'description'
      },
      {
        type: 'textarea',
        name: 'scraper-headers',
        placeholder: 'Headers',
        model: 'headers'
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
              value: this.project.id
            }
        },
        {
            title: this.scraper.title
        }
    ]"
    @save-event="saveItem"
  />
</template>
