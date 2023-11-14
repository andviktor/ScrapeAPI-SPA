import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'

import ProjectsView from '../views/ProjectsView.vue'
import ProjectsCreateView from '../views/ProjectsCreateView.vue'
import ProjectsEditView from '../views/ProjectsEditView.vue'

import ScrapersView from '../views/ScrapersView.vue'
import ScrapersCreateView from '../views/ScrapersCreateView.vue'
import ScrapersEditView from '../views/ScrapersEditView.vue'
import ScrapersDataView from '../views/ScrapersDataView.vue'

import ElementsView from '../views/ElementsView.vue'
import ElementsCreateView from '../views/ElementsCreateView.vue'
import ElementsEditView from '../views/ElementsEditView.vue'

import FaqView from '../views/FaqView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
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
    }
  ]
})

export default router
