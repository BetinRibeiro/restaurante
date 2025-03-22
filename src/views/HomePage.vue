<template>
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="py-3 text-center">
              <div class="text-right d-flex justify-content-between align-items-center">
                <h3 >Painel Principal</h3>
                <p>{{ Number(storageUsedPercent).toFixed(1) }}% Memoria Usada</p>
              </div>
              <hr>
              <div class="text-right d-flex justify-content-between align-items-center">
                <p>Sobre as Mesas</p>
              </div>
              <div class="row py-3">
                <div class="col-sm-6 col-xl-6">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-cutlery fa-3x text-info"></i>
                    <div class="ms-3">
                      <p class="mb-2">{{ mesasAbertas }} Mesas Abertas</p>
                      <hr>
                      <h6 class="mb-0">Valor: {{ valorMesasAbertas.toFixed(2) }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-6">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-calendar-check-o fa-3x text-success"></i>
                    <div class="ms-3">
                      <p class="mb-2">{{ mesasFechadas }} Mesas Fechadas</p>
                      <hr>
                      <h6 class="mb-0">Valor: {{ valorMesasFechadas.toFixed(2) }}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="text-right d-flex justify-content-between align-items-center">
                <p>Sobre os Pedidos</p>
              </div>
              <div class="row py-3">
                <div class="col-sm-6 col-3 col-xl-3">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-circle-o-notch  fa-3x text-danger"></i>
                    <div class="ms-3">
                      <p class="mb-2">Aguardando</p>
                      <hr>
                      <h6 class="mb-0">{{ totalPedido }} Itens</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-history fa-3x text-warning"></i>
                    <div class="ms-3">
                      <p class="mb-2">Em Preparo</p>
                      <hr>
                      <h6 class="mb-0">{{ totalEmPreparo }} Itens</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-check-circle-o fa-3x text-info"></i>
                    <div class="ms-3">
                      <p class="mb-2">Prontos</p>
                      <hr>
                      <h6 class="mb-0">{{ totalPronto }} Itens</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                  <div class="bg-light border rounded d-flex align-items-center justify-content-between p-4 m-1">
                    <i class="fa fa-check-circle fa-3x text-success"></i>
                    <div class="ms-3">
                      <p class="mb-2">Servidos</p>
                      <hr>
                      <h6 class="mb-0">{{ totalServido }} Itens</h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="py-3 text-center">
              <div class="text-right d-flex justify-content-between align-items-center">
                <h3>Painel Principal</h3>
                <p>{{ Number(storageUsedPercent).toFixed(1) }}% Memoria Usada</p>
              </div>
              <hr>
              <div class="text-right d-flex justify-content-between align-items-center">
                <p>Sobre as Mesas</p>
              </div>
              <div class="row py-3">
                <!-- ... seus cards aqui ... -->
              </div>
              <hr>
  
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
        totalEmPreparo: 0,
        totalPronto: 0,
        totalServido: 0,
        mesasAbertas: 0,
        mesasFechadas: 0,
        valorMesasAbertas: 0,  // Adicionando valor para as mesas abertas
        valorMesasFechadas: 0, // Adicionando valor para as mesas fechadas
        storageMax: 5 * 1024, // 5 MB convertido para KB
        storageUsedPercent: 0,
      };
    },
    methods: {
      calcularTotalPedido() {
        const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
        this.totalPedido = pedidos.length;
      },
      calcularTotalEmPreparo() {
        const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
        this.totalEmPreparo = pedidos.filter(pedido => pedido.status === "Em Preparo").length;
      },
      calcularTotalPronto() {
        const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
        this.totalPronto = pedidos.filter(pedido => pedido.status === "Pronto").length;
      },
      calcularTotalServido() {
        const pedidos = JSON.parse(localStorage.getItem("itensMesa")) || [];
        this.totalServido = pedidos.filter(pedido => pedido.status === "Servido").length;
      },
      calcularTotalMesasAtendimento() {
        const mesasAtendimento = JSON.parse(localStorage.getItem("mesasAtendimento")) || [];
        this.mesasAbertas = mesasAtendimento.filter(mesa => mesa.status === "Aberta").length;
        this.mesasFechadas = mesasAtendimento.filter(mesa => mesa.status === "Fechada").length;
        
        // Somando o valorTotal das mesas abertas e fechadas
        this.valorMesasAbertas = mesasAtendimento
          .filter(mesa => mesa.status === "Aberta")
          .reduce((total, mesa) => total + mesa.valorTotal, 0);
        
        this.valorMesasFechadas = mesasAtendimento
          .filter(mesa => mesa.status === "Fechada")
          .reduce((total, mesa) => total + mesa.valorTotal, 0);
      },
      calcularArmazenamentoLocal() {
        const used = this.getUsedStorage();
        const usedPercent = ((used / this.storageMax) * 100).toFixed(2);
        this.storageUsedPercent = usedPercent;
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
  
      // Método para exportar os dados para um arquivo JSON
      exportarDados() {
    const dados = JSON.stringify(localStorage);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dataFormatada = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-'); // Substituindo '/' por '-'
    const a = document.createElement('a');
    a.href = url;
    console.log(`backup_${dataFormatada}`);
    
    a.download = `backup_${dataFormatada}`; // Usando a data formatada como nome do arquivo
    a.click();
  },
  
      // Método para importar os dados de um arquivo JSON
      importarDados() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dados = JSON.parse(event.target.result);
            Object.keys(dados).forEach(key => {
              localStorage.setItem(key, dados[key]);
            });
            // Após importar, recalcular as informações.
            this.calcularTotalPedido();
            this.calcularTotalEmPreparo();
            this.calcularTotalPronto();
            this.calcularTotalServido();
            this.calcularTotalMesasAtendimento();
          };
          reader.readAsText(e.target.files[0]);
        };
        input.click();
      }
    },
    mounted() {
      this.calcularTotalPedido();
      this.calcularTotalEmPreparo();
      this.calcularTotalPronto();
      this.calcularTotalServido();
      this.calcularTotalMesasAtendimento();
      this.calcularArmazenamentoLocal();
    }
  };
  </script>
  
  <style scoped>
  .card-header {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  </style>