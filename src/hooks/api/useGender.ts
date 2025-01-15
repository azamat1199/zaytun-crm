const useGender = () => {
    return {
        options: [
            {
                label: "Мужской",
                value: "MALE",
            },
            { label: "Женский", value: "FEMALE" },
            { label: "НЕИЗВЕСТНЫЙ", value: "UNKNOWN" },
        ],
    };
};

export default useGender;
