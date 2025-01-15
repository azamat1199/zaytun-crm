import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import ZCheckbox from "./";

describe("ZCheckbox", () => {
    test("Render label successfully", () => {
        render(<ZCheckbox label="label" />);
        expect(screen.getByText("label")).toBeDefined();
    });

    test("Render helperText successfully", () => {
        render(<ZCheckbox helperText="helperText" />);
        expect(screen.getByText("helperText")).toBeDefined();
    });

    test("Sets indeterminate state correctly", async () => {
        const { container, rerender } = render(
            <ZCheckbox label="Option 1" indeterminate={false} />,
        );

        let checkbox = container.querySelector(
            'input[type="checkbox"]',
        ) as HTMLInputElement;

        expect(checkbox).not.toBeNull();
        expect(checkbox.indeterminate).toBeFalsy();

        rerender(<ZCheckbox label="Option 1" indeterminate={true} />);

        checkbox = container.querySelector(
            'input[type="checkbox"]',
        ) as HTMLInputElement;

        expect(checkbox).not.toBeNull();
        expect(checkbox.indeterminate).toBeTruthy();
    });
});
