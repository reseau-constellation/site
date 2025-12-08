import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import PagePrincipale from '@/components/PagePrincipale.vue';
import PageTéléchargements from '@/components/PageTéléchargements.vue';
import { மொழிகளைப்_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: PagePrincipale,
  },
  {
    path: encodeURI('/téléchargements'),
    name: 'Téléchargements',
    component: PageTéléchargements,
  },
];

const routeur = createRouter({
  history: createWebHistory(),
  routes,
});

routeur.afterEach(to => {
  const { lg } = to.query;
  if (lg && typeof lg === 'string') {
    const { மொழிகளை_தேர்ந்தெடுக்கொள்ளு } = மொழிகளைப்_பயன்படுத்து();
    மொழிகளை_தேர்ந்தெடுக்கொள்ளு(lg);
  }
});

export default routeur;
