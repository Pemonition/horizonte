import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JournalStore } from './journal.store';
import { CommissionDraft, CommissionStore, SIZES, STYLES, commissionError } from './commission.store';
import { I18n, LocalDatePipe, TranslatePipe } from './i18n';

@Component({selector:'app-commission',imports:[FormsModule,RouterLink,TranslatePipe,LocalDatePipe],templateUrl:'./commission.html'})
export class Commission {
 readonly collection=inject(JournalStore);readonly orders=inject(CommissionStore);readonly i18n=inject(I18n);
 // The detail page can preselect a saved inspiration through this query parameter.
 readonly inspiracao=input('');readonly selected=signal<string|null>(null);
 readonly selectedId=computed(()=>this.selected() ?? this.inspiracao());
 readonly discovery=computed(()=>this.collection.saved().find(item=>item.id===this.selectedId()));
 readonly name=signal('');readonly email=signal('');readonly size=signal('');readonly style=signal('');readonly description=signal('');
 readonly success=signal(false);readonly pendingDelete=signal('');
 readonly sizes=SIZES;readonly styles=STYLES;
 readonly value=computed(()=>({name:this.name(),email:this.email(),size:this.size(),style:this.style(),description:this.description()}));
 readonly error=computed(()=>commissionError(this.value(),!!this.discovery()));
 readonly valid=computed(()=>!this.error());
 save(event:Event){
  event.preventDefault();const image=this.discovery();if(!this.valid()||!image)return;
  if(this.orders.add(this.value(),image)){
   this.description.set('');this.success.set(true);
  }
 }
 download(draft:CommissionDraft){
  const labels=this.i18n;
  const text=[
   'HORIZONTE — '+labels.t('commission.title'),labels.t('commission.notice'),'',
   labels.t('commission.name')+': '+draft.name,labels.t('commission.email')+': '+draft.email,
   labels.t('commission.image')+': '+draft.discoveryTitle,
   'https://images.nasa.gov/details/'+encodeURIComponent(draft.discoveryId),
   labels.t('commission.size')+': '+draft.size+' cm',labels.t('commission.style')+': '+labels.t('commission.style.'+draft.style),
   labels.t('commission.description')+':\n'+draft.description,'',labels.date(draft.createdAt,true),
  ].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='horizonte-'+draft.id+'.txt';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
}
