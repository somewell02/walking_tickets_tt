export const TICKETS_TABLE = [
    {
        id: "name",
        name: "Название",
        width: 40,
    },
    {
        id: "dateDisplay",
        name: "Дата",
        width: 20
    },
    {
        id: "distanceDisplay",
        name: "Расстояние",
        width: 20,
    },
    {
        id: "quantity",
        name: "Количество",
        width: 20,
    },
];

export const TICKETS_SORT = {
    options: [
        { id: "default", title: "По умолчанию" },
        { id: "name:asc", title: "Название (↑)" },
        { id: "name:desc", title: "Название (↓)" },
        { id: "distance:asc", title: "Расстояние (↑)" },
        { id: "distance:desc", title: "Расстояние (↓)" },
        { id: "quantity:asc", title: "Количество (↑)" },
        { id: "quantity:desc", title: "Количество (↓)" },
    ],
};

export const TICKETS_FILTER = {
    fields: [
        { id: "name", title: "Название" },
        { id: "dateDisplay", title: "Дата" },
        { id: "distance", title: "Расстояние" },
        { id: "quantity", title: "Количество" },
    ],
    options: [
        { id: "equally", title: "равно" },
        { id: "contains", title: "содержит" },
        { id: "higher", title: "больше" },
        { id: "less", title: "меньше" },
    ],
};

export const TICKETS_PAGINATION = {
    countOnPage: 6,
};