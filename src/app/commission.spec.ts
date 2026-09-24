import { TestBed } from '@angular/core/testing';
import { CommissionInput, CommissionStore, commissionError } from './commission.store';
import { Discovery } from './models';

const image:Discovery={id:'test-1',title:'An inspiration',description:'',image:'https://example.com/image.jpg',date:'2026-01-01',center:'NASA'};
const valid:CommissionInput={name:'  Ana Silva  ',email:' ana@example.com ',size:'30x40',style:'abstract',description:'  Uma pintura com tons azuis e formas suaves.  '};
describe('Custom art requests',()=>{
 beforeEach(()=>{localStorage.clear();TestBed.configureTestingModule({});});
 afterEach(()=>vi.restoreAllMocks());
 it('requires an inspiration, valid contact, known size and style, and a meaningful description',()=>{
  expect(commissionError(valid,true)).toBe('');expect(commissionError(valid,false)).toBe('commission.errorImage');
  expect(commissionError({...valid,name:'   '},true)).toBe('commission.errorName');
  for(const email of ['bad','a@b','a b@example.com'])expect(commissionError({...valid,email},true)).toBe('commission.errorEmail');
  expect(commissionError({...valid,size:'fake'},true)).toBe('commission.errorSize');
  expect(commissionError({...valid,style:'fake'},true)).toBe('commission.errorStyle');
  for(const description of [' '.repeat(30),'x'.repeat(19),'x'.repeat(1501)])expect(commissionError({...valid,description},true)).toBe('commission.errorDescription');
 });
 it('stores a trimmed snapshot, restores it, and deletes it without touching the old diary',()=>{
  localStorage.setItem('horizonte.entries','[{"body":"Original note"}]');
  const store=TestBed.inject(CommissionStore);const value={...valid};const draft=store.add(value,image)!;
  value.description='A later change';expect(draft.description).toBe(valid.description.trim());expect(draft.email).toBe('ana@example.com');
  const restored=new CommissionStore();expect(restored.count()).toBe(1);expect(restored.drafts()[0].discoveryId).toBe(image.id);
  restored.remove(draft.id);expect(new CommissionStore().count()).toBe(0);expect(localStorage.getItem('horizonte.entries')).toContain('Original note');
 });
 it('rejects invalid requests even when the store is called directly',()=>{
  const store=TestBed.inject(CommissionStore);expect(store.add({...valid,email:'bad'},image)).toBeNull();expect(store.count()).toBe(0);
 });
 it('ignores corrupt storage and incomplete objects',()=>{
  localStorage.setItem('horizonte.commissions','[{},null,17]');expect(new CommissionStore().count()).toBe(0);
  localStorage.setItem('horizonte.commissions','bad JSON');expect(new CommissionStore().count()).toBe(0);
 });
 it('retains a session draft and reports storage failure',()=>{
  const store=TestBed.inject(CommissionStore);vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('blocked');});
  expect(store.add(valid,image)).not.toBeNull();expect(store.count()).toBe(1);expect(store.storageError()).toBe(true);
 });
});
