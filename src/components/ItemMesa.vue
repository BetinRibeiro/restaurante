<template>
    <div class="container-fluid pt-1 px-4">
      <div class="bg-light rounded p-4">
        <h1>Lista de Pedidos</h1>
        <div class="row">
          <!-- Formulário para adicionar ou editar item -->
          <div class="col-md-3" id="noprint">
            <div class="card mb-2">
              <div class="card-header text-light bg-success">
                <h2>{{ itemMesaEditando ? "Editar Pedido" : "Adicionar Pedido" }}</h2>
              </div>
              <div class="card-body">
                <form @submit.prevent="itemMesaEditando ? atualizarItemMesa() : adicionarItemMesa()">
                  <!-- Seleção da mesa -->
                  <div>
                    <label class="form-label mt-4">Mesa</label>
                    <select class="form-control" v-model="mesaSelecionada" required>
                      <option v-for="mesa in mesas" :key="mesa.chave" :value="mesa.chave">
                        {{ mesa.nome }}
                      </option>
                    </select>
                  </div>
                  <!-- Seleção do item do cardápio -->
                  <div>
                    <label class="form-label mt-4">Item do Cardápio</label>
                    <select class="form-control" v-model="itemCardapioSelecionado" required>
                      <option v-for="item in itensCardapio" :key="item.chave" :value="item.chave">
                        {{ item.nome }}
                      </option>
                    </select>
                  </div>
                  <!-- Preço do item -->
                  <div>
                    <label class="form-label mt-4">Preço</label>
                    <input
                      class="form-control"
                      v-model="precoItem"
                      type="number"
                      step="0.01"
                      placeholder="Preço do Item"
                      required
                    />
                  </div>
                  <!-- Status do item -->
                  <div>
                    <label class="form-label mt-4">Status</label>
                    <select class="form-control" v-model="statusItem" required>
                      <option value="Pedido">Pedido</option>
                      <option value="Em Preparo">Em Preparo</option>
                      <option value="Pronto">Pronto</option>
                      <option value="Servido">Servido</option>
                    </select>
                  </div>
                  <!-- Botão para adicionar ou atualizar -->
                  <button class="form-control mt-4 text-light bg-success" type="submit">
                    <i class='fa fa-plus-square fa-fw'></i> 
                    {{ itemMesaEditando ? "Atualizar Pedido" : "Adicionar Pedido" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <br>
          <!-- Tabela de itens da mesa -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header text-right">
                <h2 text-right>Pedidos das Mesas ({{ itensMesa.length }})</h2>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Mesa</th>
                        <th scope="col">Item</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
                        <th scope="col" class="text-right"  id="noprint">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="itemMesa in itensMesa.slice().reverse()" :key="itemMesa.chave" :class="getStatusClass(itemMesa.status)">
                        <td>{{ itemMesa.mesaNome }}</td>
                        <td>{{ itemMesa.itemNome }}</td>
                        <td>{{ formatarPreco(itemMesa.preco) }}</td>
                        <td>{{ itemMesa.status }}</td>
                        <td class="text-right"  id="noprint">
                          <button
                          v-if="itemMesa.status != 'Cancelado'"
                            class="btn btn-warning btn-sm" @click="editarItemMesa(itemMesa)">
                            <i class="fa fa-pencil-square fa-fw"></i>
                            Editar
                          </button>
                          <button
                          v-if="itemMesa.status == 'Cancelado'"
                           class="btn btn-info btn-sm" @click="editarItemMesa(itemMesa)">
                            <i class="fa fa-pencil-square fa-fw"></i>
                            Atualizar
                          </button>
                          <!-- Só exibe o botão de exclusão se o status não for "Servido" -->
                          <button
                            v-if="itemMesa.status !== 'Servido' & itemMesa.status !== 'Cancelado'"
                            class="btn btn-danger btn-sm"
                            @click="excluirItemMesa(itemMesa.chave)"
                          >
                          <i class="fa fa-trash fa-fw"></i>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- Exibir o valor total da mesa -->
                <div class="mt-4"  id="noprint">
                  <!-- <h3>Total: {{ formatarPreco(valorTotalMesa) }}</h3> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        mesaSelecionada: null,
        itemCardapioSelecionado: null,
        precoItem: 0,
        statusItem: "Pedido",
        mesas: [],
        itensCardapio: [],
        itensMesa: [],
        itemMesaEditando: null,
        valorTotalMesa: 0,
      };
    },
    methods: {
      gerarChavePrimaria() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      },
      carregarMesas() {
        this.mesas = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
      },
      carregarItensCardapio() {
        this.itensCardapio = JSON.parse(localStorage.getItem("itemCardapio")) || [];
      },
      carregarItensMesa() {
        this.itensMesa = JSON.parse(localStorage.getItem("itensMesa")) || [];
        this.calcularValorTotalMesa();
      },
      calcularValorTotalMesa() {
        const itensMesaDaMesaSelecionada = this.itensMesa.filter(item => item.mesaChave === this.mesaSelecionada);
        this.valorTotalMesa = itensMesaDaMesaSelecionada.reduce((total, itemMesa) => total + itemMesa.preco, 0);
        this.atualizarValorTotalMesaNoLocalStorage();
      },
      atualizarValorTotalMesaNoLocalStorage() {
        console.log("Entrou atualizarValorTotalMesaNoLocalStorage");
        
        let mesasAtendimento = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
        let mesaAtualizada = mesasAtendimento.find(mesa => mesa.chave === this.mesaSelecionada);
        if (mesaAtualizada) {
          console.log(this.valorTotalMesa);
          
          mesaAtualizada.valorTotal = this.valorTotalMesa;
          localStorage.setItem("mesasAtendimento", JSON.stringify(mesasAtendimento));
        }
      },
      adicionarItemMesa() {
        if (this.mesaSelecionada && this.itemCardapioSelecionado && this.precoItem) {
          const itemMesa = {
            chave: this.gerarChavePrimaria(),
            mesaChave: this.mesaSelecionada,
            itemChave: this.itemCardapioSelecionado,
            preco: parseFloat(this.precoItem),
            status: this.statusItem,
            mesaNome: this.mesas.find(mesa => mesa.chave === this.mesaSelecionada).nome,
            itemNome: this.itensCardapio.find(item => item.chave === this.itemCardapioSelecionado).nome,
          };
          this.salvarItemMesa(itemMesa);
          this.resetarCampos();
        }
      },
      editarItemMesa(itemMesa) {
        this.mesaSelecionada = itemMesa.mesaChave;
        this.itemCardapioSelecionado = itemMesa.itemChave;
        this.precoItem = itemMesa.preco;
        this.statusItem = itemMesa.status;
        this.itemMesaEditando = itemMesa.chave;
      },
      salvarItemMesa(itemMesa) {
        let itensMesa = JSON.parse(localStorage.getItem("itensMesa")) || [];
        itensMesa.push(itemMesa);
        localStorage.setItem("itensMesa", JSON.stringify(itensMesa));
        this.carregarItensMesa();
      },
      atualizarItemMesa() {
        if (this.itemMesaEditando) {
          const itemMesaAtualizado = {
            chave: this.itemMesaEditando,
            mesaChave: this.mesaSelecionada,
            itemChave: this.itemCardapioSelecionado,
            preco: parseFloat(this.precoItem),
            status: this.statusItem,
            mesaNome: this.mesas.find(mesa => mesa.chave === this.mesaSelecionada).nome,
            itemNome: this.itensCardapio.find(item => item.chave === this.itemCardapioSelecionado).nome,
          };
  
          let itensMesa = JSON.parse(localStorage.getItem("itensMesa")) || [];
          itensMesa = itensMesa.map(item =>
            item.chave === this.itemMesaEditando ? itemMesaAtualizado : item
          );
          localStorage.setItem("itensMesa", JSON.stringify(itensMesa));
          this.carregarItensMesa();
          this.resetarCampos();
        }
      },
      excluirItemMesa(chave) {
    console.log("Entrou excluirItemMesa");
  
    // Carregar itens da mesa
    let itensMesa = JSON.parse(localStorage.getItem("itensMesa")) || [];
  
    // Encontrar o item que será "excluído"
    let itemMesa = itensMesa.find(item => item.chave === chave);
    if (itemMesa) {
      // Atualizar o status e o preço
      itemMesa.status = "Cancelado";
      itemMesa.preco = 0;
  
      // Atualizar a lista de itens no localStorage
      itensMesa = itensMesa.map(item => 
        item.chave === chave ? itemMesa : item
      );
      localStorage.setItem("itensMesa", JSON.stringify(itensMesa));
  
      // Recarregar os itens da mesa
      this.carregarItensMesa();
  
      // Atualizar o valor total da mesa após a modificação
      this.calcularValorTotalMesa();
    }
  }
  
  ,
      formatarPreco(preco) {
        return preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
      resetarCampos() {
        this.mesaSelecionada = null;
        this.itemCardapioSelecionado = null;
        this.precoItem = 0;
        this.statusItem = "Pedido";
        this.itemMesaEditando = null;
      },
      getStatusClass(status) {
        switch (status) {
          case "Pedido":
            return "text-danger";
          case "Em Preparo":
            return "table-info";
          case "Pronto":
            return "table-success";
          case "Servido":
            return "text-success";
          default:
            return "";
        }
      },
    },
    watch: {
      mesaSelecionada() {
        this.calcularValorTotalMesa();
      },
      itemCardapioSelecionado(newItemChave) {
        const itemCardapio = this.itensCardapio.find(item => item.chave === newItemChave);
        if (itemCardapio) {
          this.precoItem = itemCardapio.preco;
        }
      },
    },
    mounted() {
      this.carregarMesas();
      this.carregarItensCardapio();
      this.carregarItensMesa();
    },
  };
  </script>
  
  <style scoped>
  /* Estilo customizado (se necessário) */
  .navbar {
    background-color: #343a40; /* Cor escura */
  }
  </style>
  