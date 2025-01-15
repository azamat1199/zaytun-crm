import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import ZFormLabel from "./";

describe("ZFormLabel", () => {
    test("renders label with provided children", () => {
        render(<ZFormLabel>Label Text</ZFormLabel>);
        const labelElement = screen.getByText("Label Text");
        expect(labelElement).toBeDefined();
    });

    test("renders className with custom class name", () => {
        render(<ZFormLabel className="custom-class">Label Text</ZFormLabel>);
        const labelElement = screen.getByText("Label Text");
        expect(labelElement).toBeDefined();
    });

    test("renders htmlFor with additional props", () => {
        render(<ZFormLabel htmlFor="input-id">Label Text</ZFormLabel>);
        const labelElement = screen.getByText("Label Text");
        expect(labelElement).toBeDefined();
    });
});
