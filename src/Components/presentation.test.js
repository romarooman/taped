import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ImagesOnly from './ImagesOnly/ImagesOnly';
import ImagesListColumn from './ImagesListColumn/ImagesListColumn';
import ImagesListRow from './ImagesListRow/ImagesListRow';
import Bottom from './Bottom/Bottom';
import MoskData from './MoskData/MoskData';
import Location from './Location/Location';
import HorizontalScroll from './HorizontScroll/HorizontalScroll';
import ScrollToGiftCard from './Helper/ScrollToGiftCard';
import BookAShootButton from './BookAShootButton/BookAShootButton';
import MobileCta from './MobileCta/MobileCta';
import TableIncluded from './ServiceCard/TableIncluded';

test.each([ImagesOnly,ImagesListColumn,ImagesListRow])('%p renders supplied images',Component=>{
  const {container}=render(<Component one="one.jpg" brands="brands.jpg" fimage="image.jpg" title="Title" subtitle="Subtitle" />);
  expect(container.querySelector('img[src]')).toBeInTheDocument();
});
test.each([Bottom,MoskData])('%p displays its title',Component=>{
  render(<Component title="Custom title" />); expect(screen.getByRole('heading',{name:'Custom title'})).toBeInTheDocument();
});
test('location displays supplied contact details',()=>{
  render(<Location email="studio@example.com" street="Test street" city="Test city" />);
  expect(screen.getAllByText('studio@example.com')).toHaveLength(2);
  expect(screen.getAllByText('Test street')).toHaveLength(2);
});
test('included table renders custom items',()=>{
  render(<TableIncluded items={['First benefit','Second benefit']} activeIndex={0} />);
  expect(screen.getByText('First benefit')).toHaveClass('active');
  expect(screen.getByText('Second benefit')).not.toHaveClass('active');
});
test.each([BookAShootButton,MobileCta])('%p scrolls to the requested target',Component=>{
  const {container}=render(<><Component targetId="target" /><div id="target" /></>);
  const scroll=jest.spyOn(container.querySelector('#target'),'scrollIntoView');
  fireEvent.click(screen.getByRole('button'));
  expect(scroll).toHaveBeenCalledWith({behavior:'smooth',block:'start'});
  scroll.mockRestore();
});
test.each(['/service','/contacts','/community','/'])('legacy scroll helper handles %s',path=>{
  window.scrollTo.mockClear(); Element.prototype.scrollIntoView.mockClear();
  render(<MemoryRouter initialEntries={[path]}><div id={path.slice(1)} /><ScrollToGiftCard /></MemoryRouter>);
  if(path==='/') expect(window.scrollTo).toHaveBeenCalled();
  else expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
});
test('legacy horizontal gallery renders children and responds to resize',()=>{
  const {container}=render(<HorizontalScroll><p>First</p><p>Second</p></HorizontalScroll>);
  expect(screen.getByText('First')).toBeInTheDocument();
  fireEvent(window,new Event('resize'));
  expect(container.querySelector('section').style.height).toBe(`${window.innerHeight-96}px`);
});
