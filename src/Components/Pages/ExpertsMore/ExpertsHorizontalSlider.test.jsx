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
