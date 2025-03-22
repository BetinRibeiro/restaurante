<template>
    <div class="container-fluid pt-1 px-4">
      <div class="bg-light rounded p-4">
        <h1>Despesas da Empresa</h1>
        <div class="row">
          <div class="col-md-3" id="noprint">
            <div class="card">
              <div class="card-header  bg-danger">
                <h2>{{ itemEditando ? "Editar Despesa" : "Adicionar Despesa" }}</h2>
              </div>
              <div class="card-body">
                <form
                  @submit.prevent="
                    itemEditando ? atualizarDespesa() : adicionarDespesa()
                  "
                >
                  <div>
                    <label class="form-label mt-4">Nome Despesa</label>
                    <input
                      class="form-control"
                      v-model="nome"
                      placeholder="Nome da Despesa"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Descrição</label>
                    <input
                      class="form-control"
                      v-model="descricao"
                      placeholder="Descrição da Despesa"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label mt-4">Valor</label>
                    <input
                      class="form-control"
                      v-model="valor"
                      type="number"
                      step="0.01"
                      placeholder="Valor"
                      required
                    />
                  </div>
                  <button
                    class="form-control mt-4 text-dark bg-danger"
                    type="submit"
                  >
                    {{ itemEditando ? "Atualizar Despesa" : "Adicionar Despesa" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card">
              <div class="card-header text-right">
                <h2>Despesas Registradas ({{ despesas.length }})</h2>
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
                        <th scope="col">Valor</th>
                        <th scope="col" class="text-right" id="noprint">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in despesas" :key="item.chave">
                        <td>{{ item.nome }}</td>
                        <td>{{ item.descricao }}</td>
                        <td>{{ formatarValor(item.valor) }}</td>
                        <td class="text-right" id="noprint">
                          <button
                            class="btn btn-warning btn-sm"
                            @click="editarDespesa(item)"
                          >
                            Editar
                          </button>
                          <button
                            class="btn btn-danger btn-sm"
                            @click="excluirDespesa(item.chave)"
                          >
                            Excluir
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
        valor: "",
        despesas: [],
        itemEditando: null,
      };
    },
    methods: {
      gerarChavePrimaria() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      },
      adicionarDespesa() {
        if (this.nome && this.descricao && this.valor) {
          const novaDespesa = {
            chave: this.gerarChavePrimaria(),
            nome: this.nome,
            descricao: this.descricao,
            valor: parseFloat(this.valor),
          };
          this.salvarDespesa(novaDespesa);
          this.nome = "";
          this.descricao = "";
          this.valor = "";
          this.carregarDespesas();
        }
      },
      editarDespesa(item) {
        this.nome = item.nome;
        this.descricao = item.descricao;
        this.valor = item.valor;
        this.itemEditando = item.chave;
      },
      salvarDespesa(item) {
        let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
        despesas.push(item);
        localStorage.setItem("despesas", JSON.stringify(despesas));
      },
      atualizarDespesa() {
        if (this.itemEditando) {
          const despesaAtualizada = {
            chave: this.itemEditando,
            nome: this.nome,
            descricao: this.descricao,
            valor: parseFloat(this.valor),
          };
  
          let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
          despesas = despesas.map((item) =>
            item.chave === this.itemEditando ? despesaAtualizada : item
          );
          localStorage.setItem("despesas", JSON.stringify(despesas));
  
          this.itemEditando = null;
          this.nome = "";
          this.descricao = "";
          this.valor = "";
          this.carregarDespesas();
        }
      },
      excluirDespesa(chave) {
        let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
        despesas = despesas.filter((item) => item.chave !== chave);
        localStorage.setItem("despesas", JSON.stringify(despesas));
        this.carregarDespesas();
      },
      carregarDespesas() {
        this.despesas = this.consultarDespesas();
      },
      consultarDespesas() {
        return JSON.parse(localStorage.getItem("despesas")) || [];
      },
      formatarValor(valor) {
        return valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    mounted() {
      this.carregarDespesas();
    },
  };
  </script>
  