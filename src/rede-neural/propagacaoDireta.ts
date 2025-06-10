import { sigmoide } from "../formulas/ativacao";
import { RedeNeural } from "../tipos";

export function propagacaoDireta(rede: RedeNeural, entrada: number): number[] {
  const camadaEntrada = rede.camadas[0];
  const camadaOculta = rede.camadas[1];
  const camadaSaida = rede.camadas[2];

  // Define a entrada da rede
  camadaEntrada.saidas[0] = entrada;

  // Calcula as saídas da camada oculta
  for (let i = 0; i < camadaOculta.tamanho; i++) {
    let soma = 0;

    // Multiplica cada entrada pelo peso correspondente e soma
    for (let j = 0; j < camadaEntrada.tamanho; j++) {
      soma += camadaOculta.pesos[i][j] * camadaEntrada.saidas[j];
    }

    // Guarda o valor antes da ativação
    camadaOculta.entradas[i] = soma;

    // Aplica a função de ativação sigmoide
    camadaOculta.saidas[i] = sigmoide.ativar(soma);
  }

  // Calcula as saídas da camada de saída
  for (let i = 0; i < camadaSaida.tamanho; i++) {
    let soma = 0;

    // Soma ponderada das entradas (as saídas da camada oculta)
    for (let j = 0; j < camadaOculta.tamanho; j++) {
      soma += camadaSaida.pesos[i][j] * camadaOculta.saidas[j];
    }

    // Guarda o valor antes da ativação
    camadaSaida.entradas[i] = soma;

    // Aplica a função de ativação sigmoide
    camadaSaida.saidas[i] = sigmoide.ativar(soma);
  }

  return [...camadaSaida.saidas];
}