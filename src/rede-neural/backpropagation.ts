import { sigmoide } from "../formulas/ativacao";
import { RedeNeural } from "../tipos";

export function backpropagation(rede: RedeNeural, alvo: number[]): void {
  const camadaEntrada = rede.camadas[0];
  const camadaOculta = rede.camadas[1];
  const camadaSaida = rede.camadas[2];

  // ================================================================
  // CÁLCULO DOS DELTAS

  // Calcula os deltas da camada de saída
  for (let i = 0; i < camadaSaida.tamanho; i++) {
    const saida = camadaSaida.saidas[i];

    // Erro = valor esperado - valor obtido
    const erro = alvo[i] - saida;

    // Delta = erro * derivada da função de ativação
    // δᵏ = (tᵏ - yᵏ) * f'(netᵏ)
    camadaSaida.deltas[i] = erro * sigmoide.derivada(saida);
  }

  // Calcula os deltas da camada oculta
  // Propagação do erro da camada de saída para a camada oculta
  for (let i = 0; i < camadaOculta.tamanho; i++) {
    let erro = 0;

    // Para cada neurônio da camada de saída
    for (let j = 0; j < camadaSaida.tamanho; j++) {
      // Soma dos deltas da camada de saída multiplicado pelo peso
      erro += camadaSaida.deltas[j] * camadaSaida.pesos[j][i];
    }

    // Delta = erro propagado * derivada da função de ativação
    // δʲ =  Σ(δᵏ * wᵏʲ) * f'(netʲ)
    camadaOculta.deltas[i] = erro * sigmoide.derivada(camadaOculta.saidas[i]);
  }

  // ================================================================
  // ATUALIZAÇÃO DOS PESOS

  // Atualiza os pesos da camada de saída
  for (let i = 0; i < camadaSaida.tamanho; i++) {
    for (let j = 0; j < camadaOculta.tamanho; j++) {
      // Ajuste = taxa de aprendizado * delta * entrada
      // Δwʲᵢ = η * δʲ * yᵢ
      const ajuste = rede.taxaAprendizado * camadaSaida.deltas[i] * camadaOculta.saidas[j];
      // OBS.: A entrada aqui é a saída da camada oculta

      // Atualiza o peso
      camadaSaida.pesos[i][j] += ajuste;
    }

    // Atualiza o bias
    camadaSaida.bias[i] += rede.taxaAprendizado * camadaSaida.deltas[i];
  }

  // Atualiza os pesos da camada oculta
  for (let i = 0; i < camadaOculta.tamanho; i++) {
    for (let j = 0; j < camadaEntrada.tamanho; j++) {
      // Ajuste = taxa de aprendizado * delta * entrada
      // Δwʲᵢ = η * δʲ * yᵢ
      const ajuste = rede.taxaAprendizado * camadaOculta.deltas[i] * camadaEntrada.saidas[j];
      // OBS.: A entrada aqui é a saída da camada de entrada

      // Atualiza o peso
      camadaOculta.pesos[i][j] += ajuste;
    }

    // Atualiza o bias
    camadaOculta.bias[i] += rede.taxaAprendizado * camadaOculta.deltas[i];
  }
}