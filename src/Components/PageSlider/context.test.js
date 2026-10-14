import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import Page from './Page';
import { PageSliderProvider, usePageSlider as useContextSlider } from './PageSliderContext';
import usePageSlider from './usePageSlider';
import usePageAnimation from './hooks/usePageAnimation';

test('Page exposes page identity and direction',()=>{
  render(<Page id="test" direction="horizontal"><p>Content</p></Page>);
  expect(screen.getByText('Content').parentElement).toHaveAttribute('data-page-id','test');
  expect(screen.getByText('Content').parentElement).toHaveAttribute('data-direction','horizontal');
});
test('context hooks return navigation and animation state',()=>{
  const value={state:{pageIndex:2},animationKey:'2-0'};
  const wrapper=({children})=><PageSliderProvider value={value}>{children}</PageSliderProvider>;
  const {result}=renderHook(()=>[usePageSlider(),useContextSlider(),usePageAnimation()],{wrapper});
  expect(result.current).toEqual([value,value,'2-0']);
});
test('animations outside the slider use a standalone key',()=>{
  const {result}=renderHook(()=>usePageAnimation());
  expect(result.current).toBe('standalone');
});
