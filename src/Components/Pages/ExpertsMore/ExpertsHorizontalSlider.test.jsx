import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import ExpertsHorizontalSlider from "./ExpertsHorizontalSlider";

jest.mock("../../ImagesListRow/ImagesListRow", () => () => null);

const sections = [{ title: "First" }, { title: "Second" }, { title: "Last" }];
const wheel = () => {
  const event = new WheelEvent("wheel", { deltaY: 100, cancelable: true });
  fireEvent(window, event);
  return event.defaultPrevented;
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('touch navigation supports both directions, cancellation and short swipes', () => {
  const {container}=render(<ExpertsHorizontalSlider sections={sections} />);
  const swipe=(start,end)=>{
    fireEvent.touchStart(window,{touches:[{clientY:start}]});
    fireEvent.touchMove(window,{touches:[{clientY:end}]});
    fireEvent.touchEnd(window,{changedTouches:[{clientY:end}]});
  };
  swipe(200,180);
  expect(container.querySelectorAll('[aria-hidden]')[0]).toHaveAttribute('aria-hidden','false');
  swipe(200,0);
  expect(container.querySelectorAll('[aria-hidden]')[1]).toHaveAttribute('aria-hidden','false');
  act(()=>jest.advanceTimersByTime(700));
  swipe(0,200);
  expect(container.querySelectorAll('[aria-hidden]')[0]).toHaveAttribute('aria-hidden','false');
  act(()=>jest.advanceTimersByTime(700));
  fireEvent.touchStart(window,{touches:[{clientY:200}]});
  fireEvent.touchCancel(window);
  fireEvent.touchEnd(window,{changedTouches:[{clientY:0}]});
  expect(container.querySelectorAll('[aria-hidden]')[0]).toHaveAttribute('aria-hidden','false');
});

test('empty slider does not intercept scrolling',()=>{
  const {container}=render(<ExpertsHorizontalSlider />);
  expect(container).toBeEmptyDOMElement();
  expect(wheel()).toBe(false);
});

test('slider away from top releases wheel and removes listeners on unmount',()=>{
  const {container,unmount}=render(<ExpertsHorizontalSlider sections={sections} />);
  container.querySelector('section').getBoundingClientRect=()=>({top:-100});
  expect(wheel()).toBe(false);
  unmount(); expect(wheel()).toBe(false);
});

test("consumes scroll through all slides and releases it after the final transition", () => {
  const { container } = render(<ExpertsHorizontalSlider sections={sections} />);
  const slides = () => [...container.querySelectorAll("[aria-hidden]")];
  expect(slides().map((slide) => slide.getAttribute("aria-hidden"))).toEqual([
    "false", "true", "true",
  ]);
  expect(wheel()).toBe(true);
  expect(wheel()).toBe(true);
  expect(slides()[1].getAttribute("aria-hidden")).toBe("false");
  act(() => jest.advanceTimersByTime(700));
  expect(wheel()).toBe(true);
  expect(slides()[2].getAttribute("aria-hidden")).toBe("false");
  expect(wheel()).toBe(true);
  act(() => jest.advanceTimersByTime(700));
  expect(wheel()).toBe(false);
});

test("starts at the first slide when the expert key changes", () => {
  const { container, rerender } = render(
    <ExpertsHorizontalSlider key="first-expert" sections={sections} />,
  );
  wheel();
  rerender(<ExpertsHorizontalSlider key="next-expert" sections={sections} />);
  expect(container.querySelector("[aria-hidden]").getAttribute("aria-hidden")).toBe("false");
  expect(wheel()).toBe(true);
});
