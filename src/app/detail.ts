import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NasaService } from './nasa.service';
import { JournalStore } from './journal.store';
import { Discovery } from './models';
@Component({selector:'app-detail',imports:[RouterLink,DatePipe],template:`
 <a routerLink="/explorar" class="text-sm text-muted hover:text-accent">← Voltar ao acervo</a>
 @if(loading()){<p role="status" class="py-24 text-center text-muted">Abrindo esta descoberta…</p>}
 @else if(error()){<div role="alert" class="py-20"><h1>Sinal interrompido.</h1><p class="my-6 text-danger">{{error()}}</p><button class="primary" (click)="retry.update(increment)">Tentar novamente</button></div>}
 @else if(item(); as discovery){<article class="mt-8"><div class="grid gap-10 lg:grid-cols-2"><div class="overflow-hidden rounded-2xl border border-white/10">@if(!imageFailed()){<img [src]="discovery.image" [alt]="discovery.title" class="max-h-[650px] w-full object-contain" (error)="imageFailed.set(true)">}@else{<p class="p-16 text-muted">A imagem está indisponível na origem.</p>}</div><div><p class="eyebrow">{{discovery.center}} / {{discovery.date | date:'dd/MM/yyyy'}}</p><h1 class="mt-5 !text-4xl leading-tight md:!text-5xl">{{discovery.title}}</h1><p class="mt-6 text-xs text-muted">Descrição original da NASA (inglês)</p><p class="mt-3 whitespace-pre-line break-words leading-7 text-muted">{{discovery.description || 'Sem descrição disponível no acervo.'}}</p><div class="mt-8 flex flex-wrap gap-3"><button class="primary" [attr.aria-pressed]="store.savedIds().has(discovery.id)" (click)="store.toggle(discovery)">{{store.savedIds().has(discovery.id)?'✓ Salvo na coleção':'+ Salvar na coleção'}}</button><a routerLink="/diario" class="secondary">Escrever no diário ↗</a></div><a [href]="source(discovery.id)" target="_blank" rel="noopener noreferrer" class="mt-6 inline-block text-sm text-accent underline">Ver fonte e créditos na NASA ↗</a></div></div></article>}
 @else {<section class="py-20"><p class="eyebrow">REGISTRO NÃO ENCONTRADO</p><h1 class="mt-5">Além deste horizonte,<br>ainda não há registro.</h1><a routerLink="/explorar" class="primary mt-8">Voltar a explorar</a></section>}`})
export class Detail {
 readonly id=input.required<string>();readonly api=inject(NasaService);readonly store=inject(JournalStore);
 readonly item=signal<Discovery|null>(null);readonly loading=signal(true);readonly error=signal('');readonly imageFailed=signal(false);readonly retry=signal(0);readonly increment=(n:number)=>n+1;
 constructor(){effect(cleanup=>{const id=this.id();this.retry();this.loading.set(true);this.error.set('');this.imageFailed.set(false);this.item.set(null);const sub=this.api.getById(id).subscribe({next:item=>{this.item.set(item);this.loading.set(false);},error:()=>{this.error.set('Não foi possível carregar os detalhes. Confira sua conexão.');this.loading.set(false);}});cleanup(()=>sub.unsubscribe());});}
 source(id:string){return 'https://images.nasa.gov/details/'+encodeURIComponent(id);}
}
