import { Injectable, computed, signal } from '@angular/core';
import { Discovery } from './models';

export const SIZES = ['30x40', '50x70', '70x100'] as const;
export const STYLES = ['abstract', 'cosmic', 'minimal'] as const;
export interface CommissionInput {
 name: string; email: string; size: string; style: string; description: string;
}
export interface CommissionDraft extends CommissionInput {
 id: string; createdAt: string; discoveryId: string; discoveryTitle: string;
}
export function commissionError(value: CommissionInput, hasInspiration: boolean): string {
 if(!hasInspiration) return 'commission.errorImage';
 if(value.name.trim().length<2 || value.name.trim().length>80) return 'commission.errorName';
 if(value.email.trim().length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim())) return 'commission.errorEmail';
 if(!SIZES.some(size=>size===value.size)) return 'commission.errorSize';
 if(!STYLES.some(style=>style===value.style)) return 'commission.errorStyle';
 if(value.description.trim().length<20 || value.description.trim().length>1500) return 'commission.errorDescription';
 return '';
}
@Injectable({providedIn:'root'})
export class CommissionStore {
 readonly drafts=signal<CommissionDraft[]>(this.read());
 readonly count=computed(()=>this.drafts().length);
 readonly storageError=signal(false);
 add(value:CommissionInput,discovery:Discovery):CommissionDraft|null {
  if(commissionError(value,!!discovery))return null;
  const draft:CommissionDraft={...value,name:value.name.trim(),email:value.email.trim(),description:value.description.trim(),id:crypto.randomUUID(),createdAt:new Date().toISOString(),discoveryId:discovery.id,discoveryTitle:discovery.title};
  this.drafts.update(items=>[draft,...items]);this.persist();return draft;
 }
 remove(id:string){this.drafts.update(items=>items.filter(item=>item.id!==id));this.persist();}
 private persist(){try{localStorage.setItem('horizonte.commissions',JSON.stringify(this.drafts()));this.storageError.set(false);}catch{this.storageError.set(true);}}
 private read():CommissionDraft[]{
  try{
   const items:unknown=JSON.parse(localStorage.getItem('horizonte.commissions')??'[]');
   if(!Array.isArray(items))return [];
   return items.filter((item):item is CommissionDraft=>{
    if(!item || typeof item!=='object')return false;
    const fields=['id','createdAt','discoveryId','discoveryTitle','name','email','size','style','description'];
    return fields.every(key=>typeof item[key]==='string') && !commissionError(item,true) && !!item.id && !!item.discoveryId && !Number.isNaN(Date.parse(item.createdAt));
   });
  }catch{return [];}
 }
}
