<template>
    <div class="container-fluid pt-1 px-4">
      <div class="bg-light rounded p-4">
        <h1>Lista de Mesas</h1>
        <div class="row">
          <div class="col-md-3" id="noprint">
            <div class="card">
              <div class="card-header bg-info">
                <h2>{{ mesaEditando ? "Editar Mesa" : "Adicionar Mesa" }}</h2>
              </div>
              <div class="card-body">
                <form
                  @submit.prevent="
                    mesaEditando ? atualizarMesa() : adicionarMesa()
                  "
                >
                  <div>
                    <label class="form-label mt-4">Nome da Mesa</label>
                    <input
                      class="form-control"
                      v-model="nome"
                      placeholder="Nome da Mesa"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Valor Total</label>
                    <input
                      class="form-control"
                      v-model="valorTotal"
                      type="number"
                      step="0.01"
                      placeholder="Valor Total"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Status</label>
                    <select
                      class="form-control"
                      v-model="status"
                      required
                    >
                      <option value="Aberta">Aberta</option>
                      <option value="Fechada">Fechada</option>
                      <option value="Em Andamento">Em Andamento</option>
                    </select>
                  </div>
                  <button
                    class="form-control mt-4 text-dark bg-info"
                    type="submit"
                  >
                    {{ mesaEditando ? "Atualizar Mesa" : "Adicionar Mesa" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card">
              <div class="card-header text-right">
                <h2>Mesas Ativas</h2>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    class="table text-start align-middle table-bordered table-hover mb-0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Status</th>
                        <th scope="col" class="text-right" id="noprint">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="mesa in mesas" :key="mesa.chave" @click="abrirModal(mesa)">
                        <td>{{ mesa.nome }}</td>
                        <td>{{ formatarPreco(mesa.valorTotal) }}</td>
                        <td>{{ mesa.status }}</td>
                        <td class="text-right" id="noprint">
                          <button
                            class="btn btn-warning btn-sm"
                            @click="editarMesa(mesa)"
                          >
                            Editar
                          </button>
                          <button
                            class="btn btn-danger btn-sm"
                            v-if="!verificarMesaAssociada(mesa.chave)"
                            @click="excluirMesa(mesa.chave)"
                          >
                            Excluir
                          </button>
                          <button
                            class="btn btn-info btn-sm disabled"
                            v-if="verificarMesaAssociada(mesa.chave)"
                          >
                            Vinculado
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  <div class="modal fade" id="mesaModal" tabindex="-1" aria-labelledby="mesaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="mesaModalLabel">{{ modalMesa ? modalMesa.nome : "Detalhes da Mesa" }}</h5>
          <!-- Botão de Fechar com evento de fechamento -->
          <button type="button" class="btn-close" aria-label="Close" @click="fecharModal"></button>
        </div>
        <div class="modal-body">
          <p><strong>Nome:</strong> {{ modalMesa ? modalMesa.nome : "" }}</p>
          <p><strong>Valor Total:</strong> {{ modalMesa ? formatarPreco(modalMesa.valorTotal) : "" }}</p>
          <p><strong>Status:</strong> {{ modalMesa ? modalMesa.status : "" }}</p>
  
          <!-- Exibir itens da mesa -->
          <h6>Itens:</h6>
          <ul>
            <li v-for="item in itensMesa" :key="item.itemChave">
              {{ item.itemNome }} - {{ formatarPreco(item.preco) }} - Status: {{ item.status }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="fecharModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
  
  
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        nome: "",
        valorTotal: 0,
        status: "Aberta",
        mesas: [],
        mesaEditando: null,
        modalMesa: null,  // Adicionado para armazenar a mesa que será exibida no modal
        itensMesa: [] // Nova variável para armazenar os itens da mesa
      };
    },
    methods: {
      
      gerarChavePrimaria() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      },
      adicionarMesa() {
        if (this.nome && this.status) {
          const novaMesa = {
            chave: this.gerarChavePrimaria(),
            nome: this.nome,
            valorTotal: this.valorTotal,
            status: this.status,
          };
          this.salvarMesa(novaMesa);
          this.nome = "";
          this.valorTotal = 0;
          this.status = "Aberta";
          this.carregarMesas();
        }
      },
      editarMesa(mesa) {
        this.nome = mesa.nome;
        this.valorTotal = mesa.valorTotal;
        this.status = mesa.status;
        this.mesaEditando = mesa.chave;
      },
      salvarMesa(mesa) {
        let mesas = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
        mesas.push(mesa);
        localStorage.setItem("mesasAtendimento", JSON.stringify(mesas));
      },
      atualizarMesa() {
        if (this.mesaEditando) {
          const mesaAtualizada = {
            chave: this.mesaEditando,
            nome: this.nome,
            valorTotal: this.valorTotal,
            status: this.status,
          };
    
          let mesas = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
          mesas = mesas.map((mesa) =>
            mesa.chave === this.mesaEditando ? mesaAtualizada : mesa
          );
          localStorage.setItem("mesasAtendimento", JSON.stringify(mesas));
    
          this.mesaEditando = null;
          this.nome = "";
          this.valorTotal = 0;
          this.status = "Aberta";
          this.carregarMesas();
        }
      },
      excluirMesa(chave) {
        let mesas = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
        mesas = mesas.filter((mesa) => mesa.chave !== chave);
        localStorage.setItem("mesasAtendimento", JSON.stringify(mesas));
        this.carregarMesas();
      },
      carregarMesas() {
        this.mesas = this.consultarMesas();
      },
      consultarMesas() {
        return JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
      },
      formatarPreco(preco) {
        return preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
      verificarMesaAssociada(chaveMesa) {
        let itens = JSON.parse(localStorage.getItem("itensMesa")) || [];
        return itens.some(item => item.mesaChave === chaveMesa); // Assumindo que itensAtendimento tem campo 'mesaChave'
      },
      consultarItensMesa(mesaChave) {
        // Aqui você busca os itens da mesa, filtrando pela chave da mesa
        let itens = JSON.parse(localStorage.getItem("itensMesa")) || [];
        return itens.filter(item => item.mesaChave === mesaChave);
      },
      abrirModal(mesa) {
        this.modalMesa = mesa; // Atribui a mesa clicada à variável modalMesa
        this.itensMesa = this.consultarItensMesa(mesa.chave); // Preenche os itens da mesa
  
        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById("mesaModal"));
        modal.show();
      },
    },
    mounted() {
      this.carregarMesas();
    },
  };
  </script>
  
  
  
<style lang="scss">
@import '@/assets/styles.scss'; /* Importa o arquivo de estilo global */

// Estilos específicos do componente
.navbar {
  background-color: #343a40;
}
</style>