<template>
  <section id="topo" class="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -right-32 size-[36rem] rounded-full bg-gradient-gold opacity-20 blur-3xl"
    />
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span class="inline-flex items-center gap-2 rounded-full bg-whats/15 px-3.5 py-1.5 text-sm font-semibold text-earth">
          <span class="grid size-5 place-items-center rounded-full bg-whats">
            <svg viewBox="0 0 24 24" class="size-3 fill-cream">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5-.3.3c-.1.1-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.8c.2.1.4.2.5.3.1.2.1.6-.1 1.2Z" />
            </svg>
          </span>
          Consultas via WhatsApp
        </span>

        <h1 class="mt-6 font-display text-4xl leading-[1.05] font-extrabold text-balance-tight md:text-6xl">
          Consulte qualquer área de
          <span class="relative text-earth-soft">
            <span class="relative z-10 bg-gradient-gold bg-clip-text text-transparent">
              garimpo do Brasil
            </span>
          </span>
          em segundos
        </h1>

        <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Mande um pino de localização ou o número do processo ANM. A gente devolve a ficha
          completa, a poligonal em KML e os alertas ambientais da área — direto no seu WhatsApp.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/planos"
            class="rounded-full bg-gradient-gold px-7 py-3.5 font-display text-sm font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
          >
            Ver planos
          </NuxtLink>
          <NuxtLink
            to="/como-funciona"
            class="rounded-full border border-border bg-card px-7 py-3.5 font-display text-sm font-bold text-earth transition-colors hover:bg-secondary"
          >
            Como funciona
          </NuxtLink>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-[19rem]">
        <div class="absolute -inset-6 -z-10 rounded-lg bg-gradient-gold opacity-25 blur-2xl" />
        <div class="grain rounded-lg border border-earth-soft/40 bg-gradient-earth p-3 shadow-soft">
          <div class="rounded-xl bg-cream p-4">
            <div class="flex items-center gap-2 border-b border-border pb-3">
              <span class="grid size-8 place-items-center rounded-full bg-gradient-gold font-display text-xs font-bold text-earth">
                MG
              </span>
              <div class="leading-tight">
                <p class="font-display text-sm font-bold">Meu Garimpo</p>
                <p class="text-[11px] text-whats">online</p>
              </div>
            </div>

            <div class="space-y-2.5 py-4 text-[12px] leading-snug">
              <div class="ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-gradient-gold px-3 py-2 text-primary-foreground">
                Lat -6.4821, Lon -55.9903
              </div>
              <div class="max-w-[88%] rounded-lg rounded-bl-sm bg-card px-3 py-2 shadow-soft">
                <p class="font-display font-bold">Processo ANM 850.412/2019</p>
                <p class="mt-1 text-muted-foreground">
                  Fase: Autorização de Pesquisa · Substância: Ouro · Titular: MINERAÇÃO SERRA LTDA
                </p>
              </div>
              <div class="max-w-[70%] rounded-lg rounded-bl-sm bg-card px-3 py-2 shadow-soft">
                <p class="flex items-center gap-2 font-semibold">
                  <span class="grid size-7 place-items-center rounded-lg bg-secondary text-[10px] font-bold">KML</span>
                  Poligonal.kml
                </p>
              </div>
              <div class="max-w-[88%] rounded-lg rounded-bl-sm bg-card px-3 py-2 shadow-soft">
                <p class="font-display font-bold">Alertas ambientais</p>
                <p class="mt-1 text-muted-foreground">
                  Sem sobreposição com Terra Indígena
                  <br />Sem embargo IBAMA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
