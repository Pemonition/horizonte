import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from './i18n';
@Component({imports:[TranslatePipe,RouterLink],template:`
 <p class="eyebrow">{{ 'l.tag' | t }}</p><h1 class="mt-5 max-w-4xl">{{ 'l.title' | t }}</h1>
 <p class="mt-6 max-w-3xl leading-7 text-muted">{{ 'l.intro' | t }}</p>
 <div class="mt-8 flex items-center gap-4"><label for="mission-progress">{{ 'l.progress' | t }}: {{completed()}} / 1</label><progress id="mission-progress" [value]="completed()" max="1" class="w-24 accent-accent"></progress></div>
 <div class="mt-10 grid gap-8 lg:grid-cols-2"><article class="mission-card"><p class="eyebrow">01 / {{ 'a.learn' | t }}</p><p class="mt-6 text-lg leading-9">{{ 'l.explain' | t }}</p></article>
 <section class="mission-card"><h2>{{ 'l.try' | t }}</h2><label for="light-distance" class="mt-6">{{ 'l.distance' | t }}: {{distance()}}</label><input id="light-distance" type="range" min="2" max="20" step="1" [value]="distance()" #distanceInput (input)="setDistance(distanceInput.value)" class="my-8 w-full accent-accent">
 <div class="relative my-6 h-2 bg-white/10" aria-hidden="true"><span class="absolute left-0 top-0 h-2 bg-accent" [style.width.%]="distance()/20*100"></span><span class="absolute -top-3 text-2xl text-accent" [style.left.%]="distance()/20*95">✦</span></div>
 <p class="mt-5 text-xl" aria-live="polite">{{ 'l.result' | t:{years:distance()} }}</p><p class="mt-5 text-sm leading-6 text-muted">{{ 'l.model' | t }}</p></section></div>
 <section class="mission-card mt-8"><h2>{{ 'l.challenge' | t }}</h2><div class="mt-6 grid gap-3 md:grid-cols-3">@for(option of options;track option){<button class="secondary" [disabled]="completed()===1" [attr.aria-pressed]="answer()===option" (click)="answer.set(option)">{{option | t}}</button>}</div>
 @if(answer()){<p role="status" class="mt-6 leading-7" [class.text-success]="completed()===1">{{(completed()===1?'l.correct':'l.retry') | t}}</p>}
 @if(completed()){<p class="mt-6 border-l-2 border-accent pl-4 text-xl">✦ {{ 'l.badge' | t }}</p><button class="secondary mt-6 self-start" (click)="reset()">{{ 'l.reset' | t }}</button>}
 </section>
 <aside class="mt-10 border-t border-white/10 pt-8"><h2>{{ 'l.sources' | t }}</h2><p class="mt-4 max-w-3xl leading-7 text-muted">{{ 'l.credit' | t }}</p><a class="mt-4 inline-block text-accent underline" href="https://science.nasa.gov/exoplanets/what-is-a-light-year/" target="_blank" rel="noopener noreferrer">NASA Science — What is a light-year? ↗</a></aside>
 <a routerLink="/explorar" class="primary mt-10">{{ 'Começar a explorar' | t }} ↗</a>
`})
export class Learn {
 readonly distance=signal(4);readonly answer=signal('');readonly options=['l.instant','l.eight','l.speed'];
 readonly completed=computed(()=>this.answer()==='l.eight'?1:0);
 setDistance(value:string){const n=Number(value);if(Number.isInteger(n)&&n>=2&&n<=20)this.distance.set(n);}
 reset(){this.answer.set('');this.distance.set(4);}
}
