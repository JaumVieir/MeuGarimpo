import { inject, provide, type InjectionKey } from "vue";
import type { PlanKey } from "@/components/marketing/plans";

export const CheckoutKey: InjectionKey<(plan: PlanKey) => void> = Symbol("checkout");

export function provideCheckout(fn: (plan: PlanKey) => void) {
  provide(CheckoutKey, fn);
}

export function useCheckout() {
  return inject(CheckoutKey, () => {});
}
