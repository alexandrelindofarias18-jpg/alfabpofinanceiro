import {
  ArrowLeftRight,
  BellRing,
  Check,
  Clock,
  FileBarChart,
  HandCoins,
  Landmark,
  LineChart,
  MessageCircle,
  Moon,
  Receipt,
  Shuffle,
  TrendingDown,
  X,
  type LucideIcon,
} from "lucide-react";
import capa from "@/assets/capa-prestador.jpg";
import prestadores from "@/assets/prestadores.jpg";
import { AlfaMark, SlideLayout } from "./SlideLayout";
import { OFFER, WHATSAPP_URL, formatBRL } from "./offer";

function Kicker({ children, className = "text-ink-soft" }: { children: string; className?: string }) {
  return <p className={`slide-kicker ${className}`}>{children}</p>;
}

/* 1 — Capa */
export function CoverSlide() {
  return (
    <SlideLayout tone="ink" chrome={false}>
      <img src={capa} alt="" className="absolute inset-y-0 right-0 h-full w-[50%] object-cover" />
      <div className="absolute inset-y-0 right-0 w-[50%] bg-linear-to-r from-ink via-ink/10 to-transparent" />
      <div className="relative z-10 flex h-full w-[62%] flex-col justify-between p-24">
        <div className="slide-subtitle flex items-center gap-5 font-extrabold tracking-tight">
          <AlfaMark />
          ALFA
        </div>
        <div>
          <Kicker className="text-lime">BPO financeiro para prestadores de serviço</Kicker>
          <h1 className="slide-title-lg mt-10 font-display font-medium">
            Você cuida dos clientes.
            <br />
            <span className="italic text-lime">A ALFA cuida do seu negócio.</span>
          </h1>
        </div>
        <p className="slide-body-lg max-w-[900px] text-paper/70">
          Gestão financeira terceirizada, feita por especialistas, todo mês.
        </p>
      </div>
    </SlideLayout>
  );
}

/* 2 — Problema */
const pains: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Shuffle,
    title: "Conta pessoal e da empresa misturadas",
    text: "Fica impossível saber o que é seu e o que é do negócio.",
  },
  {
    icon: TrendingDown,
    title: "Fatura bem, mas não sabe o lucro",
    text: "O dinheiro entra, some, e o mês fecha no aperto.",
  },
  {
    icon: BellRing,
    title: "Cobranças esquecidas",
    text: "O cliente atrasa e ninguém cobra na hora certa.",
  },
  {
    icon: Moon,
    title: "Noites perdidas com papelada",
    text: "Tempo que deveria ir para descanso ou novos clientes.",
  },
];

export function ProblemSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="px-24 pt-24">
        <Kicker>O problema</Kicker>
        <h2 className="slide-title mt-6 font-display font-medium">
          Seu financeiro vive no <span className="italic text-clay">improviso</span>?
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-8">
          {pains.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-8 rounded-slide bg-paper-deep p-10">
              <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-clay text-paper">
                <Icon className="size-10" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="slide-body-lg font-bold">{title}</h3>
                <p className="slide-body mt-3 text-ink/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 3 — Frase de impacto */
export function StatementSlide() {
  return (
    <SlideLayout tone="lime">
      <div className="flex h-full flex-col justify-center px-24 pb-16">
        <Clock className="size-28" strokeWidth={1.4} />
        <h2 className="slide-title-lg mt-14 max-w-[1550px] font-display font-medium">
          Cada hora no financeiro é uma hora a menos{" "}
          <span className="italic">atendendo seus clientes.</span>
        </h2>
      </div>
    </SlideLayout>
  );
}

/* 4 — Solução */
const bars = [
  [55, 46],
  [62, 50],
  [58, 52],
  [71, 49],
  [76, 53],
  [86, 55],
];
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

export function SolutionSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="grid h-full grid-cols-[1fr_760px] items-center gap-20 px-24 pb-16">
        <div>
          <Kicker>A solução</Kicker>
          <h2 className="slide-title mt-6 font-display font-medium">
            A ALFA assume o seu <span className="italic">financeiro.</span>
          </h2>
          <p className="slide-body-lg mt-10 max-w-[880px] text-ink/75">
            BPO financeiro é a terceirização da rotina financeira: nossa equipe organiza, controla e
            acompanha o dinheiro da sua empresa.
          </p>
          <p className="slide-body-lg mt-6 max-w-[880px] font-bold">
            Você recebe tudo pronto para decidir.
          </p>
        </div>
        <div className="rounded-slide bg-ink p-12 text-paper">
          <div className="flex items-center justify-between">
            <p className="slide-body font-bold">Fluxo de caixa</p>
            <span className="slide-badge rounded-full bg-paper/10 px-5 py-2 text-paper/70">
              Exemplo ilustrativo
            </span>
          </div>
          <div className="mt-12 flex h-[340px] items-end justify-between">
            {bars.map(([inflow, outflow], i) => (
              <div key={months[i]} className="flex flex-col items-center gap-4">
                <div className="flex h-[290px] items-end gap-2">
                  <div className="w-9 rounded-t-xl bg-lime" style={{ height: `${inflow}%` }} />
                  <div className="w-9 rounded-t-xl bg-paper/30" style={{ height: `${outflow}%` }} />
                </div>
                <span className="slide-caption text-paper/60">{months[i]}</span>
              </div>
            ))}
          </div>
          <div className="slide-caption mt-8 flex gap-10 text-paper/80">
            <span className="flex items-center gap-3">
              <span className="size-4 rounded-full bg-lime" /> Entradas
            </span>
            <span className="flex items-center gap-3">
              <span className="size-4 rounded-full bg-paper/30" /> Saídas
            </span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 5 — O que fazemos */
const services: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Receipt, title: "Contas a pagar", text: "Tudo pago em dia, sem multa." },
  { icon: HandCoins, title: "Contas a receber", text: "Cobranças enviadas e acompanhadas." },
  { icon: Landmark, title: "Conciliação bancária", text: "Cada movimento do banco conferido." },
  { icon: LineChart, title: "Fluxo de caixa", text: "Previsão do que entra e do que sai." },
  { icon: ArrowLeftRight, title: "Separação PF e PJ", text: "Seu dinheiro e o da empresa, separados." },
  { icon: FileBarChart, title: "Relatório mensal", text: "Resultado do mês em linguagem simples." },
];

export function ServicesSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="px-24 pt-24">
        <Kicker>O que fazemos por você</Kicker>
        <h2 className="slide-title mt-6 font-display font-medium">
          Sua rotina financeira, <span className="italic">de ponta a ponta.</span>
        </h2>
        <div className="mt-16 grid grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-6 rounded-slide bg-paper-deep p-10">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                <Icon className="size-8" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="slide-body-lg font-bold">{title}</h3>
                <p className="slide-body mt-2 text-ink/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 6 — Como funciona */
const steps = [
  { title: "Diagnóstico", text: "Entendemos como o dinheiro circula hoje no seu negócio." },
  { title: "Organização", text: "Arrumamos contas, categorias e acessos para começar certo." },
  { title: "Rotina mensal", text: "Assumimos pagamentos, cobranças e conciliações." },
  { title: "Relatório", text: "Todo mês você recebe os números e o que eles significam." },
];

export function HowItWorksSlide() {
  return (
    <SlideLayout tone="ink">
      <div className="px-24 pt-24">
        <Kicker className="text-lime">Como funciona</Kicker>
        <h2 className="slide-title mt-6 font-display font-medium">
          Do caos ao controle em <span className="italic text-lime">4 passos.</span>
        </h2>
        <div className="relative mt-24 grid grid-cols-4 gap-14">
          <div className="absolute inset-x-0 top-12 h-[3px] bg-paper/15" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="slide-subtitle flex size-24 items-center justify-center rounded-full bg-lime font-display font-semibold text-ink">
                {i + 1}
              </div>
              <h3 className="slide-body-lg mt-10 font-bold">{s.title}</h3>
              <p className="slide-body mt-4 text-paper/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 7 — Para quem */
const audiences = [
  "Salões e estética",
  "Saúde e terapias",
  "Manutenção e reformas",
  "Agências e freelancers",
  "Consultorias",
  "Técnicos e autônomos",
];

export function AudienceSlide() {
  return (
    <SlideLayout tone="ink">
      <img src={prestadores} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-x-24 bottom-36">
        <Kicker className="text-lime">Para quem é</Kicker>
        <h2 className="slide-title-lg mt-6 font-display font-medium">
          Para todo <span className="italic text-lime">prestador de serviço.</span>
        </h2>
        <div className="mt-12 flex max-w-[1500px] flex-wrap gap-4">
          {audiences.map((a) => (
            <span
              key={a}
              className="slide-badge rounded-full border border-paper/40 bg-ink/60 px-7 py-3 font-semibold"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 8 — Antes e depois */
const before = [
  "Contas misturadas e sustos no fim do mês",
  "Decisões tomadas no achismo",
  "Horas perdidas com planilhas e boletos",
];
const after = [
  "Finanças separadas e organizadas",
  "Números claros para decidir",
  "Tempo livre para atender e vender mais",
];

export function CompareSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="px-24 pt-24">
        <Kicker>A diferença</Kicker>
        <h2 className="slide-title mt-6 font-display font-medium">
          Sem a ALFA <span className="text-ink-soft">×</span>{" "}
          <span className="italic">com a ALFA.</span>
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-8">
          <div className="rounded-slide bg-paper-deep p-14">
            <p className="slide-kicker text-clay">Hoje</p>
            <ul className="mt-10 space-y-10">
              {before.map((b) => (
                <li key={b} className="slide-body-lg flex items-start gap-5">
                  <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-clay text-paper">
                    <X className="size-6" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-slide bg-ink p-14 text-paper">
            <p className="slide-kicker text-lime">Com a ALFA</p>
            <ul className="mt-10 space-y-10">
              {after.map((a) => (
                <li key={a} className="slide-body-lg flex items-start gap-5">
                  <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Check className="size-6" strokeWidth={2.5} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 9 — Investimento */
export function PricingSlide() {
  return (
    <SlideLayout tone="ink">
      <div className="px-24 pt-24">
        <Kicker className="text-lime">Investimento</Kicker>
        <h2 className="slide-title mt-6 font-display font-medium">
          Simples e <span className="italic text-lime">sem surpresas.</span>
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-8">
          <div className="rounded-slide border-2 border-paper/20 p-14">
            <p className="slide-kicker text-paper/60">Adesão · pagamento único</p>
            <p className="slide-price mt-8 font-display font-medium">{formatBRL(OFFER.setupFee)}</p>
            <p className="slide-body mt-10 text-paper/75">
              Diagnóstico e implantação da sua rotina financeira.
            </p>
          </div>
          <div className="rounded-slide bg-lime p-14 text-ink">
            <p className="slide-kicker text-ink/60">Mensalidade</p>
            <p className="slide-price mt-8 font-display font-medium">
              {formatBRL(OFFER.monthlyFee)}
              <span className="slide-subtitle font-sans font-bold tracking-normal">/mês</span>
            </p>
            <p className="slide-body mt-10 text-ink/80">
              Sua rotina financeira completa, cuidada todo mês.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 10 — Encerramento */
export function ClosingSlide() {
  return (
    <SlideLayout tone="ink" chrome={false}>
      <div className="flex h-full flex-col justify-between p-24">
        <div className="slide-subtitle flex items-center gap-5 font-extrabold tracking-tight">
          <AlfaMark />
          ALFA
        </div>
        <div>
          <h2 className="slide-title-lg max-w-[1500px] font-display font-medium">
            Vamos organizar o <span className="italic text-lime">seu financeiro?</span>
          </h2>
          <p className="slide-body-lg mt-10 text-paper/70">
            Comece pelo diagnóstico por apenas {formatBRL(OFFER.setupFee)}.
          </p>
        </div>
        <div className="flex items-center gap-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="slide-body-lg flex items-center gap-5 rounded-full bg-lime px-12 py-7 font-bold text-ink transition hover:scale-[1.03]"
          >
            <MessageCircle className="size-10" strokeWidth={2.2} />
            Chamar Alexandre no WhatsApp
          </a>
          <span className="slide-body text-paper/70">(67) 99309-6973</span>
        </div>
      </div>
    </SlideLayout>
  );
}
