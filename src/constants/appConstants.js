import { FiCreditCard } from "react-icons/fi";
import { Routes } from "@/constants/routeConstants";
// import { useRouter } from 'next/router';

// const router = useRouter();
// const pathname = router.pathname;

export const sidebarList = [
    {
        name: "Корпоративный портал",
        icon: FiCreditCard,
        section: "payment-gateway",
        menus: [
            {
                id: 1,
                label: "Календарь",
                // path: Routes.transactions,
            },
        ],
    },
];

export const crmNavList = [
    {
        id: 1,
        name: "Клиенты",
        path: Routes.crmClients,
    },
    {
        id: 2,
        name: "Продукты",
        path: Routes.crmProducts,
    },
    {
        id: 3,
        name: "Услуги",
        path: Routes.crmServices,
    },
    {
        id: 4,
        name: "Лиды",
        path: Routes.crmLeads,
    },
    {
        id: 5,
        name: "Звонки",
        path: Routes.crmCalls,
    },
    {
        id: 6,
        name: "Задачи",
        path: Routes.crmTasks,
    },
    {
        id: 7,
        name: "Процессы",
        path: Routes.crmProcesses,
    },
    {
        id: 8,
        name: "Картотека",
        path: Routes.crmCartoteka,
    },
];

export const portalNavList = [
    {
        id: 1,
        name: "Дашборд",
        path: Routes.portalDashboard,
    },
    {
        id: 2,
        name: "Процессы",
        path: Routes.portalProcesses,
    },
    {
        id: 3,
        name: "Задачи",
        path: Routes.portalTasks,
    },
    {
        id: 4,
        name: "Заявки",
        path: Routes.portalRequests,
    },
    {
        id: 5,
        name: "Новости",
        path: Routes.portalNews,
    },
    {
        id: 5,
        name: "FAQ",
        path: Routes.portalFaq,
    },
];

export const hrNavList = [
    {
        id: 1,
        name: "Сотрудники",
        path: Routes.hrEmployee,
    },
    {
        id: 2,
        name: "Структура",
        path: Routes.hrStructure,
    },
];

export const adminNavList = [
    {
        id: 1,
        name: "Роли",
        path: Routes.adminRoles,
    },
    {
        id: 2,
        name: "Журнал действий",
        path: Routes.journalLogs,
    },
    {
        id: 3,
        name: "Перевод текстов",
        path: Routes.adminTranslate,
    },
    {
        id: 4,
        name: "Шаблоны документов",
        path: Routes.adminDocumentTemplate,
    },
];
