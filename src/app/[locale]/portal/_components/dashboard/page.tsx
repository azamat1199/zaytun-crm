"use client";
import React from "react";
import { ArrowRightIcon, UserIcon } from "@zaytun/components";
import cx from "classnames";
import ContentLayout from "@/components/layouts/ContentLayout";
import { Checkbox } from "@/components/checkbox/Checkbox";
import StatusTag from "@/components/status-tag/StatusTag";
import { Table } from "@/components/table/table";
import useFilter from "@/hooks/useFilter";
import { RowData, Column, ActivityRowData, ActivityColumn } from "./type";

const taskFakeData: RowData[] = [
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        id: "00012313",
        taskName: "Открытие карты",
        process: "Открытие карты",
        responsible: "Икрамов Саитула Тохирович",
        deadline: "Крайний срок",
        taskPriority: "Высокий",
        sla: "20 часов",
        status: "В обработке",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        id: "00012313",
        taskName: "Открытие карты",
        process: "Открытие карты",
        responsible: "Икрамов Саитула Тохирович",
        deadline: "Крайний срок",
        taskPriority: "Обычный",
        sla: "2 дня",
        status: "Новый",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        id: "00012313",
        taskName: "Открытие карты",
        process: "Открытие карты",
        responsible: "Икрамов Саитула Тохирович",
        deadline: "Крайний срок",
        taskPriority: "Низкий",
        sla: "2 дня",
        status: "Завершен",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        id: "00012313",
        taskName: "Открытие карты",
        process: "Открытие карты",
        responsible: "Икрамов Саитула Тохирович",
        deadline: "Крайний срок",
        taskPriority: "Низкий",
        sla: "2 дня",
        status: "Просроченный",
    },
];
const taskColumns: Column[] = [
    {
        headerName: (
            <div className="flex items-center">
                <Checkbox label={null} name={"created"} checked={null} />
                <span>Дата создания</span>
            </div>
        ),
        field: "created_data",
        width: 200,
        renderCell: (row) => {
            return (
                <div className="flex items-center">
                    <Checkbox label={null} name={"created"} checked={null} />
                    <div className="flex flex-col">
                        <span>{row.created_data.created_time}</span>
                        <span>{row.created_data.created_date}</span>
                    </div>
                </div>
            );
        },
    },
    {
        headerName: (
            <div className="flex items-center">
                <span>ID</span>
            </div>
        ),
        field: "id",
        width: 185,
        renderCell: (row) => {
            return (
                <div className="flex">
                    <div className="flex flex-col">
                        <span>{row.id}</span>
                    </div>
                </div>
            );
        },
    },
    {
        headerName: "Название задачи",
        field: "taskName",
        width: 200,
    },
    {
        headerName: "Процесс",
        field: "process",
        width: 200,
    },

    {
        headerName: "Ответственный",
        field: "responsible",
        width: 200,
    },
    {
        headerName: "Крайний срок",
        field: "deadline",
        width: 200,
    },
    {
        headerName: "Приоритет задачи ",
        field: "taskPriority",
        width: 165,
        renderCell: (row) => {
            return (
                <div>
                    <StatusTag
                        variant={cx({
                            canceled: "Высокий" === row?.taskPriority,
                            success: "Низкий" === row?.taskPriority,
                            passive: "Обычный" === row?.taskPriority,
                        })}
                        value={row.taskPriority}
                    />
                </div>
            );
        },
    },
    {
        headerName: "SLA",
        field: "sla",
        width: 160,
        renderCell: (row) => {
            return (
                <div>
                    <StatusTag
                        variant={cx({
                            canceled: "20 часов" === row?.sla,
                            success: "2 дня" === row?.sla,
                        })}
                        value={row.sla}
                    />
                </div>
            );
        },
    },
    {
        headerName: "Статус",
        field: "status",
        width: 180,
        renderCell: (row) => {
            return (
                <div>
                    <StatusTag
                        variant={cx({
                            success: "Новый" === row.status,
                            process: "В обработке" === row.status,
                            passive: "Завершен" === row.status,
                        })}
                        value={row.status}
                    />
                </div>
            );
        },
    },
    {
        headerName: "",
        field: "action",
        width: 80,
        renderCell: () => <ArrowRightIcon color="#130F26" />,
    },
];

const activityFakeData: ActivityRowData[] = [
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        login: "Джалол Уткиров",
        ip: "5.205.98.69",
        macAddress: "da:a1:19:0:0:0",
        act: "Амир Тураев добавил(а) номер телефона в Карточка клиента",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        login: "Джалол Уткиров",
        ip: "5.205.98.69",
        macAddress: "da:a1:19:0:0:0",
        act: "Амир Тураев добавил(а) номер телефона в Карточка клиента",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        login: "Джалол Уткиров",
        ip: "5.205.98.69",
        macAddress: "da:a1:19:0:0:0",
        act: "Амир Тураев добавил(а) номер телефона в Карточка клиента",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        login: "Джалол Уткиров",
        ip: "5.205.98.69",
        macAddress: "da:a1:19:0:0:0",
        act: "Амир Тураев добавил(а) номер телефона в Карточка клиента",
    },
    {
        created_data: {
            created_date: "12.09.2023",
            created_time: "09:14:28",
        },
        login: "Джалол Уткиров",
        ip: "5.205.98.69",
        macAddress: "da:a1:19:0:0:0",
        act: "Амир Тураев добавил(а) номер телефона в Карточка клиента",
    },
];
const activityColumns: ActivityColumn[] = [
    {
        headerName: (
            <div className="flex items-center">
                <Checkbox label={null} name={"created"} checked={null} />
                <span>Дата создания</span>
            </div>
        ),
        field: "created_data",
        width: 310,
        renderCell: (row) => {
            return (
                <div className="flex items-center">
                    <Checkbox label={null} name={"created"} checked={null} />
                    <div className="flex flex-col">
                        <span>{row.created_data.created_time}</span>
                        <span>{row.created_data.created_date}</span>
                    </div>
                </div>
            );
        },
    },
    {
        headerName: "Логин",
        field: "login",
        width: 305,
    },
    {
        headerName: "IP",
        field: "ip",
        width: 300,
    },
    {
        headerName: "MAC-Адрес",
        field: "macAddress",
        width: 300,
    },

    {
        headerName: "Действие",
        field: "act",
        width: 550,
    },
];

const employeeFakeData: any[] = [
    {
        fio: {
            name: "Джалол Уткиров",
            job_title: "Гл.Администратор",
        },
        department: "Финансы",
        extensionNumber: "55414893",
        email: "youremail@gmail.com",
        status: "Нет на месте",
    },
    {
        fio: {
            name: "Джалол Уткиров",
            job_title: "Гл.Администратор",
        },
        department: "Финансы",
        extensionNumber: "55414893",
        email: "youremail@gmail.com",
        status: "Онлайн",
    },
    {
        fio: {
            name: "Джалол Уткиров",
            job_title: "Гл.Администратор",
        },
        department: "Финансы",
        extensionNumber: "55414893",
        email: "youremail@gmail.com",
        status: "В отпуске",
    },
];
const employeeColumns: any[] = [
    {
        headerName: (
            <div className="flex items-center">
                <Checkbox label={null} name={"created"} checked={null} />
                <span>ФИО/Должность</span>
            </div>
        ),
        field: "fio",
        width: 410,
        renderCell: (row: any) => {
            return (
                <div className="flex items-center">
                    <Checkbox label={null} name={"created"} checked={null} />
                    <div className="flex gap-3 items-center">
                        <UserIcon />
                        <div className="flex flex-col">
                            <span>{row.fio.name}</span>
                            <span>{row.fio.job_title}</span>
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        headerName: "Департамент",
        field: "department",
        width: 400,
    },
    {
        headerName: "Внутренний номер",
        field: "extensionNumber",
        width: 400,
    },
    {
        headerName: "Email",
        field: "email",
        width: 400,
    },

    {
        headerName: "Статус",
        field: "status",
        width: 150,
        renderCell: (row: any) => {
            return (
                <div>
                    <StatusTag
                        variant={cx({
                            success: "Онлайн" === row.status,
                            process: "Нет на месте" === row.status,
                            passive: "В отпуске" === row.status,
                        })}
                        value={row.status}
                    />
                </div>
            );
        },
    },
];

export default function Page() {
    const { replaceQuery } = useFilter({});

    return (
        <ContentLayout title="Продукты">
            <div>Chart</div>
            <div className="flex flex-col gap-6">
                <h2 className="text-[#101828] text-[32px] leading-10 tracking-[-0.64px] font-medium">
                    Мои задачи
                </h2>
                <Table
                    columns={taskColumns}
                    list={taskFakeData}
                    onSearch={(ev: any) => replaceQuery({ query: ev })}
                    onTabChange={(ev: any) => replaceQuery({ tab: ev })}
                    withHeader={true}
                    withSearch={true}
                    withConfig={true}
                    onFilter
                    withExport
                    tabs={[
                        "Все",
                        "Новый",
                        "В работе",
                        "Просроченые",
                        "Завершенный",
                    ]}
                    searchPlaceholder={"Поиск"}
                    useFilter={useFilter}
                />
            </div>
            <div className="flex flex-col gap-6 pt-20">
                <h2 className="text-[#101828] text-[32px] leading-10 tracking-[-0.64px] font-medium">
                    Мои активности
                </h2>
                <Table
                    columns={activityColumns}
                    list={activityFakeData}
                    onSearch={(ev: any) => replaceQuery({ query: ev })}
                    onTabChange={(ev: any) => replaceQuery({ tab: ev })}
                    withHeader={true}
                    withSearch={true}
                    withConfig={true}
                    onFilter
                    withExport
                    tabs={[
                        "Все",
                        "Новый",
                        "В работе",
                        "Просроченые",
                        "Завершенный",
                    ]}
                    searchPlaceholder={"Поиск"}
                    useFilter={useFilter}
                />
            </div>
            <div className="flex flex-col gap-6 pt-20">
                <h2 className="text-[#101828] text-[32px] leading-10 tracking-[-0.64px] font-medium">
                    Сотрудники
                </h2>
                <Table
                    columns={employeeColumns}
                    list={employeeFakeData}
                    onSearch={(ev: any) => replaceQuery({ query: ev })}
                    onTabChange={(ev: any) => replaceQuery({ tab: ev })}
                    withHeader={true}
                    withSearch={true}
                    withConfig={true}
                    onFilter
                    withExport
                    tabs={[
                        "Все",
                        "Новый",
                        "В работе",
                        "Просроченые",
                        "Завершенный",
                    ]}
                    searchPlaceholder={"Поиск"}
                    useFilter={useFilter}
                />
            </div>
        </ContentLayout>
    );
}
