import type { ComponentType } from "react";
import { SlideIndexContext } from "./SlideLayout";
import {
  AudienceSlide,
  ClosingSlide,
  CompareSlide,
  CoverSlide,
  HowItWorksSlide,
  PricingSlide,
  ProblemSlide,
  ServicesSlide,
  SolutionSlide,
  StatementSlide,
} from "./slides";

export type SlideDef = { id: string; title: string; Component: ComponentType; notes: string };

export const slides: SlideDef[] = [
  {
    id: "capa",
    title: "Capa",
    Component: CoverSlide,
    notes: "Apresente-se e diga em uma frase o que a ALFA faz: cuidamos do financeiro para você cuidar dos clientes.",
  },
  {
    id: "problema",
    title: "O problema",
    Component: ProblemSlide,
    notes: "Pergunte ao cliente qual dessas situações ele vive hoje. Deixe ele falar — é aqui que ele se reconhece.",
  },
  {
    id: "frase",
    title: "Tempo é dinheiro",
    Component: StatementSlide,
    notes: "Pausa. Reforce que o tempo gasto com o financeiro é tempo tirado do trabalho que gera receita.",
  },
  {
    id: "solucao",
    title: "A solução",
    Component: SolutionSlide,
    notes: "Explique o que é BPO financeiro com palavras simples: uma equipe que cuida da parte chata para ele.",
  },
  {
    id: "servicos",
    title: "O que fazemos",
    Component: ServicesSlide,
    notes: "Passe rápido por cada item, ligando com as dores que o cliente citou no slide 2.",
  },
  {
    id: "como-funciona",
    title: "Como funciona",
    Component: HowItWorksSlide,
    notes: "Mostre que começar é fácil: o primeiro passo é só uma conversa de diagnóstico.",
  },
  {
    id: "para-quem",
    title: "Para quem é",
    Component: AudienceSlide,
    notes: "Cite um exemplo próximo da área do cliente para gerar identificação.",
  },
  {
    id: "diferenca",
    title: "Antes e depois",
    Component: CompareSlide,
    notes: "Peça para ele imaginar o próximo mês já do lado direito.",
  },
  {
    id: "investimento",
    title: "Investimento",
    Component: PricingSlide,
    notes: "Apresente o valor com segurança: adesão única de R$ 100 e depois R$ 300 por mês.",
  },
  {
    id: "contato",
    title: "Vamos começar",
    Component: ClosingSlide,
    notes: "Feche propondo o diagnóstico já com data marcada.",
  },
];

export function SlideView({ index }: { index: number }) {
  const slide = slides[index];
  if (!slide) return null;
  const { Component } = slide;
  return (
    <SlideIndexContext.Provider value={{ index, total: slides.length }}>
      <Component />
    </SlideIndexContext.Provider>
  );
}
