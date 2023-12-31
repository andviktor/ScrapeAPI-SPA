import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/dashboard/DashboardView.vue'

import AuthView from '../views/auth/AuthView.vue'

import ProjectsView from '../views/projects/ProjectsView.vue'
import ProjectsCreateView from '../views/projects/ProjectsCreateView.vue'
import ProjectsEditView from '../views/projects/ProjectsEditView.vue'

import ScrapersView from '../views/scrapers/ScrapersView.vue'
import ScrapersCreateView from '../views/scrapers/ScrapersCreateView.vue'
import ScrapersEditView from '../views/scrapers/ScrapersEditView.vue'
import ScrapersDataView from '../views/scrapers/ScrapersDataView.vue'

import ElementsView from '../views/elements/ElementsView.vue'
import ElementsCreateView from '../views/elements/ElementsCreateView.vue'
import ElementsEditView from '../views/elements/ElementsEditView.vue'

import FaqView from '../views/faq/FaqView.vue'

import PageNotFound from '../views/404/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/',
      name: 'dashboard',
      components: {
        default: DashboardView,
        auth: AuthView,
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/create',
      name: 'projects_create',
      component: ProjectsCreateView
    },
    {
      path: '/projects/edit/:id',
      name: 'projects_edit',
      component: ProjectsEditView
    },
    {
      path: '/scrapers/:project_id',
      name: 'scrapers',
      component: ScrapersView
    },
    {
      path: '/scrapers/:project_id/create',
      name: 'scrapers_create',
      component: ScrapersCreateView
    },
    {
      path: '/scrapers/edit/:id',
      name: 'scrapers_edit',
      component: ScrapersEditView
    },
    {
      path: '/scrapers/data/:id',
      name: 'scrapers_data',
      component: ScrapersDataView
    },
    {
      path: '/elements/:scraper_id',
      name: 'elements',
      component: ElementsView
    },
    {
      path: '/elements/:scraper_id/create',
      name: 'elements_create',
      component: ElementsCreateView
    },
    {
      path: '/elements/edit/:id',
      name: 'elements_edit',
      component: ElementsEditView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
  ]
})

export default router
