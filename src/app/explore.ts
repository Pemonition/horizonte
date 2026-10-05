import { RouterLink } from '@angular/router';
import { TranslatePipe } from './i18n';
import { Component, computed, inject, signal } from '@angular/core';
import { NasaService } from './nasa.service';
import { JournalStore } from './journal.store';
import { DiscoveryCard, Stat } from './components';
@Component({selector:'app-explore',imports:[RouterLink,TranslatePipe,DiscoveryCard,Stat],template:`
 <section class="expedition-hero">
 <div class="hero-copy"><p class="mission-label">{{ 'a.tag' | t }}</p><p class="hero-wordmark" aria-hidden="true"><span>HORIZONTE</span></p><h1>{{ 'a.head' | t }}</h1><p class="hero-intro">{{ 'a.intro' | t }}</p><div class="mt-6 flex flex-wrap gap-3"><a routerLink="/aprender" class="primary">{{ 'a.start' | t }} ↗</a><a href="#acervo" class="secondary">{{ 'Começar a explorar' | t }}</a></div></div>
 <p class="hero-caption">{{ 'a.heroCredit' | t }}</p>
 </section>
 <div class="mt-6 grid grid-cols-2 gap-3 border-y border-white/10 py-6"><app-stat [label]="('nesta busca' | t)" [value]="resultCount()"/><app-stat [label]="('na coleção' | t)" [value]="store.savedCount()"/></div>
 <section class="mission-strip"><div><p class="eyebrow">01 / {{ 'a.learn' | t }}</p><h2 class="mt-3">{{ 'a.routes' | t }}</h2></div><a routerLink="/aprender" class="secondary">{{ 'a.physics' | t }} ↗</a><a routerLink="/produtos" class="secondary">{{ 'a.shop' | t }} ↗</a></section>
 <section id="acervo" class="mt-12"><div class="flex flex-wrap items-end justify-between gap-4"><div><p class="eyebrow mb-3">{{ 'ESCOLHA UM NOVO HORIZONTE' | t }}</p><h2>{{ 'a.archive' | t }}</h2></div><span class="text-sm text-muted">{{ 'NASA / acervo público' | t }}</span></div>
 <form (submit)="search($event)" class="mt-7 flex gap-3"><label class="sr-only" for="search">{{ 'Buscar no acervo NASA' | t }}</label><input id="search" class="field" [value]="term()" (input)="term.set($event.target.value)" [placeholder]="('Busque em inglês: moon, saturn, nebula…' | t)" maxlength="100"><button class="primary shrink-0" [disabled]="!term().trim() || api.loading()">{{ 'Buscar' | t }}</button></form>
 <div class="mt-4 flex flex-wrap gap-2">@for(topic of topics; track topic.query){<button class="secondary !py-2" [class.!border-accent]="api.query()===topic.query" [attr.aria-pressed]="api.query()===topic.query" (click)="choose(topic.query)">{{topic.label | t}}</button>}</div>
 <p class="mt-4 text-xs text-muted">{{ 'Títulos e descrições são fornecidos pela NASA em inglês. Exibimos até 24 imagens por busca.' | t }}</p>
 @if(api.loading()){<div role="status" class="py-20 text-center text-muted">{{ 'Buscando novos horizontes…' | t }}</div>}
 @else if(api.error()){<div role="alert" class="my-8 rounded-2xl border border-danger/40 p-8"><p class="text-danger">{{api.error() | t}}</p><button class="secondary mt-5" (click)="api.search(api.query())">{{ 'Tentar novamente' | t }}</button></div>}
 @else {<div class="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">@for(item of api.discoveries(); track item.id){<app-discovery-card [item]="item" [saved]="store.savedIds().has(item.id)" (toggle)="store.toggle($event)"/>}@empty{<p role="status" class="col-span-full rounded-2xl border border-white/10 p-12 text-center text-muted">{{ 'Nenhuma descoberta encontrada. Experimente outro termo em inglês.' | t }}</p>}</div>}
 </section>`})
export class Explore {
 readonly api=inject(NasaService); readonly store=inject(JournalStore); readonly term=signal(this.api.query());
 readonly resultCount=computed(()=>this.api.discoveries().length);
 readonly topics=[{label:'Nebulosas',query:'nebula'},{label:'Lua',query:'moon'},{label:'Marte',query:'mars'},{label:'Saturno',query:'saturn'},{label:'Nosso planeta',query:'earth'}];
 constructor(){ if(!this.api.discoveries().length && !this.api.loading()) this.api.search(this.api.query()); }
 search(event:Event){event.preventDefault(); if(this.term().trim()) this.api.search(this.term().trim());}
 choose(query:string){this.term.set(query);this.api.search(query);}
}
