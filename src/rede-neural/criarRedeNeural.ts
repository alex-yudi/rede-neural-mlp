import { Camada, RedeNeural } from "../tipos";

export function criarRedeNeural(
  tamanhoEntrada: number,
  tamanhoOculta: number,
  tamanhoSaida: number,
  taxaAprendizado: number
): RedeNeural {
  // Inicializa a rede neural com 3 camadas (entrada, oculta e saída)
  const rede: RedeNeural = {
    numCamadas: 3,
    camadas: [],
    taxaAprendizado
  };

  // =========================================================
  // CRIAÇÃO DAS CAMADAS

  // Cria a camada de entrada
  const camadaEntrada: Camada = {
    tamanho: tamanhoEntrada,
    entradas: new Array(tamanhoEntrada).fill(0),
    saidas: new Array(tamanhoEntrada).fill(0),
    deltas: new Array(tamanhoEntrada).fill(0),
    pesos: [] // Camada de entrada não tem pesos de entrada
  };

  // Cria a camada oculta
  const camadaOculta: Camada = {
    tamanho: tamanhoOculta,
    entradas: new Array(tamanhoOculta).fill(0),
    saidas: new Array(tamanhoOculta).fill(0),
    deltas: new Array(tamanhoOculta).fill(0),
    pesos: []
  };

  // Cria a camada de saída
  const camadaSaida: Camada = {
    tamanho: tamanhoSaida,
    entradas: new Array(tamanhoSaida).fill(0),
    saidas: new Array(tamanhoSaida).fill(0),
    deltas: new Array(tamanhoSaida).fill(0),
    pesos: []
  };


  // =========================================================
  // INICIALIZAÇÃO DOS PESOS

  // Inicializa os pesos da camada oculta com valores aleatórios pequenos
  for (let i = 0; i < tamanhoOculta; i++) {
    camadaOculta.pesos[i] = [];
    for (let j = 0; j < tamanhoEntrada; j++) {
      // Valores entre -0.1 e 0.1
      camadaOculta.pesos[i][j] = Math.random() * 0.2 - 0.1;
    }
  }

  // Inicializa os pesos da camada de saída com valores aleatórios pequenos
  for (let i = 0; i < tamanhoSaida; i++) {
    camadaSaida.pesos[i] = [];
    for (let j = 0; j < tamanhoOculta; j++) {
      // Valores entre -0.1 e 0.1
      camadaSaida.pesos[i][j] = Math.random() * 0.2 - 0.1;
    }
  }

  // =========================================================
  // Adiciona as camadas à rede

  rede.camadas.push(camadaEntrada);
  rede.camadas.push(camadaOculta);
  rede.camadas.push(camadaSaida);

  return rede;
}