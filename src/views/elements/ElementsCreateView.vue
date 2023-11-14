<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        scraper: {},
        project: {},
        scraper_loaded: false,
        project_loaded: false,
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
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.$route.params.scraper_id+'/', {
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
        saveItem(model) {
          fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/elements/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  scraper: this.$route.params.scraper_id,
                  title: model.element_title,
                  xpath: model.element_xpath,
                  regex_sub_pattern: model.element_regex_sub_pattern,
                  regex_sub_repl: model.element_regex_sub_repl,
                  regex_search: model.element_regex_search,
                  concat_result: model.element_concat_result
              })
          })
          .then(resp => {
              if(resp.status == 201) {
                this.$router.push({
                  path: '/elements/'+this.scraper.id
                })
                .then(() => {
                  toast('Element "'+ this.element_title +'" has been successfully created.', {
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
  <ItemEditForm v-if="this.project_loaded && this.scraper_loaded"
    title = "Create element"
    :model = "{
      element_title: '',
      element_xpath: '',
      element_regex_sub: '',
      element_regex_search: '',
      element_concat_result: ''
    }"
    :fields = "[
      {
        type: 'text',
        name: 'element-title',
        placeholder: 'Element title',
        model: 'element_title'
      },
      {
        type: 'text',
        name: 'element-xpath',
        placeholder: 'Element Xpath',
        model: 'element_xpath'
      },
      {
        type: 'text',
        name: 'element-regex-sub-pattern',
        placeholder: 'Regex Sub Pattern',
        model: 'element_regex_sub_pattern'
      },
      {
        type: 'text',
        name: 'element-regex-sub-repl',
        placeholder: 'Regex Sub Replacement',
        model: 'element_regex_sub_repl'
      },
      {
        type: 'text',
        name: 'element-regex-search',
        placeholder: 'Regex Search',
        model: 'element_regex_search'
      },
      {
        type: 'text',
        name: 'element-concat-result',
        placeholder: 'Concatenate results',
        model: 'element_concat_result'
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
            value: this.scraper.project
            }
        },
        {
            title: this.scraper.title,
            to: 'elements',
            params: {
              key: 'scraper_id',
              value: this.$route.params.scraper_id
            }
        },
        {
            title: 'Create element'
        }
    ]"
    @save-event="saveItem"
  />
</template>
