import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectsCreateView from '../views/ProjectsCreateView.vue'
import ProjectsEditView from '../views/ProjectsEditView.vue'
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
      path: '/faq',
      name: 'faq',
      component: FaqView
    }
  ]
})

export default router
