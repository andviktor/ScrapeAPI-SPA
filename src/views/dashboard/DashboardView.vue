<script>
import { toast } from 'vue3-toastify'
import ItemsList from '../../components/ui/ItemsList.vue'
export default {
    name: "ScrapersList",
    components: {
        ItemsList
    },
    data() {
        return {
            projects: [],
            scrapers: [],
            projects_loaded: false,
            scrapers_loaded: false,
        }
    },
    methods: {
        getProjects() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + $cookies.get("apitoken")
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.projects = resp
                this.projects_loaded = true
                this.addProjectsInfoToScrapers()
            })
            .catch(error => console.log(error))
        },
        getScrapers() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + $cookies.get("apitoken")
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.scrapers = resp
                this.scrapers = this.scrapers.filter(scraper => scraper.in_favorites == true);
                this.scrapers_loaded = true
                this.getProjects()
            })
            .catch(error => console.log(error))
        },
        addProjectsInfoToScrapers() {
          let local_projects = this.projects
          this.scrapers.forEach(function(scraper, index) {
            scraper.project_title = local_projects.find(project => project.id === scraper.project).title
          })
        }
    },
    created() {
        this.getScrapers()
    }
}
</script>

<template>
    <ItemsList v-if="this.scrapers_loaded && this.projects_loaded"
        item_title = "Favorite scraper"
        items_title = "Favorite scrapers"
        :items = scrapers
        :columns = "[
            {
                title: 'title',
                header: 'Title',
                header_class: 'col-md-3',
                class: 'col-md-3'
            },
            {
                title: 'project_title',
                header: 'Project',
                header_class: 'col-md-9',
                class: 'col-md-4'
            }
        ]"
        action_buttons_class = "col-md-5 col-lg-4"
        :action_buttons = "[
            {
                title: 'Data',
                to: 'scrapers_data',
                params: {
                    name: 'id',
                    key: 'id'
                },
                class: 'btn-info'
            },
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
    />
</template>

<style scoped></style>