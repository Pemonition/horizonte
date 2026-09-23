import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JournalStore } from './journal.store';
import { DiscoveryCard } from './components';
@Component({selector:'app-collection',imports:[DiscoveryCard,RouterLink],template:`
 <p class="eyebrow mb-5">SEU ATLAS PESSOAL</p><h1>Um universo para<br>chamar de seu.</h1><p class="mt-6 text-muted">Guarde o que desperta sua curiosidade. Sua coleção fica salva neste navegador.</p>
 <div class="my-8 flex flex-wrap items-center justify-between gap-4"><label class="w-full sm:max-w-md"><span class="mb-2 block text-sm text-muted">Filtrar sua coleção</span><input class="field" placeholder="Título ou centro de pesquisa" [value]="query()" (input)="query.set($event.target.value)"></label><span class="text-sm text-muted">{{filtered().length}} de {{store.savedCount()}} descobertas</span></div>
 <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">@for(item of filtered(); track item.id){<app-discovery-card [item]="item" [saved]="true" (toggle)="store.toggle($event)"/>}@empty{<div class="col-span-full rounded-2xl border border-white/10 py-16 text-center"><h2>{{query()?'Nenhum resultado com esse filtro.':'Sua próxima descoberta está lá fora.'}}</h2><p class="my-5 text-muted">{{query()?'Tente outra palavra ou limpe o filtro.':'Salve imagens no acervo para começar sua coleção.'}}</p><a routerLink="/explorar" class="primary">Explorar o acervo ↗</a></div>}</div>`})
export class Collection {readonly store=inject(JournalStore);readonly query=signal('');readonly filtered=computed(()=>{const q=this.query().trim().toLocaleLowerCase();return this.store.saved().filter(item=>(item.title+' '+item.center).toLocaleLowerCase().includes(q));});}
