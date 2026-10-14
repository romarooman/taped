import { act, fireEvent, renderHook } from '@testing-library/react';
import useWheel from './useWheel';
import useTouch from './useTouch';

beforeEach(()=>jest.useFakeTimers());
afterEach(()=>jest.useRealTimers());
test('wheel already consumed by nested gallery does not change page',()=>{
  const next=jest.fn(),prev=jest.fn();
  renderHook(()=>useWheel({next,prev}));
  const event=new WheelEvent('wheel',{deltaY:100,cancelable:true});
  event.preventDefault(); fireEvent(window,event);
  expect(next).not.toHaveBeenCalled();
});
test('wheel accumulates small deltas, locks transitions and removes listener',()=>{
  const next=jest.fn(),prev=jest.fn();
  const {unmount}=renderHook(()=>useWheel({next,prev}));
  fireEvent.wheel(window,{deltaY:40}); expect(next).not.toHaveBeenCalled();
  fireEvent.wheel(window,{deltaY:40}); expect(next).toHaveBeenCalledTimes(1);
  fireEvent.wheel(window,{deltaY:100}); expect(next).toHaveBeenCalledTimes(1);
  act(()=>jest.advanceTimersByTime(800));
  fireEvent.wheel(window,{deltaY:-100}); expect(prev).toHaveBeenCalledTimes(1);
  unmount(); act(()=>jest.advanceTimersByTime(800));
  fireEvent.wheel(window,{deltaY:100}); expect(next).toHaveBeenCalledTimes(1);
});
test('wheel preserves inner scrolling until its boundary',()=>{
  const next=jest.fn(),prev=jest.fn();
  renderHook(()=>useWheel({next,prev}));
  const el=document.createElement('div'); el.dataset.innerScroll='true';
  Object.defineProperties(el,{scrollHeight:{value:500},clientHeight:{value:100}});
  document.body.appendChild(el);
  fireEvent.wheel(el,{deltaY:100}); expect(next).not.toHaveBeenCalled();
  el.scrollTop=400;
  fireEvent.wheel(el,{deltaY:-100}); expect(prev).not.toHaveBeenCalled();
  fireEvent.wheel(el,{deltaY:100}); expect(next).toHaveBeenCalledTimes(1);
  el.remove();
});
test('touch ignores short gestures, supports both directions and locks transitions',()=>{
  const next=jest.fn(),prev=jest.fn();
  const {unmount}=renderHook(()=>useTouch({next,prev}));
  const swipe=(start,end)=>{
    fireEvent.touchStart(window,{touches:[{clientY:start}]});
    fireEvent.touchEnd(window,{changedTouches:[{clientY:end}]});
  };
  swipe(100,90); expect(next).not.toHaveBeenCalled();
  swipe(200,0); swipe(200,0); expect(next).toHaveBeenCalledTimes(1);
  act(()=>jest.advanceTimersByTime(800));
  swipe(0,200); expect(prev).toHaveBeenCalledTimes(1);
  unmount(); swipe(0,200); expect(prev).toHaveBeenCalledTimes(1);
});
