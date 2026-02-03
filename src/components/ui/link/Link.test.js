import { TextEncoder, TextDecoder } from "util";
import "fast-text-encoding";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { render, screen } from "@testing-library/react";
import Link from "./Link";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Link component", () => {
  test("render Link component and show text", () => {
    renderWithRouter(<Link href="/test">Test Link</Link>);
    const linkElement = screen.getByText(/test link/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render outer link for external link", () => {
    render(<Link href="https://example.com">External</Link>);
    const linkElement = screen.getByRole("link", { name: /external/i });
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("render inner link for internal link", () => {
    renderWithRouter(<Link href="/internal">Internal</Link>);
    const linkElement = screen.getByRole("link", { name: /internal/i });
    expect(linkElement).toHaveAttribute("href", "/internal");
  });

  test("adds disabled attribute when disabled prop is true", () => {
    renderWithRouter(
      <Link href="/test" disabled>
        Disabled
      </Link>
    );
    const linkElement = screen.getByRole("link", { name: /disabled/i });
    expect(linkElement).toHaveClass("disabled");
  });
});
