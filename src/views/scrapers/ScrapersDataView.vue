<script>
import { toast } from 'vue3-toastify'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import BreadCrumbs from '../../components/ui/BreadCrumbs.vue'

export default {
    data() {
      return {
        scraper: {},
        project: {},
        scraper_loaded: false,
        project_loaded: false,
        breadcrumbs: [],
        running: false,
        json_url: import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.$route.params.id+'/json/',
        auth_token: $cookies.get("apitoken"),
      }
    },
    components: {
      VueJsonPretty, BreadCrumbs
    },
    methods: {
        getScraper() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.$route.params.id+'/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + $cookies.get("apitoken")
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
        getProject() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/projects/'+this.scraper.project+'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + $cookies.get("apitoken")
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.project = resp
                this.project_loaded = true
                this.setBreadcrumbs()
            })
            .catch(error => console.log(error))
        },
        setBreadcrumbs() {
            this.breadcrumbs = [
              {
                  title: 'Dashboard',
                  to: 'dashboard'
              },
              {
                  title: 'Projects',
                  to: 'projects'
              },
              {
                  title: 'Scrapers',
                  to: 'scrapers',
                  params: {
                    key: 'project_id',
                    value: this.project.id
                  }
              },
              {
                  title: this.scraper.title
              }
          ]
        },
        runScraper() {
          if(this.running) {
            toast('Scraping already started.', {
                type: 'warning'
            })
          }
          else {
            this.running = true
            toast('Scraping started.', {
                type: 'info'
            })
            fetch(import.meta.env.VITE_APP_API_URL+'/api/v1/scrapers/'+this.$route.params.id+'/run/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + $cookies.get("apitoken")
                }
            })
            .then(resp => {
                if(resp.status == 200) {
                  this.running = false
                    toast('Scraping completed.', {
                        type: 'success'
                    })
                    this.getScraper()
                }
                else{
                  this.running = false
                  toast("Error code: "+resp.status, {
                    type: 'error'
                  });
                }
                
            })
            .catch(error => console.log(error))
          }
        }
    },
    created() {
      this.getScraper()
    }
}
</script>

<template>
  <div v-if="project_loaded && scraper_loaded">
    <div class="content-header row">
        <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
        <h3 class="content-header-title mb-0 d-inline-block">{{ this.scraper.title }}</h3>
        <div class="row breadcrumbs-top d-inline-block">
            <div class="breadcrumb-wrapper col-12">
                <BreadCrumbs :links="this.breadcrumbs" />
            </div>
        </div>
        </div>
        <div class="content-header-right col-md-4 col-12 d-none d-md-inline-block">
        <div class="btn-group float-md-right">
            <button class="btn-gradient-secondary btn-sm white" @click="this.runScraper()">Scrape data</button>
        </div>
        </div>
    </div>
    <section class="card">
      <div class="card-content">
        <div class="card-body">
          <div class="mb-2">
            <i class="icon-link"></i> <a :href="this.json_url" target="_blank">{{ this.json_url }}</a>
            <div class="mt-1">
              <ul>
                <li><b>Method:</b> GET</li>
                <li><b>Headers:</b><br />Authorization: Token {{ this.auth_token }}</li>
              </ul>
            </div>
            <hr />
          </div>
          <span v-if="this.running">Pending...</span>
          <vue-json-pretty 
            v-else-if="this.scraper.output_json"
            :data=this.scraper.output_json
            :deep="1"
            :show-icon="true"
          />
          <span v-else>No data available.</span>
        </div>
      </div>
    </section>
  </div>
</template>
