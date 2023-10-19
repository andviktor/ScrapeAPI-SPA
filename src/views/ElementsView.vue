<script>
import { toast } from 'vue3-toastify'
import ItemsList from '../components/ui/ItemsList.vue'
export default {
    name: "ElementsList",
    components: {
        ItemsList
    },
    data() {
        return {
            scraper: {},
            elements: [],
            scraper_loaded: false,
            elements_loaded: false
        }
    },
    computed: {
        items_loaded: function() {
            return this.scraper_loaded && this.elements_loaded
        }
    },
    methods: {
        getScraper() {
            fetch('http://127.0.0.1:8000/api/scrapers/'+this.$route.params.scraper_id+'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.scraper = resp
                this.scraper_loaded = true
            })
            .catch(error => console.log(error))
        },
        getElements() {
            fetch('http://127.0.0.1:8000/api/elements/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
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
            fetch('http://127.0.0.1:8000/api/elements/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
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
        this.getElements()
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
                title: 'Scrapers',
                to: 'scrapers',
                params: {
                    key: 'project_id',
                    value: scraper.project
                }
            },
            {
                title: scraper.title,
                to: 'scrapers_edit',
                params: {
                    key: 'id',
                    value: scraper.id
                }
            },
            {
                title: 'Elements'
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