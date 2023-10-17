<script>
import { toast } from 'vue3-toastify'
export default {
    data() {
      return {
        project: {},
        scraper_title: '',
        scraper_description: '',
        scraper_headers: ''
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
        createScraper() {
          fetch(`http://127.0.0.1:8000/api/scrapers/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
              },
              body: JSON.stringify({
                  project: this.$route.params.project_id,
                  title: this.scraper_title,
                  description: this.scraper_description,
                  headers: this.scraper_headers
              })
          })
          .then(resp => {
              if(resp.status == 201) {
                this.$router.push({
                  path: '/scrapers/'+this.project.id
                })
                .then(() => {
                  toast('Scraper "'+ this.scraper_title +'" has been successfully created.', {
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
        this.getProject()
    }
}
</script>

<template>
        <div class="content-header row">
          <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">Create scraper</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'projects_edit', params: {id: this.$route.params.project_id}}">{{ this.project.title }}</RouterLink>
                  </li>
                  <li class="breadcrumb-item">
                    <RouterLink :to="{name: 'scrapers', params: {project_id: this.$route.params.project_id}}">Scrapers</RouterLink>
                  </li>
                  <li class="breadcrumb-item active">Create a scraper
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="content-body">
          <div class="row">
              <div class="col-12">
                  <section class="card">
                      <div class="card-content">
                          <div class="card-body">
                              <div class="col-12">
                                  <div class="row">
                                      <div class="col-12">
                                          <form class="form-horizontal row mt-2">
                                              <div class="col-12">
                                                  <fieldset class="form-label-group">
                                                      <input v-model="scraper_title" type="text" class="form-control" id="scraper-title" placeholder="Scraper title" required="">
                                                      <label for="scraper-title">Scraper title</label>
                                                  </fieldset>
                                                  <fieldset class="form-label-group">
                                                      <textarea v-model="scraper_description" class="form-control" id="scraper-description" placeholder="Project description" rows="5"></textarea>
                                                      <label for="scraper-description">Scraper description</label>
                                                  </fieldset>
                                                  <fieldset class="form-label-group">
                                                      <textarea v-model="scraper_headers" class="form-control" id="scraper-headers" placeholder="Headers" rows="5"></textarea>
                                                      <label for="scraper-headers">Headers</label>
                                                  </fieldset>
                                              </div>
                                              <div class="col-12 text-right">
                                                  <button @click="createScraper()" type="button" class="btn-gradient-primary my-1">Save</button>
                                              </div>
                                          </form>
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
