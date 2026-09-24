import { validPlan } from './side-a';
describe('Explorer plan validation',()=>{
 it('rejects whitespace, short goals and unknown catalog choices',()=>{
  expect(validPlan('  ','A meaningful goal for my mission','physics','guide')).toBe(false);
  expect(validPlan('Ana','  short  ','physics','guide')).toBe(false);
  expect(validPlan('Ana','A meaningful goal for my mission','injected','guide')).toBe(false);
  expect(validPlan('Ana','A meaningful goal for my mission','physics','unavailable')).toBe(false);
 });
 it('accepts trimmed input and enforces upper bounds',()=>{
  expect(validPlan(' Ana ',' A meaningful goal for my mission ','engineering','kit')).toBe(true);
  expect(validPlan('a'.repeat(81),'A meaningful goal for my mission','physics','guide')).toBe(false);
  expect(validPlan('Ana','x'.repeat(601),'physics','guide')).toBe(false);
 });
});
