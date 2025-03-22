import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ItemCardapio from './components/ItemCardapio.vue';
import MesaAtendimento from './components/MesaAtendimento.vue';
import ItemMesa from './components/ItemMesa.vue';
import DespesaEmpresa from './components/DespesaEmpresa.vue';
import DadosLocal from './components/DadosLocal.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/cardapio',
    name: 'cardapio',
    component: ItemCardapio,
  },
  {
    path: '/mesa',
    name: 'mesa',
    component: MesaAtendimento,
  },
  {
    path: '/pedido',
    name: 'pedido',
    component: ItemMesa,
  },
  {
    path: '/despesa',
    name: 'despesas',
    component: DespesaEmpresa,
  },
  {
    path: '/dados',
    name: 'dados',
    component: DadosLocal,
  },
//   {
//     path: '/sobre',
//     name: 'sobre',
//     component: () => import('./views/Sobre.vue'), // Supondo que você tenha esse componente
//   },
//   {
//     path: '/contato',
//     name: 'contato',
//     component: () => import('./views/Contato.vue'), // Supondo que você tenha esse componente
//   },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
