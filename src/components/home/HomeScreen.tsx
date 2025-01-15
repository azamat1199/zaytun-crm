"use client";
import Card from "@/components/cards/card";
import { Routes } from "@/constants/routeConstants";
import {
    PolarAreaChart,
    Select,
    TButton,
    UnderlineTabs,
} from "@zaytun/components";
import { useRouter } from "next/navigation";
export interface ListItem {
    value: string;
    label: string;
    notification?: number;
}

export const productTab: ListItem[] = [
    { value: "active", label: "Активные" },
    { notification: 2, value: "archive", label: "Архивные" },
];

export const productCard = [
    { id: "finance", title: "Финансирование", amount: 44 },
    { id: "carts", title: "Карты", amount: 44 },
    { id: "depozits", title: "Депозиты", amount: 44 },
    { id: "more", title: "Другие", amount: 44 },
];
const servicesCard = [
    { id: "1", title: "Справки", amount: 44 },
    { id: "2", title: "Анкеты", amount: 44 },
    { id: "3", title: "Кассовые операции", amount: 44 },
    { id: "4", title: "Другие", amount: 44 },
];

const tasks = [
    { id: 1, category: "Карты", queue: "K-2" },
    { id: 2, category: "Карты", queue: "K-3" },
    { id: 3, category: "Финансирование", queue: "KP-4" },
    { id: 4, category: "Вклады", queue: "B-5" },
    { id: 5, category: "Финансирование", queue: "KP-6" },
    { id: 6, category: "Оплата", queue: "O-7" },
    { id: 7, category: "Карты", queue: "K-2" },
];

const HomeScreen = () => {
    const history = useRouter();

    return (
        <div>
            <UnderlineTabs
                data={productTab}
                onChange={(item) => {
                    console.log("itemmm", item);
                }}
                active={{
                    label: "",
                    value: "",
                }}
            />
            <div className="flex items-center w-full justify-between pt-5 gap-5 flex-wrap">
                {productCard.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        className="flex-1"
                        handleClick={() => history.push(Routes.crmProducts)}
                    />
                ))}
            </div>
            <h1 className="text-black-700 text-[30px] font-medium mt-10">
                Услуги
            </h1>
            <UnderlineTabs
                data={productTab}
                onChange={(item) => {
                    console.log("itemmm", item);
                }}
                active={{
                    label: "",
                    value: "",
                }}
            />
            <div className="flex items-center w-full justify-between pt-5 gap-5 flex-wrap">
                {servicesCard.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        className="flex-1"
                        handleClick={(prop: any) => console.log(prop)}
                    />
                ))}
            </div>
            <h1 className="text-black-700 text-[30px] font-medium mt-10">
                Мои задачи
            </h1>
            {/* <Table
        // list={[...fakeDataArray, ...fakeDataArray]}
        requests={[]}
        // checkbox={true}
        columns={columns}
        withHeader={true}
        tabs={['Всё', 'Успешные', 'Повисшие', 'Неактивные']}
        onFilter={true}
        withFilter={true}
        withExport={true}
        withConfig={true}
        loader={false}
      /> */}
            <div className="flex flex-wrap gap-8 mt-12 mb-36">
                <div className="flex-1 border-[1px] rounded-[8px]">
                    <div className="flex items-center justify-between p-2">
                        <p className="text-xl font-semibold pl-2">
                            Статистика по моим задачам
                        </p>
                        <Select
                            data={[{ value: "1", label: "За день" }]}
                            // color="#027A48"
                        />
                    </div>
                    <hr />
                    <div className="pt-16">
                        <PolarAreaChart
                            simpleArea={true}
                            list={[
                                { value: 18, label: "Новые", color: "#DEEFFF" },
                                {
                                    label: "В обработке",
                                    value: 14,
                                    color: "#FCEBB0",
                                },
                                {
                                    label: "Завершенные",
                                    value: 16,
                                    color: "#FEDEF3",
                                },
                                {
                                    label: "Просроченные",
                                    value: 16,
                                    color: "#C3F7DE",
                                },
                            ]}
                            sumTitle={""}
                        />
                    </div>
                </div>
                <div className="flex-1 border-[1px] rounded-[8px]">
                    <div className="flex items-center justify-between p-2">
                        <p className="text-xl font-semibold pl-2">
                            Онлайн очередь (26 чел)
                        </p>
                        <Select
                            data={[
                                { value: "1", label: "Карти(42)" },
                                { value: "2", label: "Вклади(23)" },
                                { value: "3", label: "Финансирование(52)" },
                                { value: "4", label: "Оплати(5)" },
                            ]}
                            // color="#027A48"
                        />
                    </div>
                    <hr />
                    <div>
                        <div className="flex px-6 py-3">
                            <div className="flex-1 ">Категория</div>
                            <div className="flex-1">Номер билета</div>
                            <div className="flex-1"></div>
                        </div>
                        <hr />
                        <div className="flex px-6 py-3 h">
                            <div
                                className="flex flex-col overflow-auto h-[420px] hidden-scrollbar"
                                style={{ flex: 2 }}
                            >
                                {tasks.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex px-4 py-6"
                                    >
                                        <div className="flex-1">
                                            {item.category}
                                        </div>
                                        <div className="flex-1">
                                            {item.queue}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1">
                                <div className="w-full rounded-[12px] bg-[#e4e1e11a] px-[13px] py-[18px]">
                                    <p className="font-semibold text-sm">
                                        Сейчас обслуживается
                                    </p>
                                    <div className="w-full h-[185px] flex justify-center items-center">
                                        <p className="text-[64px] font-semibold">
                                            K-2
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        Категория
                                    </p>
                                    <hr />
                                    <p className="text-xl font-semibold">
                                        Карты
                                    </p>
                                </div>
                                <div className="w-full flex flex-col mt-2 gap-1">
                                    <TButton
                                        variant="filled"
                                        className="bg-primary h-[60px] text-xl"
                                    >
                                        Следующий
                                    </TButton>
                                    <TButton
                                        variant="text"
                                        className="text-[#787878] h-[46px] text-xs"
                                    >
                                        Вызвать повторно
                                    </TButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
