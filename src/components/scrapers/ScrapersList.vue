<script>
import { toast } from 'vue3-toastify'
import DeleteItemButton from '../ui/DeleteItemButton.vue'
export default {
    name: "ScrapersList",
    components: {
        DeleteItemButton
    },
    data() {
        return {
            project: {},
            scrapers: []
        }
    },
    methods: {
        getProject() {
            fetch('http://127.0.0.1:8000/api/projects/'+this.$route.params.project_id+'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.project = resp
            })
            .catch(error => console.log(error))
        },
        getScrapers() {
            fetch('http://127.0.0.1:8000/api/scrapers/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.scrapers = resp
                this.scrapers = this.scrapers.filter(scraper => scraper.project == this.$route.params.project_id);
            })
            .catch(error => console.log(error))
        },
        deleteScraper(id) {
            fetch('http://127.0.0.1:8000/api/scrapers/'+id+'/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
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
        <div class="content-header row">
          <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">Scrapers</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'projects'}">Projects</RouterLink>
                  </li>
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'projects_edit', params: {id: this.$route.params.project_id}}">{{ this.project.title }}</RouterLink>
                  </li>
                  <li class="breadcrumb-item active">Scrapers</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="content-header-right col-md-4 col-12 d-none d-md-inline-block">
            <div class="btn-group float-md-right">
                <RouterLink :to="{name: 'scrapers_create'}" class="btn-gradient-secondary btn-sm white">Create a scraper</RouterLink>
            </div>
          </div>
        </div>
        <div class="content-body">
            <div id="projects">
                <div class="projects-table-th d-none d-md-block">
                    <div class="col-12">
                        <div class="row px-1">
                            <div class="col-md-3 col-12 py-1">
                                <p class="mb-0">Title</p>
                            </div>
                            <div class="col-md-9 col-12 py-1">
                                <p class="mb-0">Description</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="projects-table-tbody">
                    <section 
                        v-for="scraper in scrapers" 
                        v-bind:key="scraper.id" 
                        class="card pull-up"
                    >
                        <div class="card-content">
                            <div class="card-body">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-md-3 col-12 py-1">
                                            <p class="mb-0"><span class="d-inline-block d-md-none text-bold-700 mr-1">Title:</span>{{ scraper.title }}</p>
                                        </div>
                                        <div class="col-md-4 col-lg-5 col-12 py-1">
                                            <p class="mb-0"><span class="d-inline-block d-md-none text-bold-700 mr-1">Description:</span>{{ scraper.description }}</p>
                                        </div>
                                        <div class="col-md-5 col-lg-4 col-12 py-1 text-md-right">
                                            <p class="mb-0">
                                                <RouterLink :to="{name: 'scrapers_edit', params: {id: scraper.id}}" class="mb-0 mr-1 btn-sm btn btn-outline-info round">Edit</RouterLink>
                                                <DeleteItemButton @delete-event="deleteScraper(scraper.id)" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
</template>

<style scoped></style>