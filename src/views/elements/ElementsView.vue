<script>
import { toast } from 'vue3-toastify'
import ItemsList from '../../components/ui/ItemsList.vue'
export default {
    name: "ElementsList",
    components: {
        ItemsList
    },
    data() {
        return {
            project: {},
            scraper: {},
            elements: [],
            project_loaded: false,
            scraper_loaded: false,
            elements_loaded: false,
        }
    },
    computed: {
        items_loaded: function() {
            return this.project_loaded && this.scraper_loaded && this.elements_loaded
        }
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
                this.getElements()
            })
            .catch(error => console.log(error))
        },
        getElements() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/elements/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.elements = resp
                this.elements = this.elements.filter(element => element.scraper == this.$route.params.scraper_id);
                this.elements_loaded = true
            })
            .catch(error => console.log(error))
        },
        deleteItem(id) {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/elements/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => {
              if(resp.status == 204) {
                  let element = this.elements.filter(element => element.id === id)
                  this.elements = this.elements.filter(element => element.id !== id)
                  toast('Element "'+element[0].title+'" has been successfully deleted.', {
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
        this.getScraper()        
    }
}
</script>

<template>
    <ItemsList v-if="items_loaded"
        item_title = "Element"
        items_title = "Elements"
        :items = elements
        :columns = "[
            {
                title: 'title',
                header: 'Title',
                header_class: 'col-md-3',
                class: 'col-md-3'
            },
            {
                title: 'xpath',
                header: 'XPath',
                header_class: 'col-md-9',
                class: 'col-md-4 col-lg-5'
            }
        ]"
        action_buttons_class = "col-md-5 col-lg-4"
        :action_buttons = "[
            {
                title: 'Edit',
                to: 'elements_edit',
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
                title: scraper.title
            }
        ]"
        :top_buttons = "[
            {
                title: 'Create an element',
                to: 'elements_create'
            }
        ]"
    />
</template>

<style scoped></style>