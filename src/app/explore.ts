import { Component, computed, inject, signal } from '@angular/core';
import { NasaService } from './nasa.service';
import { JournalStore } from './journal.store';
import { DiscoveryCard, Stat } from './components';
@Component({selector:'app-explore',imports:[DiscoveryCard,Stat],template:`
 <section class="orbital grid gap-10 rounded-2xl pb-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
  <div><p class="eyebrow mb-6">UM CONVITE AO DESCONHECIDO</p><h1>O universo é maior<br><span class="text-muted">que a sua rotina.</span></h1><p class="mt-6 max-w-lg text-lg leading-8 text-muted">Vá além do que você conhece. Explore imagens reais do espaço e transforme descobertas em histórias suas.</p><a href="#acervo" class="primary mt-8">Começar a explorar <span aria-hidden="true">↗</span></a></div>
  <figure class="overflow-hidden rounded-2xl border border-white/10 bg-space"><a href="/antennae-biggs-original.jpg" target="_blank" rel="noopener noreferrer" aria-label="Abrir fotografia das Galáxias Antenas em alta resolução"><img src="/antennae-biggs.jpg" srcset="/antennae-biggs.jpg 960w, /antennae-biggs-original.jpg 3840w" sizes="(min-width: 1024px) 520px, 100vw" alt="Galáxias Antenas em interação, com seus núcleos e braços formando uma figura que lembra um coração. Fotografia de Kent E. Biggs." class="h-auto w-full" fetchpriority="high"></a><figcaption class="p-5 text-xs leading-6 tracking-widest">01 / UM ENCONTRO QUE LEMBRA UM CORAÇÃO<span class="mt-1 block text-muted">Galáxias Antenas · NGC 4038 e NGC 4039</span><a href="https://apod.nasa.gov/apod/ap240207.html" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block tracking-normal text-accent underline">© Kent E. Biggs · Publicada no APOD/NASA ↗</a></figcaption></figure>
 </section>
 <div class="grid grid-cols-3 gap-3 border-y border-white/10 py-6"><app-stat label="nesta busca" [value]="resultCount()"/><app-stat label="na coleção" [value]="store.savedCount()"/><app-stat label="observações" [value]="store.entryCount()"/></div>
 <section id="acervo" class="mt-12"><div class="flex flex-wrap items-end justify-between gap-4"><div><p class="eyebrow mb-3">ESCOLHA UM NOVO HORIZONTE</p><h2>Pequenos passos. Grandes descobertas.</h2></div><span class="text-sm text-muted">NASA / acervo público</span></div>
 <form (submit)="search($event)" class="mt-7 flex gap-3"><label class="sr-only" for="search">Buscar no acervo NASA</label><input id="search" class="field" [value]="term()" (input)="term.set($event.target.value)" placeholder="Busque em inglês: moon, saturn, nebula…" maxlength="100"><button class="primary shrink-0" [disabled]="!term().trim() || api.loading()">Buscar</button></form>
 <div class="mt-4 flex flex-wrap gap-2">@for(topic of topics; track topic.query){<button class="secondary !py-2" [class.!border-accent]="api.query()===topic.query" [attr.aria-pressed]="api.query()===topic.query" (click)="choose(topic.query)">{{topic.label}}</button>}</div>
 <p class="mt-4 text-xs text-muted">Títulos e descrições são fornecidos pela NASA em inglês. Exibimos até 24 imagens por busca.</p>
 @if(api.loading()){<div role="status" class="py-20 text-center text-muted">Buscando novos horizontes…</div>}
 @else if(api.error()){<div role="alert" class="my-8 rounded-2xl border border-danger/40 p-8"><p class="text-danger">{{api.error()}}</p><button class="secondary mt-5" (click)="api.search(api.query())">Tentar novamente</button></div>}
 @else {<div class="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">@for(item of api.discoveries(); track item.id){<app-discovery-card [item]="item" [saved]="store.savedIds().has(item.id)" (toggle)="store.toggle($event)"/>}@empty{<p role="status" class="col-span-full rounded-2xl border border-white/10 p-12 text-center text-muted">Nenhuma descoberta encontrada. Experimente outro termo em inglês.</p>}</div>}
 </section>`})
export class Explore {
 readonly api=inject(NasaService); readonly store=inject(JournalStore); readonly term=signal(this.api.query());
 readonly resultCount=computed(()=>this.api.discoveries().length);
 readonly topics=[{label:'Nebulosas',query:'nebula'},{label:'Lua',query:'moon'},{label:'Marte',query:'mars'},{label:'Saturno',query:'saturn'},{label:'Nosso planeta',query:'earth'}];
 constructor(){ if(!this.api.discoveries().length && !this.api.loading()) this.api.search(this.api.query()); }
 search(event:Event){event.preventDefault(); if(this.term().trim()) this.api.search(this.term().trim());}
 choose(query:string){this.term.set(query);this.api.search(query);}
}
