export function translitText(text: string) {
    const transliterationMap: { [key: string]: string } = {
        A: "А",
        B: "Б",
        V: "В",
        G: "Г",
        "G'": "Ғ",
        "G‘": "Ғ",
        "G`": "Ғ",
        "G’": "Ғ",
        D: "Д",
        E: "Е",
        J: "Ж",
        Z: "З",
        I: "И",
        Y: "Й",
        K: "К",
        L: "Л",
        M: "М",
        N: "Н",
        O: "О",
        "O'": "Ў",
        "O‘": "Ў",
        "O`": "Ў",
        "O’": "Ў",
        P: "П",
        R: "Р",
        T: "Т",
        U: "У",
        F: "Ф",
        Q: "Қ",
        Sh: "Ш",
        SH: "Ш",
        Ch: "Ч",
        CH: "Ч",
        S: "С",
        H: "Ҳ",
        X: "КС",
        "`": "ь",
        "'": "ь",
        "‘": "ь",
        "’": "ь",
        я: "ya",
        ю: "yu",
        ё: "yo",
        е: "ye",
        Я: "ya",
        Ю: "yu",
        Ё: "yo",
        Е: "ye",
        e: "е",
        y: "й",
        u: "у",
        k: "к",
        э: "е",
        n: "н",
        "g'": "ғ",
        "g‘": "ғ",
        "g`": "ғ",
        "g’": "ғ",
        g: "г",
        sh: "ш",
        "o'": "ў",
        "o‘": "ў",
        "o`": "ў",
        "o’": "ў",
        o: "о",
        z: "з",
        f: "ф",
        q: "қ",
        v: "в",
        a: "а",
        p: "п",
        r: "р",
        l: "л",
        d: "д",
        j: "ж",
        h: "ҳ",
        ch: "ч",
        s: "с",
        m: "м",
        i: "и",
        t: "т",
        b: "б",
        x: "кс",
        Х: "КС",
        х: "кс",
        KH: "КС",
        Kh: "Кс",
        kh: "кс",
    };

    const str = text.split("");

    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i];
        const nextChar = str[i + 1];
        const twoChars = currentChar + nextChar;

        if (transliterationMap[twoChars]) {
            str[i] = transliterationMap[twoChars];
            str.splice(i + 1, 1);
        } else if (transliterationMap[currentChar]) {
            str[i] = transliterationMap[currentChar];
        }
    }

    return str.join("");
}
