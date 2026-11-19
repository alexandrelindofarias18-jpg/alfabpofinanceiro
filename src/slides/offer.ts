// Commercial terms shown in the deck. Change prices here only.
export const OFFER = {
  brand: "ALFA",
  setupFee: 100, // adesão, pago uma única vez
  monthlyFee: 300, // mensalidade a partir do segundo pagamento
} as const;

export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}
