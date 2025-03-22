<template>
  <div id="app">
    <!-- Menu de Navegação -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Meu Restaurante</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- Navegação para a Home -->
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <!-- Navegação para o Cardápio -->
            <li class="nav-item">
              <router-link to="/cardapio" class="nav-link">Cardápio</router-link>
            </li>
            <!-- Navegação para o Sobre -->
            <li class="nav-item">
              <router-link to="/mesa" class="nav-link">Mesas</router-link>
            </li>
            <!-- Navegação para o Contato -->
            <li class="nav-item">
              <router-link to="/pedido" class="nav-link">Pedidos</router-link>
            </li>
            <!-- Navegação para o Contato -->
            <li class="nav-item">
              <router-link to="/despesa" class="nav-link">Despesas</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Renderiza a página ativa conforme a rota -->
    <router-view />
  </div>
</template>

<script>
// Não é necessário importar HomePage, pois a navegação é feita com Vue Router
export default {
  name: 'App',
};
</script>

<style>
/* Estilo customizado (se necessário) */
.navbar {
  background-color: #343a40; /* Cor escura */
}
</style>
