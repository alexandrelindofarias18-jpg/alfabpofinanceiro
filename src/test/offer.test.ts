import { describe, expect, it } from "vitest";
import { OFFER, formatBRL } from "@/slides/offer";

describe("ALFA offer", () => {
  it("charges a one-time setup fee of R$ 100", () => {
    expect(OFFER.setupFee).toBe(100);
    expect(formatBRL(OFFER.setupFee)).toBe("R$ 100");
  });

  it("charges R$ 300 per month after setup", () => {
    expect(OFFER.monthlyFee).toBe(300);
    expect(formatBRL(OFFER.monthlyFee)).toBe("R$ 300");
  });
});
