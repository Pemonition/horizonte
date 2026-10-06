import { PATHS } from './learning-paths';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from './i18n';
@Component({imports:[TranslatePipe,RouterLink],template:`
 <p class="eyebrow">{{ 'l.tag' | t }}</p><h1 class="mt-5 max-w-4xl">{{ 'l.title' | t }}</h1>
 <p class="mt-6 max-w-3xl leading-7 text-muted">{{ 'l.intro' | t }}</p>
 <div class="mt-8 flex items-center gap-4"><label for="mission-progress">{{ 'l.progress' | t }}: {{completed()}} / 1</label><progress id="mission-progress" [value]="completed()" max="1" class="w-24 accent-accent"></progress></div>
 <div class="mt-10 grid gap-8 lg:grid-cols-2"><article class="mission-card"><p class="eyebrow">01 / {{ 'a.learn' | t }}</p><p class="mt-6 text-lg leading-9">{{ 'l.explain' | t }}</p><p class="mt-6 border-l-2 border-accent pl-4 text-xl">{{ 'l.past' | t:{year:observedYear().toString()} }}</p></article>
 <section class="mission-card"><h2>{{ 'l.contact' | t }}</h2><p class="mt-4 leading-7 text-muted">{{ 'l.contactIntro' | t }}</p><label for="light-distance" class="mt-6">{{ 'l.distance' | t }}: {{distance()}}</label><input id="light-distance" type="range" min="2" max="20" step="1" [value]="distance()" #distanceInput (input)="setDistance(distanceInput.value)" class="my-8 w-full accent-accent">
 <ol class="space-y-5 border-l-2 border-accent pl-6"><li><strong class="text-xl">{{year}}</strong><p>{{ 'l.sent' | t }}</p></li><li><strong class="text-xl">{{arrivalYear()}}</strong><p>{{ 'l.arrived' | t }}</p></li><li><strong class="text-xl">?</strong><p>{{ 'l.reply' | t }}</p></li></ol><p class="mt-6 text-sm leading-6 text-muted">{{ 'l.model' | t }}</p></section></div>
 <section class="mission-card mt-8"><h2>{{ 'l.replyChallenge' | t }}</h2><p class="mt-4 leading-7 text-muted">{{ 'l.replyPrompt' | t:{distance:distance()} }}</p><div class="mt-6 grid gap-3 md:grid-cols-3">@for(option of options();track option){<button class="secondary" [disabled]="completed()===1" [attr.aria-pressed]="answer()===option" (click)="answer.set(option)">{{ 'l.yearsOption' | t:{years:option} }}</button>}</div>
 @if(answer()!==null){<p role="status" class="mt-6 leading-7" [class.text-success]="completed()===1">{{(completed()===1?'l.replyCorrect':'l.replyRetry') | t:{distance:distance(),years:roundTrip(),year:replyYear().toString()} }}</p>}
 @if(completed()){<p class="mt-6 border-l-2 border-accent pl-4 text-xl">✦ {{ 'l.badge' | t }}</p><button class="secondary mt-6 self-start" (click)="reset()">{{ 'l.reset' | t }}</button>}
 </section>
 <section class="mt-10 border-t border-white/10 pt-8"><h2>{{ 'a.routes' | t }}</h2><p class="mt-4 max-w-3xl leading-7 text-muted">{{ 'l.pathsIntro' | t }}</p>
 <div class="mt-6 grid gap-6 lg:grid-cols-3">@for(path of paths;track path.id){<article class="mission-card"><h3 class="text-xl">{{path.title | t}}</h3><p class="mt-4 grow leading-7 text-muted">{{path.text | t}}</p><a class="mt-6 inline-block text-accent underline" [href]="path.url" target="_blank" rel="noopener noreferrer">{{ 'a.source' | t }} ↗</a></article>}</div></section>
 <aside class="mt-10 border-t border-white/10 pt-8"><h2>{{ 'l.sources' | t }}</h2><p class="mt-4 max-w-3xl leading-7 text-muted">{{ 'l.credit' | t }}</p><a class="mt-4 inline-block text-accent underline" href="https://science.nasa.gov/exoplanets/what-is-a-light-year/" target="_blank" rel="noopener noreferrer">NASA Science — What is a light-year? ↗</a></aside>
 <a routerLink="/explorar" class="primary mt-10">{{ 'Começar a explorar' | t }} ↗</a>
`})
export class Learn {
 readonly paths=PATHS;
 readonly year=new Date().getFullYear();
 readonly distance=signal(4);readonly answer=signal<number|null>(null);
 readonly observedYear=computed(()=>this.year-this.distance());
 readonly arrivalYear=computed(()=>this.year+this.distance());
 readonly roundTrip=computed(()=>2*this.distance());
 readonly replyYear=computed(()=>this.year+this.roundTrip());
 readonly options=computed(()=>[this.distance(),this.roundTrip(),this.distance()*3]);
 readonly completed=computed(()=>this.answer()===this.roundTrip()?1:0);
 setDistance(value:string){const n=Number(value);if(Number.isInteger(n)&&n>=2&&n<=20&&n!==this.distance()){this.distance.set(n);this.answer.set(null);}}
 reset(){this.answer.set(null);this.distance.set(4);}
}
