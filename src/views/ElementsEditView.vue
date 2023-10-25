<script>
import { toast } from 'vue3-toastify'
import ItemEditForm from '../components/ui/ItemEditForm.vue';
export default {
    data() {
      return {
        scraper: {},
        element: {},
        scraper_loaded: false,
        element_loaded: false
      }
    },
    components: {
      ItemEditForm
    },
    methods: {
          getScraper() {
              fetch('http://127.0.0.1:8000/api/scrapers/'+this.element.scraper+'/', {
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
              })
              .catch(error => console.log(error))
          },
          getElement() {
              fetch('http://127.0.0.1:8000/api/elements/'+this.$route.params.id+'/', {
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
          fetch(`http://127.0.0.1:8000/api/elements/`+this.$route.params.id+'/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
              },
              body: JSON.stringify({
                  title: model.title,
                  xpath: model.xpath,
                  regex_sub: model.regex_sub,
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
  <ItemEditForm v-if="scraper_loaded && element_loaded"
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
        name: 'element-regex-sub',
        placeholder: 'Regex Sub',
        model: 'regex_sub'
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
            title: this.scraper.title,
            to: 'scrapers_edit',
            params: {
                key: 'id',
                value: this.scraper.id
            }
        },
        {
            title: 'Elements',
            to: 'elements',
            params: {
                key: 'scraper_id',
                value: this.scraper.id
            }
        },
        {
            title: 'Edit the element'
        }
    ]"
    @save-event="saveItem"
  />
</template>
