import { ExemploTreinamento, RedeNeural } from "../tipos";
import { backpropagation } from "./backpropagation";
import { calcularErro } from "./calcularErro";
import { propagacaoDireta } from "./propagacaoDireta";

export function treinarRede(rede: RedeNeural, exemplos: ExemploTreinamento[], epocas: number): number {
  let erro = 0;

  // Repete o treinamento pelo número de épocas especificado
  for (let epoca = 1; epoca <= epocas; epoca++) {
    erro = 0;

    // Para cada exemplo de treinamento
    for (let i = 0; i < exemplos.length; i++) {
      const exemplo = exemplos[i];

      // Realiza a forward pass
      const saida = propagacaoDireta(rede, exemplo.entrada);

      // Calcula o erro para este exemplo
      erro += calcularErro(saida, exemplo.saida);

      // Realiza o backward pass
      backpropagation(rede, exemplo.saida);
    }

    // Calcula o erro médio para esta época
    erro /= exemplos.length;

    // Exibe o erro a cada 10000 épocas para acompanhar o progresso
    if (epoca % 10_000 === 0) {
      console.log(`Época ${epoca}: erro = ${erro.toFixed(6)}`);
    }
  }

  return erro;
}