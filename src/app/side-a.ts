import { Component, computed, inject, signal } from '@angular/core';
import { I18n, TranslatePipe } from './i18n';

export const PATHS = [
 {id:'physics',title:'a.physics',text:'a.physicsText',url:'https://science.nasa.gov/learn/'},
 {id:'engineering',title:'a.engineering',text:'a.engineeringText',url:'https://www.nasa.gov/learning-resources/'},
 {id:'fiction',title:'a.fiction',text:'a.fictionText',url:'https://www.nasa.gov/ebooks/'}
] as const;
export const PRODUCTS = [
 {id:'guide',title:'a.guide',text:'a.guideText',mark:'01 / PDF'},
 {id:'kit',title:'a.kit',text:'a.kitText',mark:'02 / LAB'},
 {id:'merch',title:'a.merch',text:'a.merchText',mark:'03 / HORIZONTE'}
] as const;
export function validPlan(name:string,goal:string,topic:string,product:string):boolean {
 return name.trim().length>=2 && name.trim().length<=80 && goal.trim().length>=20 && goal.trim().length<=600 && PATHS.some(p=>p.id===topic) && PRODUCTS.some(p=>p.id===product);
}
export { Learn } from './learn';
@Component({imports:[TranslatePipe],template:`
 <p class="eyebrow">{{ 'a.tag' | t }}</p><h1 class="mt-5">{{ 'a.shopHead' | t }}</h1><p class="mt-6 max-w-3xl text-lg leading-8 text-muted">{{ 'a.shopIntro' | t }}</p>
 <div class="mt-10 grid gap-6 lg:grid-cols-3">@for(product of products;track product.id){<article class="mission-card" [class.selected-product]="selected()===product.id"><div class="product-art" aria-hidden="true"><span class="orbit-ring"></span><span>{{product.mark}}</span></div><p class="eyebrow mt-6">{{ 'a.planned' | t }}</p><h2 class="mt-3">{{product.title | t}}</h2><p class="mt-4 grow leading-7 text-muted">{{product.text | t}}</p><button type="button" class="secondary mt-6" [attr.aria-pressed]="selected()===product.id" (click)="selected.set(product.id);done.set(false)">{{ 'a.choose' | t }} <span aria-hidden="true">{{selected()===product.id?'✓':'↗'}}</span></button></article>}</div>
 <section class="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2" id="mission-plan"><div><p class="eyebrow">HORIZONTE / 01</p><h2 class="mt-4">{{ 'a.form' | t }}</h2><p id="plan-notice" class="mt-5 leading-7 text-muted">{{ 'a.local' | t }}</p><div class="mt-8 border-l-2 border-accent pl-6"><p class="eyebrow">{{ 'a.next' | t }}</p><h3 class="mt-4 text-xl">{{recommendation().title | t}}</h3><p class="mt-3 leading-7 text-muted">{{recommendation().text | t}}</p><a class="mt-5 inline-block text-accent underline" [href]="recommendation().url" target="_blank" rel="noopener noreferrer">{{ 'a.source' | t }} ↗</a></div></div>
 <form (submit)="download($event)" aria-describedby="plan-notice plan-help" class="space-y-5" novalidate>
 <label class="block">{{ 'a.name' | t }}<input class="field mt-2" name="name" autocomplete="nickname" required minlength="2" maxlength="80" [value]="name()" (input)="name.set($event.target.value);done.set(false)"></label>
 <label class="block">{{ 'a.topic' | t }}<select class="field mt-2" name="topic" #topicSelect [value]="topic()" (change)="topic.set(topicSelect.value);done.set(false)">@for(path of paths;track path.id){<option [value]="path.id">{{path.title | t}}</option>}</select></label>
 <label class="block">{{ 'a.shop' | t }}<select class="field mt-2" name="product" #productSelect [value]="selected()" (change)="selected.set(productSelect.value);done.set(false)">@for(product of products;track product.id){<option [value]="product.id">{{product.title | t}}</option>}</select></label>
 <label class="block">{{ 'a.goal' | t }}<textarea class="field mt-2" name="goal" #goalInput rows="4" required minlength="20" maxlength="600" [value]="goal()" (input)="goal.set(goalInput.value);done.set(false)"></textarea></label>
 <p id="plan-help" class="text-sm text-muted">{{ 'a.help' | t }} <span>{{goal().trim().length}} / 600</span></p><button class="primary" [disabled]="!valid()">{{ 'a.download' | t }} ↓</button>@if(done()){<p role="status" class="text-success">{{ 'a.done' | t }}</p>}
 </form></section>
`})
export class Products {
 readonly i18n=inject(I18n);readonly paths=PATHS;readonly products=PRODUCTS;
 readonly name=signal('');readonly goal=signal('');readonly topic=signal('physics');readonly selected=signal('guide');readonly done=signal(false);
 readonly recommendation=computed(()=>PATHS.find(p=>p.id===this.topic())??PATHS[0]);
 readonly valid=computed(()=>validPlan(this.name(),this.goal(),this.topic(),this.selected()));
 download(event:Event){
  event.preventDefault(); if(!this.valid())return;
  const t=(key:string)=>this.i18n.t(key);const product=PRODUCTS.find(p=>p.id===this.selected())!;
  const content=['HORIZONTE',t('a.form'),'',this.name().trim(),t(this.recommendation().title),this.goal().trim(),'',t('a.next'),t(this.recommendation().text),this.recommendation().url,'',t(product.title)+' — '+t('a.planned'),t('a.local')].join('\n');
  const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='horizonte-mission.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);this.done.set(true);
 }
}
