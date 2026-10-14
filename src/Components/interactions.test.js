import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChatPill from './ChatPill/ChatPill';
import QA from './QA/QA';
import GiftCard from './GiftCard/GiftCard';
import PhotoSlider from './PhotoSlider/PhotoSlider';
import PhotoTextSlider from './PhotoTextSlider/PhotoTextSlider';
import VimeoTeaser from './ServiceCard/VimeoTeaser';
import ContactForm from './ContactForm/ContactForm';
import Service from './Service/Service';

test('chat stays open when its input is clicked and closes outside', () => {
  render(<ChatPill />);
  fireEvent.click(screen.getByRole('button', {name:'Open chat'}));
  fireEvent.mouseDown(screen.getByRole('textbox'));
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox'), {target:{value:'Hello'}});
  expect(screen.getByRole('textbox')).toHaveValue('Hello');
  fireEvent.mouseDown(document.body);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
test('FAQ opens one answer and closes it on second click', () => {
  render(<QA height={300} items={[{q:'First?',a:'A',content:'First answer'}, {q:'Second?',a:'B',content:'Second answer'}]} />);
  fireEvent.click(screen.getByRole('button',{name:'First? A'}));
  expect(screen.getByText('First answer')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Second? B'}));
  expect(screen.queryByText('First answer')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Second? B'}));
  expect(screen.queryByText('Second answer')).not.toBeInTheDocument();
});
test('gift options change the displayed price', () => {
  render(<GiftCard />);
  expect(screen.getByText('570$')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'option 2'}));
  expect(screen.getByText('670$')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'option 1'}));
  expect(screen.getByText('570$')).toBeInTheDocument();
});
const photos = Array.from({length:5},(_,id)=>({id,src:`${id}.jpg`,alt:`Photo ${id}`}));
test('photo slider stops at both desktop boundaries', () => {
  render(<PhotoSlider photos={photos} />);
  expect(screen.getByRole('button',{name:'Previous'})).toBeDisabled();
  fireEvent.click(screen.getByRole('button',{name:'Next'}));
  fireEvent.click(screen.getByRole('button',{name:'Next'}));
  expect(screen.getByRole('button',{name:'Next'})).toBeDisabled();
  fireEvent.click(screen.getByRole('button',{name:'Previous'}));
  expect(screen.getByRole('button',{name:'Next'})).toBeEnabled();
});
test('mobile photo slider reaches the final photo', () => {
  const previousWidth=window.innerWidth;
  window.innerWidth=390;
  const {container,unmount}=render(<PhotoSlider photos={photos} />);
  const viewport=container.querySelector('.viewport');
  for(let i=0;i<4;i++) {
    fireEvent.touchStart(viewport,{touches:[{clientX:200}]});
    fireEvent.touchEnd(viewport,{changedTouches:[{clientX:50}]});
  }
  expect(container.querySelector('.track').style.transform).toBe('translateX(-400%)');
  unmount(); window.innerWidth=previousWidth;
});
test('video iframe loads only after play', () => {
  render(<VimeoTeaser preview="preview.jpg" vimeoId="123" />);
  expect(screen.queryByTitle('Vimeo video')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'play'}));
  expect(screen.getByTitle('Vimeo video')).toHaveAttribute('src','https://player.vimeo.com/video/123?autoplay=1');
});
test('form preserves all entered values', () => {
  render(<ContactForm />);
  screen.getAllByRole('textbox').forEach((input,i)=>fireEvent.change(input,{target:{value:`Value ${i}`}}));
  screen.getAllByRole('textbox').forEach((input,i)=>expect(input).toHaveValue(`Value ${i}`));
});
test('service links use the canonical detail route even in another home section', () => {
  render(<MemoryRouter initialEntries={['/']}><Service /></MemoryRouter>);
  screen.getAllByRole('link').forEach(link=>expect(link).toHaveAttribute('href','/service/headshots'));
});
test('photo text dots and swipes navigate; empty galleries render nothing', () => {
  const {container,rerender}=render(<PhotoTextSlider slides={photos.map(p=>({...p,image:p.src,name:p.alt}))} />);
  fireEvent.click(screen.getByRole('button',{name:'Slide 3'}));
  expect(container.querySelector('section').style.getPropertyValue('--i')).toBe('3');
  fireEvent.touchStart(container.querySelector('section'),{touches:[{clientX:200,clientY:0}]});
  fireEvent.touchEnd(container.querySelector('section'),{changedTouches:[{clientX:50,clientY:0}]});
  expect(container.querySelector('section').style.getPropertyValue('--i')).toBe('4');
  rerender(<PhotoTextSlider slides={[]} />);
  expect(container).toBeEmptyDOMElement();
});
