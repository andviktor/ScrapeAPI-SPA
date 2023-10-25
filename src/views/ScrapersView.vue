<script>
import { toast } from 'vue3-toastify'
import ItemsList from '../components/ui/ItemsList.vue'
export default {
    name: "ScrapersList",
    components: {
        ItemsList
    },
    data() {
        return {
            project: {},
            scrapers: [],
            project_loaded: false,
            scrapers_loaded: false
        }
    },
    computed: {
        items_loaded: function() {
            return this.project_loaded && this.scrapers_loaded
        }
    },
    methods: {
        getProject() {
            fetch('http://127.0.0.1:8000/api/projects/'+this.$route.params.project_id+'/', {
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
        getScrapers() {
            fetch('http://127.0.0.1:8000/api/scrapers/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.scrapers = resp
                this.scrapers = this.scrapers.filter(scraper => scraper.project == this.$route.params.project_id);
                this.scrapers_loaded = true
            })
            .catch(error => console.log(error))
        },
        deleteItem(id) {
            fetch('http://127.0.0.1:8000/api/scrapers/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token ' + import.meta.env.VITE_APP_API_TOKEN
                }
            })
            .then(resp => {
              if(resp.status == 204) {
                  let scraper = this.scrapers.filter(scraper => scraper.id === id)
                  this.scrapers = this.scrapers.filter(scraper => scraper.id !== id)
                  toast('Scraper "'+scraper[0].title+'" has been successfully deleted.', {
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
        this.getProject()
        this.getScrapers()
    }
}
</script>

<template>
    <ItemsList v-if="items_loaded"
        item_title = "Scraper"
        items_title = "Scrapers"
        :items = scrapers
        :columns = "[
            {
                title: 'title',
                header: 'Title',
                header_class: 'col-md-3',
                class: 'col-md-3'
            },
            {
                title: 'description',
                header: 'Description',
                header_class: 'col-md-9',
                class: 'col-md-4 col-lg-5'
            }
        ]"
        action_buttons_class = "col-md-5 col-lg-4"
        :action_buttons = "[
            {
                title: 'Elements',
                to: 'elements',
                params: {
                    name: 'scraper_id',
                    key: 'id'
                },
                class: 'btn-outline-success'
            },
            {
                title: 'Edit',
                to: 'scrapers_edit',
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
                title: 'Projects',
                to: 'projects'
            },
            {
                title: this.project.title,
                to: 'projects_edit',
                params: {
                    key: 'id',
                    value: this.$route.params.project_id
                }
            },
            {
                title: 'Scrapers'
            }
        ]"
        :top_buttons = "[
            {
                title: 'Create a scraper',
                to: 'scrapers_create'
            }
        ]"
    />
</template>

<style scoped></style>