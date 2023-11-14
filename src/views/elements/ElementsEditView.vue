<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        project: {},
        scraper: {},
        element: {},
        project_loaded: false,
        scraper_loaded: false,
        element_loaded: false,
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
              fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.element.scraper+'/', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
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
          getElement() {
              fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/elements/'+this.$route.params.id+'/', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN 
                  }
              })
              .then(resp => resp.json())
              .then(resp => {
                  this.element = resp
                  this.element_loaded = true
                  this.getScraper()
              })
              .catch(error => console.log(error))
        },
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/elements/'+this.$route.params.id+'/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  title: model.title,
                  xpath: model.xpath,
                  regex_sub_pattern: model.regex_sub_pattern,
                  regex_sub_repl: model.regex_sub_repl,
                  regex_search: model.regex_search,
                  concat_result: model.concat_result
              })
          })
          .then(resp => {
              if(resp.status == 200) {
                this.$router.push({
                  path: '/elements/'+model.scraper
                })
                .then(() => {
                  toast('Element "'+ model.title +'" has been successfully changed.', {
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
      this.getElement()
    }
}
</script>

<template>
  <ItemEditForm v-if="this.project_loaded && this.scraper_loaded && this.element_loaded"
    :title = element.title
    :model = element
    :fields = "[
      {
        type: 'text',
        name: 'element-title',
        placeholder: 'Element title',
        model: 'title'
      },
      {
        type: 'text',
        name: 'element-xpath',
        placeholder: 'Element Xpath',
        model: 'xpath'
      },
      {
        type: 'text',
        name: 'element-regex-sub-pattern',
        placeholder: 'Regex Sub Pattern',
        model: 'regex_sub_pattern'
      },
      {
        type: 'text',
        name: 'element-regex-sub-repl',
        placeholder: 'Regex Sub Replacement',
        model: 'regex_sub_repl'
      },
      {
        type: 'text',
        name: 'element-regex-search',
        placeholder: 'Regex Search',
        model: 'regex_search'
      },
      {
        type: 'text',
        name: 'element-concat-result',
        placeholder: 'Concatenate results',
        model: 'concat_result'
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
            title: this.project.title,
            to: 'scrapers',
            params: {
            key: 'project_id',
            value: this.project.id
            }
        },
        {
            title: this.scraper.title,
            to: 'elements',
            params: {
              key: 'scraper_id',
              value: this.scraper.id
            }
        },
        {
            title: this.element.title
        }
    ]"
    @save-event="saveItem"
  />
</template>
