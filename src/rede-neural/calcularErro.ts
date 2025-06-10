export function calcularErro(saida: number[], alvo: number[]): number {
  let soma = 0;

  // Para cada neurônio de saída
  for (let i = 0; i < saida.length; i++) {
    // Calcula o erro 
    const erro = alvo[i] - saida[i];

    // Eleva ao quadrado para eliminar valores negativos e penalizar erros maiores
    soma += erro * erro;
  }

  // Calcula a média dos erros quadráticos
  return soma / saida.length;
}