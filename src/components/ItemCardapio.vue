<template>
    <div class="container-fluid pt-1 px-4">
      <div class="bg-light rounded p-4">
        <h1>Cardápio</h1>
        <div class="row">
          <div class="col-md-3" id="noprint">
            <div class="card">
              <div class="card-header">
                <h2>{{ itemEditando ? "Editar Item" : "Adicionar Item" }}</h2>
              </div>
              <div class="card-body">
                <form
                  @submit.prevent="
                    itemEditando ? atualizarItemCardapio() : adicionarItem()
                  "
                >
                  <div>
                    <label class="form-label mt-4">Nome Item</label>
                    <input
                      class="form-control"
                      v-model="nome"
                      placeholder="Nome do Item"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Descrição</label>
                    <input
                      class="form-control"
                      v-model="descricao"
                      placeholder="Descrição do Item"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Preço Venda</label>
                    <input
                      class="form-control"
                      v-model="preco"
                      type="number"
                      step="0.01"
                      placeholder="Preço"
                      required
                    />
                  </div>
                  <button
                    class="form-control mt-4 text-light bg-success"
                    type="submit"
                  >
                    {{ itemEditando ? "Atualizar Item" : "Adicionar Item" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card">
              <div class="card-header text-right">
                <h2 text-right>Itens do Cardápio</h2>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    class="table text-start align-middle table-bordered table-hover mb-0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Preço</th>
                        <th scope="col" class="text-right"  id="noprint">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in itens" :key="item.chave">
                        <td>{{ item.nome }}</td>
                        <td>{{ item.descricao }}</td>
                        <td>{{ formatarPreco(item.preco) }}</td>
                        <td class="text-right"  id="noprint">
                          <button
                            v-if="!itemRelacionadoMesa(item.chave)"
                            class="btn btn-warning btn-sm"
                            @click="editarItem(item)"
                          >
                            Editar
                          </button>
                          <button
                            v-if="!itemRelacionadoMesa(item.chave)"
                            class="btn btn-danger btn-sm"
                            @click="excluirItem(item.chave)"
                          >
                            Excluir
                          </button>
  
                          <button
                            v-if="itemRelacionadoMesa(item.chave)"
                            class="btn btn-info btn-sm disabled"
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        nome: "",
        descricao: "",
        preco: "",
        itens: [],
        itemEditando: null,
        itensMesa: [],  // Aqui armazenaremos os itens de mesa
      };
    },
    methods: {
      gerarChavePrimaria() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      },
      adicionarItem() {
        if (this.nome && this.descricao && this.preco) {
          const novoItem = {
            chave: this.gerarChavePrimaria(),
            nome: this.nome,
            descricao: this.descricao,
            preco: parseFloat(this.preco),
          };
          this.salvarItemCardapio(novoItem);
          this.nome = "";
          this.descricao = "";
          this.preco = "";
          this.carregarItens();
        }
      },
      editarItem(item) {
        this.nome = item.nome;
        this.descricao = item.descricao;
        this.preco = item.preco;
        this.itemEditando = item.chave;
      },
      salvarItemCardapio(item) {
        let itens = JSON.parse(localStorage.getItem("itemCardapio")) || [];
        itens.push(item);
        localStorage.setItem("itemCardapio", JSON.stringify(itens));
      },
      atualizarItemCardapio() {
        if (this.itemEditando) {
          const itemAtualizado = {
            chave: this.itemEditando,
            nome: this.nome,
            descricao: this.descricao,
            preco: parseFloat(this.preco),
          };
  
          let itens = JSON.parse(localStorage.getItem("itemCardapio")) || [];
          itens = itens.map((item) =>
            item.chave === this.itemEditando ? itemAtualizado : item
          );
          localStorage.setItem("itemCardapio", JSON.stringify(itens));
  
          this.itemEditando = null;
          this.nome = "";
          this.descricao = "";
          this.preco = "";
          this.carregarItens();
        }
      },
      excluirItem(chave) {
        let itens = JSON.parse(localStorage.getItem("itemCardapio")) || [];
        itens = itens.filter((item) => item.chave !== chave);
        localStorage.setItem("itemCardapio", JSON.stringify(itens));
        this.carregarItens();
      },
      carregarItens() {
        this.itens = this.consultarItemCardapio();
        this.itensMesa = this.consultarItensMesa(); // Carregar itens de mesa
      },
      consultarItemCardapio() {
        return JSON.parse(localStorage.getItem("itemCardapio")) || [];
      },
      consultarItensMesa() {
        return JSON.parse(localStorage.getItem("itensMesa")) || []; // Aqui você deve recuperar os itens da mesa
      },
      formatarPreco(preco) {
        return preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
      // Verifica se o item está relacionado a algum item de mesa
      itemRelacionadoMesa(chave) {
        return this.itensMesa.some(item => item.itemChave === chave); // Ajuste a propriedade "itemChave" conforme sua estrutura
      },
    },
    mounted() {
      this.carregarItens();
    },
  };
  </script>