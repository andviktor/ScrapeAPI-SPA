<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        scraper: {}
      }
    },
    components: {
      ItemEditForm
    },
    methods: {
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
                  regex_sub: model.element_regex_sub,
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
  <ItemEditForm
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
        name: 'element-regex-sub',
        placeholder: 'Regex Sub',
        model: 'element_regex_sub'
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
            title: this.scraper.title,
            to: 'scrapers_edit',
            params: {
              key: 'id',
              value: this.$route.params.scraper_id
            }
        },
        {
            title: 'Elements',
            to: 'elements',
            params: {
              key: 'scraper_id',
              value: this.$route.params.scraper_id
            }
        },
        {
            title: 'Create an element'
        }
    ]"
    @save-event="saveItem"
  />
</template>
