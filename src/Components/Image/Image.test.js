import { render, screen } from "@testing-library/react";
import Image from "./Image";

test("image records preserve alt and cropping while retaining other styles", () => {
  const { rerender } = render(
    <Image src={{ src: "portrait.webp", alt: "Studio portrait", objectPosition: "center 30%" }} alt="fallback" style={{ borderRadius: 12 }} />,
  );
  const image = screen.getByRole("img", { name: "Studio portrait" });
  expect(image).toHaveAttribute("src", "portrait.webp");
  expect(image).toHaveStyle({ objectPosition: "center 30%", borderRadius: "12px" });
  rerender(<Image src={{ src: "decoration.webp", alt: "" }} alt="fallback" />);
  expect(image).toHaveAttribute("alt", "");
  expect(image.style.objectPosition).toBe("");
});

test("URL props remain supported for existing images and icons", () => {
  render(<Image src="icon.svg" alt="Next" loading="lazy" objectPosition="top" />);
  const image = screen.getByRole("img", { name: "Next" });
  expect(image).toHaveAttribute("src", "icon.svg");
  expect(image).toHaveAttribute("loading", "lazy");
  expect(image).toHaveStyle({ objectPosition: "top" });
});
