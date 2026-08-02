<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/marketing/Header.vue";
import Footer from "@/components/marketing/Footer.vue";
import LoginModal from "@/components/marketing/LoginModal.vue";
import RecoverModal from "@/components/marketing/RecoverModal.vue";
import CheckoutModal from "@/components/marketing/CheckoutModal.vue";
import SupportWidget from "@/components/marketing/SupportWidget.vue";
import { provideCheckout } from "@/composables/useCheckout";
import type { PlanKey } from "@/components/marketing/plans";

const login = ref(false);
const recover = ref(false);
const checkout = ref<PlanKey | null>(null);

provideCheckout((plan) => (checkout.value = plan));
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header @login="login = true" />
    <main>
      <slot />
    </main>
    <Footer />

    <LoginModal
      :open="login"
      @close="login = false"
      @recover="
        login = false;
        recover = true;
      "
    />
    <RecoverModal :open="recover" @close="recover = false" />
    <CheckoutModal :open="checkout !== null" :plan="checkout ?? 'full'" @close="checkout = null" />
    <SupportWidget />
  </div>
</template>
