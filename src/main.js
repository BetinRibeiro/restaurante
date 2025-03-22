import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importando o Vue Router

// Importando o SCSS e o Bootstrap de forma adequada
import './assets/styles.scss'; // Arquivo SCSS local
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos do Bootstrap
import 'bootstrap'; // Bootstrap JS (isso já inclui o Popper)

// Criar a instância do Vue
createApp(App)
  .use(router) // Usando o Vue Router
  .mount('#app');
