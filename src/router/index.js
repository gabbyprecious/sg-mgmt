import Vue from "vue";
import VueRouter from "vue-router";
import GeneralHome from '../components/Home.vue'
import PatientHome from '../components/PatientView/PatientHome.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: GeneralHome },
    { path: '/patient-home', component: PatientHome },
]


const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  })

export default router;