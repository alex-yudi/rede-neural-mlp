import { criarDadosTreinamento } from './formulas/dados';
import { testeIntermediarios, testeNormalizados } from './testesDaRede';
import { criarRedeNeural } from './rede-neural/criarRedeNeural';
import { treinarRede } from './rede-neural/treinarRede';


function main() {
  console.log('=================================================================');
  console.log('  Classificação de números de 0 a 7');
  console.log('=================================================================');

  // Parâmetros da rede neural
  const tamanhoEntrada = 1;       // Uma entrada (valor normalizado)
  const tamanhoOculta = 6;        // Número de neurônios na camada oculta
  const tamanhoSaida = 3;         // (representação binária de 3 bits)
  const taxaAprendizado = 0.2;
  const epocas = 500_000;

  /*
  Anotações:
    const taxaAprendizado = 0.4;
    const epocas = 60000;
    Tem gerado taxa de erro em torno de 0.000311
  */


  // Cria a rede neural
  console.log('Criando a rede neural...');
  const rede = criarRedeNeural(
    tamanhoEntrada,
    tamanhoOculta,
    tamanhoSaida,
    taxaAprendizado
  );

  // Cria os dados de treinamento
  console.log('Criando dados de treinamento...');
  const dadosTreinamento = criarDadosTreinamento();

  // Exibe os dados de treinamento
  console.log('\nDados de treinamento:');
  dadosTreinamento.forEach(
    exemplo => {
      console.log(`  Entrada: ${exemplo.entrada.toFixed(2)} -> Saída esperada: [${exemplo.saida.join(', ')}]`);
    });

  // Treina a rede neural
  console.log('\nIniciando treinamento...');
  const erroFinal = treinarRede(rede, dadosTreinamento, epocas);
  console.log(`\nTreinamento concluído. Erro final: ${erroFinal.toFixed(6)}`);

  console.log('\nPesos das camadas:');
  const [entrada, oculta, saida] = rede.camadas;
  console.log(`  ===== Camada Oculta ===== \n`)
  oculta.pesos.forEach((peso, i) => {
    console.log(`  Neurônio ${i + 1} da camada oculta:`);
    console.log(`    Pesos: ${peso.map(p => p.toFixed(4)).join(', ')}`);
  })

  console.log(`\n  ===== Camada de Saída ===== \n`)
  saida.pesos.forEach((peso, i) => {
    console.log(`  Neurônio ${i + 1} da camada de saída:`);
    console.log(`    Pesos: ${peso.map(p => p.toFixed(4)).join(', ')}`);
  });
  console.log('\n=================================================================');

  testeNormalizados(rede, dadosTreinamento);

  console.log('\n=================================================================');

  testeIntermediarios(rede);
}

main();
