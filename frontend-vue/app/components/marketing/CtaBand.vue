<template>
  <section class="mx-auto max-w-6xl px-5 py-20">
    <div class="grain rounded-xl bg-gradient-earth px-8 py-14 text-center text-cream shadow-soft">
      <h2 class="mx-auto max-w-2xl font-display text-3xl font-extrabold text-balance-tight md:text-4xl">
        Pronto para garimpar com informação na mão?
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed opacity-70">
        Assine em minutos e comece a consultar áreas no WhatsApp hoje mesmo.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/planos"
          class="rounded-full bg-gradient-gold px-7 py-3.5 font-display text-sm font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
        >
          Ver planos
        </NuxtLink>
        <NuxtLink
          to="/contato"
          class="rounded-full border border-cream/30 px-7 py-3.5 font-display text-sm font-bold text-cream transition-colors hover:bg-cream/10"
        >
          Falar com a gente
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
