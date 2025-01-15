import { expect, test, vi, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ZTextField from "./ZTextField";
import TableSearchIcon from "@/components/icons/TableSearchIcon";

const handleChange = vi.fn();

const setup = () => {
    const utils = render(
        <ZTextField
            onChange={handleChange}
            placeholder="placeholder"
            helperText="helpertext"
            startIcon={<TableSearchIcon />}
            name="firstName"
            label="Something"
        />,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText("placeholder");
    const inputContainer: HTMLDivElement = screen.getByRole("group");
    return {
        input,
        inputContainer,
        ...utils,
    };
};

describe("ZTextField tests", () => {
    test("Render label successfully", () => {
        render(<ZTextField label="label" />);
        expect(screen.getByText("label")).toBeDefined();
    });

    test("Render placeholder successfully", () => {
        render(<ZTextField placeholder="placeholder" />);
        expect(screen.getByPlaceholderText("placeholder")).toBeDefined();
    });

    test("Render helperText successfully", () => {
        render(<ZTextField helperText="helperText" />);
        expect(screen.getByText("helperText")).toBeDefined();
    });

    test("Onchange event works successfully", () => {
        const inputValue = "mock";
        const { input } = setup();
        fireEvent.change(input, { target: { value: inputValue } });

        expect(input.value).toBe(inputValue);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("Render helper text successfully", () => {
        setup();
        const p = screen.getByText("helpertext");
        expect(p).toBeDefined();
    });

    test("Render startIcon successfully", () => {
        setup();
        const startIcon = screen.getByRole("presentation");
        expect(startIcon).toBeDefined();
    });

    test("Render endIcon successfully", () => {
        setup();
        const endIcon = screen.getByRole("presentation");
        expect(endIcon).toBeDefined();
    });

    test("renders correctly", () => {
        const { inputContainer } = setup();
        expect(inputContainer).toMatchSnapshot();
    });
});
