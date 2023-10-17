<script>
import { toast } from 'vue3-toastify'
export default {
    data() {
      return {
        project: {},
        scraper: {}
      }
    },
    methods: {
          getProject() {
              fetch('http://127.0.0.1:8000/api/projects/'+this.scraper.project+'/', {
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
          getScraper() {
              fetch('http://127.0.0.1:8000/api/scrapers/'+this.$route.params.id+'/', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
                  }
              })
              .then(resp => resp.json())
              .then(resp => {
                  this.scraper = resp
                  this.getProject()
              })
              .catch(error => console.log(error))
        },
        saveScraper() {
          fetch(`http://127.0.0.1:8000/api/scrapers/`+this.scraper.id+'/', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token 15e5a110fd84cc4e736100b5a5ca1e5898cfcd62'
              },
              body: JSON.stringify({
                  title: this.scraper.title,
                  description: this.scraper.description,
                  headers: this.scraper.headers
              })
          })
          .then(resp => {
              if(resp.status == 200) {
                this.$router.push({
                  path: '/scrapers/'+this.scraper.project
                })
                .then(() => {
                  toast('Scraper "'+ this.scraper.title +'" has been successfully changed.', {
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
        <div class="content-header row">
          <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
            <h3 class="content-header-title mb-0 d-inline-block">{{ this.scraper.title }}</h3>
            <div class="row breadcrumbs-top d-inline-block">
              <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item" v-if="project.id">
                    <RouterLink :to="{name: 'projects_edit', params: {id: this.project.id }}">{{ this.project.title }}</RouterLink>
                  </li>
                  <li class="breadcrumb-item" v-if="project.id">
                    <RouterLink :to="{name: 'scrapers', params: {project_id: this.project.id }}">Scrapers</RouterLink>
                  </li>
                  <li class="breadcrumb-item active">Edit the scraper
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
                                                      <input v-model="scraper.title" type="text" class="form-control" id="scraper-title" placeholder="Scraper title" required="">
                                                      <label for="scraper-title">Scraper title</label>
                                                  </fieldset>
                                                  <fieldset class="form-label-group">
                                                      <textarea v-model="scraper.description" class="form-control" id="scraper-description" placeholder="Project description" rows="5"></textarea>
                                                      <label for="scraper-description">Scraper description</label>
                                                  </fieldset>
                                                  <fieldset class="form-label-group">
                                                      <textarea v-model="scraper.headers" class="form-control" id="scraper-headers" placeholder="Headers" rows="5"></textarea>
                                                      <label for="scraper-headers">Headers</label>
                                                  </fieldset>
                                              </div>
                                              <div class="col-12 text-right">
                                                  <button @click="saveScraper()" type="button" class="btn-gradient-primary my-1">Save</button>
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
