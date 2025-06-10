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

  /*
  Tipo diferente de cálculo de erro:
  (diferença simples)
  
  // Para cada neurônio de saída
  for (let i = 0; i < saida.length; i++) {
    // Calcula o erro 
    const erro = Math.abs(alvo[i] - saida[i]);
    
    // Soma a diferença absoluta
    soma += erro;
  }
  
  // Retorna a soma das diferenças absolutas
  return soma / saida.length;
  */
}