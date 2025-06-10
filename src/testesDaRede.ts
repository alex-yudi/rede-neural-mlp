import { obterValorOriginal } from "./formulas/dados";
import { testarRede } from "./rede-neural/testarRede";
import { ExemploTreinamento, RedeNeural, ResultadoTeste } from "./tipos";

export function testeNormalizados(rede: RedeNeural, dadosTreinamento: ExemploTreinamento[]) {
  console.log('\nTestando a rede neural com os dados de treinamento:');

  // Testa a rede neural com os valores de treinamento
  dadosTreinamento.forEach(exemplo => {
    // Obtém o valor original a partir do valor normalizado
    const valorOriginal = obterValorOriginal(exemplo.entrada);

    // Testa a rede e obtém os resultados
    const resultado = testarRede(rede, exemplo.entrada, valorOriginal);

    // Exibe os resultados no console
    console.log(`  Entrada: ${resultado.entrada.toFixed(2)} (Valor: ${valorOriginal})`);
    console.log(`  Saída da rede: [${resultado.saida.map(v => v.toFixed(2)).join(', ')}]`);
    console.log(`  Saída binária: [${resultado.saidaBinaria.join(', ')}]`);
    console.log(`  Classificação: ${resultado.classificacao}`);
    console.log(`  Resultado: ${resultado.estaCorreto ? 'CORRETO' : 'INCORRETO'}`);
    console.log('  ------');
  });
}

export function testeIntermediarios(rede: RedeNeural) {
  // Testa a rede neural com valores intermediários
  console.log('\nTestando com valores intermediários:');
  const valoresTeste = [0.07, 0.21, 0.35, 0.49, 0.64, 0.78, 0.92];

  valoresTeste.forEach(valor => {
    // Obtém o valor original mais próximo
    const valorOriginal = obterValorOriginal(valor);

    // Testa a rede e obtém os resultados
    const resultado = testarRede(rede, valor, valorOriginal);

    // Exibe os resultados no console
    console.log(`  Entrada: ${valor.toFixed(2)} (Valor mais próximo: ${valorOriginal})`);
    console.log(`  Saída da rede: [${resultado.saida.map(v => v.toFixed(2)).join(', ')}]`);
    console.log(`  Saída binária: [${resultado.saidaBinaria.join(', ')}]`);
    console.log(`  Classificação: ${resultado.classificacao}`);
    console.log(`  Resultado: ${resultado.estaCorreto ? 'CORRETO' : 'INCORRETO'}`);
    console.log('  ------');
  });
}