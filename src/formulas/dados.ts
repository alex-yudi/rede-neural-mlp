import { ExemploTreinamento } from '../tipos';

export function normalizar(valor: number, minimo: number, maximo: number): number {
  // A fórmula abaixo mapeia o valor do intervalo [min, max] para [0, 1]
  return (valor - minimo) / (maximo - minimo);
}

export function decimalParaBinario(valor: number): number[] {
  if (valor < 0 || valor > 7) {
    throw new Error('O valor deve estar entre 0 e 7');
  }

  // Converte para string binária de 3 bits
  const binario = valor.toString(2).padStart(3, '0');

  return binario.split('').map((bit: string) => parseInt(bit));
}

export function criarDadosTreinamento(): ExemploTreinamento[] {
  const dadosTreinamento: ExemploTreinamento[] = [];

  // Valores de entrada (0-7) e suas normalizações
  const valoresEntrada = [
    { valor: 0, normalizado: 0.0 },
    { valor: 1, normalizado: 0.14 },
    { valor: 2, normalizado: 0.28 },
    { valor: 3, normalizado: 0.42 },
    { valor: 4, normalizado: 0.57 },
    { valor: 5, normalizado: 0.71 },
    { valor: 6, normalizado: 0.85 },
    { valor: 7, normalizado: 1.0 }
  ];

  // Cria um exemplo de treinamento para cada valor
  for (const valorEntrada of valoresEntrada) {
    dadosTreinamento.push({
      entrada: valorEntrada.normalizado,
      saida: decimalParaBinario(valorEntrada.valor)
    });
  }

  return dadosTreinamento;
}

export function obterValorOriginal(valorNormalizado: number): number {
  const mapeamento = [
    { valor: 0, normalizado: 0.0 },
    { valor: 1, normalizado: 0.14 },
    { valor: 2, normalizado: 0.28 },
    { valor: 3, normalizado: 0.42 },
    { valor: 4, normalizado: 0.57 },
    { valor: 5, normalizado: 0.71 },
    { valor: 6, normalizado: 0.85 },
    { valor: 7, normalizado: 1.0 }
  ];

  // Procura o valor mais próximo na tabela
  let entradaMaisProxima = mapeamento[0];
  let distanciaMinima = Math.abs(valorNormalizado - entradaMaisProxima.normalizado);

  for (let i = 1; i < mapeamento.length; i++) {
    const distancia = Math.abs(valorNormalizado - mapeamento[i].normalizado);
    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      entradaMaisProxima = mapeamento[i];
    }
  }

  return entradaMaisProxima.valor;
}
