// Commercial terms shown in the deck. Change prices here only.
export const OFFER = {
  brand: "ALFA",
  setupFee: 100, // adesão, pago uma única vez
  monthlyFee: 300, // mensalidade a partir do segundo pagamento
  whatsappNumber: "5567993096973", // Alexandre, formato internacional sem símbolos
} as const;

export const WHATSAPP_URL = `https://wa.me/${OFFER.whatsappNumber}?text=${encodeURIComponent(
  "Olá, Alexandre! Vi a apresentação da ALFA e quero saber mais sobre o BPO financeiro.",
)}`;

export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}
