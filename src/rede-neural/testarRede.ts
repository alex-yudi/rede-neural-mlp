import { RedeNeural, ResultadoTeste } from "../tipos";
import { propagacaoDireta } from "./propagacaoDireta";

export function testarRede(
  rede: RedeNeural,
  entrada: number,
  valorOriginal?: number
): ResultadoTeste {
  // Realiza a propagação direta
  const saida = propagacaoDireta(rede, entrada);

  // Converte a saída para valores binários (0 ou 1)
  const saidaBinaria = saida.map(valor => valor >= 0.5 ? 1 : 0);

  // Converte a saída binária para o número decimal correspondente
  let classificacao = 0;
  for (let i = 0; i < saidaBinaria.length; i++) {
    // Converte de binário para decimal
    classificacao += saidaBinaria[i] * Math.pow(2, saidaBinaria.length - 1 - i);
  }

  // Verifica se a classificação está correta 
  const estaCorreto = valorOriginal !== undefined ? classificacao === valorOriginal : true;

  return {
    entrada,
    valorOriginal: valorOriginal !== undefined ? valorOriginal : -1,
    saida,
    saidaBinaria,
    classificacao,
    estaCorreto
  };
}
