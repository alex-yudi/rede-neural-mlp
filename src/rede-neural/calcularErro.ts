export function calcularErro(saida: number[], alvo: number[]): number {
  let soma = 0;

  // Para cada neurônio de saída
  for (let i = 0; i < saida.length; i++) {
    // Calcula o erro 
    const erro = Math.abs(alvo[i] - saida[i]);

    // Soma a diferença absoluta
    soma += erro;
  }

  // Retorna a soma das diferenças absolutas
  return soma / saida.length;
}