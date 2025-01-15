const inputLetter = (e) => {
    if (e) {
        return e.replace(/[^a-zA-Z-а-яА-Я]/gi, "");
    }
    return "";
};
export default inputLetter;

export const phoneMaskUz = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/^(\d{3})/, "+$1")
            .replace(/(\d{3})(\d{2})/, "$1 ($2) ")
            .replace(/(\d{3})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
    return "";
};
export const phoneMaskRu = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/^(\d)/, "+$1")
            .replace(/(\d)(\d{3})/, "$1 ($2) ")
            .replace(/(\d{3})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
    return "";
};
export const phoneMaskKz = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/^(\d)/, "+$1")
            .replace(/(\d)(\d{4})/, "$1 ($2) ")
            .replace(/(\d{4})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
    return "";
};

export const passport = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d{1,5})/, "$1-$2")
            .replace(/(-\d{7})\d+?$/, "$1");
    }
    return "";
};
export const cardNumber = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/(\d{4})(\d{1,3})/, "$1-$2")
            .replace(/(\d{4})(\d{1,3})/, "$1-$2")
            .replace(/(\d{4})(\d{1,3})/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }
    return "";
};
export const cardDate = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d{1,3})/, "$1/$2")
            .replace(/(\/\d{2})\d+?$/, "$1");
    }
    return "";
};
export const inn = (e) => {
    if (e) {
        return e
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d{1,3})/, "$1-$2")
            .replace(/(-\d{6})\d+?$/, "$1");
    }
    return "";
};
export const email = (e) => {
    if (e) {
        return e.replace(/^\S+@\S+\.\S+$/i, "");
    }
    return "";
};

export const clearSymbols = (text) => {
    return text
        .replace(/\s/g, "")
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\+/g, "");
};

export const patternType = {
    AMOUNT: "amount",
    PERCENT: "percent",
};

export const amountPattern = (ev, type = patternType.AMOUNT) => {
    let inputValue = ev.target.value;
    const lastChar = inputValue[inputValue.length - 5];

    if (ev.nativeEvent.inputType === "deleteContentBackward") {
        if (lastChar === ".") {
            return inputValue.slice(0, -1);
        } else {
            return inputValue;
        }
    }

    if (inputValue.split(".").length > 2) {
        const [integerPart, decimalPart] = inputValue.split(".");
        inputValue = integerPart + "." + decimalPart;
    }

    inputValue = inputValue.replace(/[^0-9.]/g, "");
    if (type === patternType.AMOUNT) {
        if (inputValue.indexOf(".") === -1) {
            inputValue = inputValue.replace(/^((\d{12})+)$/, "$1.");
        }

        inputValue = inputValue.replace(/(\.(\d{2})).*/, "$1");
    }
    if (type === patternType.PERCENT) {
        if (inputValue.indexOf(".") === -1) {
            inputValue = inputValue.replace(/(\d{2})(\d{1,3})/, "$1.$2");
        }
        inputValue = inputValue.replace(/(.\d{3})\d+?$/, "$1");
    }

    return inputValue;
};
