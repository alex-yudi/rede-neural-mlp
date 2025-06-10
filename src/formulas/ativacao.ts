import { FuncaoAtivacao } from "../tipos";

const ativarSigmoide = (x: number): number => {
  if (x < -100) return 0;

  // Fórmula: f(x) = 1 / (1 + e^(-x))
  return 1 / (1 + Math.exp(-x));
};

const derivadaSigmoide = (x: number): number => {
  // Fórmula: f'(x) = f(x) * (1 - f(x))
  return x * (1 - x);
};

export const sigmoide: FuncaoAtivacao = {
  ativar: ativarSigmoide,
  derivada: derivadaSigmoide,
};