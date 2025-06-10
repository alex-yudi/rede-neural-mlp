
export interface Camada {
  tamanho: number;
  entradas: number[];
  saidas: number[];
  deltas: number[];

  /** 
   * Matriz de pesos: pesos[i][j] representa o peso da conexão 
   * do neurônio j da camada anterior para o neurônio i desta camada 
   */
  pesos: number[][];
}


export interface RedeNeural {
  numCamadas: number;

  camadas: Camada[];

  taxaAprendizado: number;
}

export interface FuncaoAtivacao {
  ativar: (x: number) => number;

  derivada: (x: number) => number;
}

export interface ExemploTreinamento {
  entrada: number;

  saida: number[];
}

export interface ResultadoTeste {
  entrada: number;

  valorOriginal: number;

  saida: number[];

  saidaBinaria: number[];

  classificacao: number;

  estaCorreto: boolean;
}
