<template>
  <div class="py-5">
    <div class="container">
      <!-- Painel Principal -->
      <div class="row">
        <div class="col-md-12">
          <div class="py-3 text-center">
            <div class="d-flex justify-content-between align-items-center">
              <h3>Painel Principal</h3>
              <p>{{ Number(storageUsedPercent).toFixed(1) }}% Memória Usada</p>
            </div>
            <hr />

            <!-- Informações sobre Mesas -->
            <div class="d-flex justify-content-between align-items-center">
              <p>Sobre as Mesas</p>
            </div>
            <div class="row py-3">
              <div class="col-sm-6 col-xl-6">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-cutlery fa-3x text-info"></i>
                  <div class="ms-3">
                    <p class="mb-2">{{ mesasAbertas }} Mesas Abertas</p>
                    <hr />
                    <h6 class="mb-0">
                      Valor: {{ valorMesasAbertas.toFixed(2) }}
                    </h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-6">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-calendar-check-o fa-3x text-success"></i>
                  <div class="ms-3">
                    <p class="mb-2">{{ mesasFechadas }} Mesas Fechadas</p>
                    <hr />
                    <h6 class="mb-0">
                      Valor: {{ valorMesasFechadas.toFixed(2) }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <!-- Informações sobre Pedidos -->
            <div class="d-flex justify-content-between align-items-center">
              <p>Sobre os Pedidos</p>
            </div>
            <div class="row py-3">
              <div class="col-sm-6 col-xl-3">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-circle-o-notch fa-3x text-danger"></i>
                  <div class="ms-3">
                    <p class="mb-2">Aguardando</p>
                    <hr />
                    <h6 class="mb-0">{{ totalEmPedido }} Itens</h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-history fa-3x text-warning"></i>
                  <div class="ms-3">
                    <p class="mb-2">Em Preparo</p>
                    <hr />
                    <h6 class="mb-0">{{ totalEmPreparo }} Itens</h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-check-circle-o fa-3x text-info"></i>
                  <div class="ms-3">
                    <p class="mb-2">Prontos</p>
                    <hr />
                    <h6 class="mb-0">{{ totalPronto }} Itens</h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div
                  class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-check-circle fa-3x text-success"></i>
                  <div class="ms-3">
                    <p class="mb-2">Servidos</p>
                    <hr />
                    <h6 class="mb-0">{{ totalServido }} Itens</h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />


      <!-- Informações sobre Despesas -->
      <div class="d-flex justify-content-between align-items-center">
        <p>Saidas e Saldo Caixa</p>
      </div>
      <div class="row py-3">
        <div class="col-sm-6 col-xl-6">
          <div
            class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
          >
            <i class="fa fa-money fa-3x text-danger"></i>
            <div class="ms-3">
              <p class="mb-2">Despesas Totais</p>
              <hr />
              <h6 class="mb-0">Valor: {{ totalDespesaEmpresa.toFixed(2) }}</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-6">
          <div
            class="bg-light border rounded p-4 m-1 d-flex align-items-center justify-content-between"
          >
            <i
              class="fa fa-money fa-3x"
              :class="
                valorMesasFechadas - totalDespesaEmpresa < 0
                  ? 'text-danger'
                  : 'text-primary'
              "
            ></i>
            <div class="ms-3">
              <p class="mb-2" :class="
                valorMesasFechadas - totalDespesaEmpresa < 0
                  ? 'text-danger'
                  : 'text-primary'
              ">Saldo Caixa</p>
              <hr />
              <h6 class="mb-0" :class="
                valorMesasFechadas - totalDespesaEmpresa < 0
                  ? 'text-danger'
                  : 'text-primary'
              ">
                Valor:
                {{ (valorMesasFechadas - totalDespesaEmpresa).toFixed(2) }}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <hr />
            <!-- Botões de Exportação e Importação -->
            <div class="row py-3">
              <div class="col-md-6">
                <button @click="exportarDados" class="btn btn-primary w-100">
                  Exportar Dados
                </button>
              </div>
              <div class="col-md-6">
                <button @click="importarDados" class="btn btn-secondary w-100">
                  Importar Dados
                </button>
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
      totalPedido: 0,
      totalEmPedido: 0,
      totalEmPreparo: 0,
      totalPronto: 0,
      totalServido: 0,
      mesasAbertas: 0,
      mesasFechadas: 0,
      valorMesasAbertas: 0,
      valorMesasFechadas: 0,
      storageMax: 5 * 1024, // 5 MB convertido para KB
      storageUsedPercent: 0,
      totalDespesaEmpresa: 0, // Valor total das despesas
    };
  },
  methods: {
    calcularDespesaEmpresa() {
      const despesas =
        JSON.parse(localStorage.getItem("despesasEmpresa")) || [];
      this.totalDespesaEmpresa = despesas.reduce(
        (total, despesa) => total + despesa.valor,
        0
      );
    },
    calcularTotalPedido() {
      const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
      this.totalPedido = pedidos.length;
    },
    calcularTotalEmPedido() {
      const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
      this.totalEmPedido = pedidos.filter(
        (pedido) => pedido.status === "Pedido"
      ).length;
    },
    calcularTotalEmPreparo() {
      const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
      this.totalEmPreparo = pedidos.filter(
        (pedido) => pedido.status === "Em Preparo"
      ).length;
    },
    calcularTotalPronto() {
      const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
      this.totalPronto = pedidos.filter(
        (pedido) => pedido.status === "Pronto"
      ).length;
    },
    calcularTotalServido() {
      const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
      this.totalServido = pedidos.filter(
        (pedido) => pedido.status === "Servido"
      ).length;
    },
    calcularTotalMesasAtendimento() {
      const mesasAtendimento =
        JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
      this.mesasAbertas = mesasAtendimento.filter(
        (mesa) => mesa.status === "Aberta"
      ).length;
      this.mesasFechadas = mesasAtendimento.filter(
        (mesa) => mesa.status === "Fechada"
      ).length;
      this.valorMesasAbertas = mesasAtendimento
        .filter((mesa) => mesa.status === "Aberta")
        .reduce((total, mesa) => total + mesa.valorTotal, 0);
      this.valorMesasFechadas = mesasAtendimento
        .filter((mesa) => mesa.status === "Fechada")
        .reduce((total, mesa) => total + mesa.valorTotal, 0);
    },
    calcularArmazenamentoLocal() {
      const used = this.getUsedStorage();
      this.storageUsedPercent = ((used / this.storageMax) * 100).toFixed(2);
    },
    getUsedStorage() {
      let used = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const itemSize = localStorage.getItem(key).length + key.length;
        used += itemSize;
      }
      return used / 1024; // Convertido para KB
    },
    exportarDados() {
      const dados = JSON.stringify(localStorage);
      const blob = new Blob([dados], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const dataFormatada = new Date()
        .toLocaleDateString("pt-BR")
        .replace(/\//g, "-");
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_${dataFormatada}`;
      a.click();
    },
    importarDados() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const jsonData = JSON.parse(e.target.result);
          for (const key in jsonData) {
            localStorage.setItem(key, jsonData[key]);
          }
          this.carregarDados();
        };
        reader.readAsText(file);
      };
      input.click();
    },
    carregarDados() {
      this.calcularTotalMesasAtendimento();
      this.calcularTotalPedido();
      this.calcularTotalEmPedido();
      this.calcularTotalEmPreparo();
      this.calcularTotalPronto();
      this.calcularTotalServido();
      this.calcularDespesaEmpresa();
      this.calcularArmazenamentoLocal();
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.bg-light {
  background-color: #f8f9fa !important;
}
.text-info {
  color: #17a2b8 !important;
}
.text-success {
  color: #28a745 !important;
}
.text-danger {
  color: #dc3545 !important;
}
.text-warning {
  color: #ffc107 !important;
}
.text-primary {
  color: #007bff !important;
}
</style>
