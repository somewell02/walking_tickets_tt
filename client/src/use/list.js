import {computed} from "vue";

export const useList = init => {
    const items = init.items;

    const sortedItems = computed(() => {
        if (init.sortValue && init.sortValue.value !== "default") {
            const sortValue = init.sortValue.value.split(":")[0];
            const sortDirection = init.sortValue.value.split(":")[1];

            return [...items.value].sort((o1, o2) => {
                if (o1[sortValue] > o2[sortValue]) return sortDirection === "asc" ? 1 : -1;
                if (o1[sortValue] < o2[sortValue]) return sortDirection === "asc" ? -1 : 1;
                return 0;
            });
        } else {
            return [...items.value];
        }
    })

    const filteredItems = computed(() => {
        if (init.filterValue.field && init.filterValue.option && init.filterValue.value) {
            return [...sortedItems.value].filter(item => {
                switch (init.filterValue.option) {
                    case "equally":
                        return `${item[init.filterValue.field]}` === init.filterValue.value;
                    case "contains":
                        return `${item[init.filterValue.field]}`.toLowerCase().includes(init.filterValue.value.trim().toLowerCase());
                    case "higher":
                        return item[init.filterValue.field] >= parseInt(init.filterValue.value);
                    case "less":
                        return item[init.filterValue.field] <= parseInt(init.filterValue.value);

                }
            })
        } else {
            return [...sortedItems.value];
        }
    })

    const lengthBeforePagination = computed(() => [...filteredItems.value].length)

    const paginatedItems = computed(() => {
        if (init.paginationValue) {
            return [...filteredItems.value].filter(
                item =>
                    filteredItems.value.indexOf(item) >= (init.paginationValue.page.value - 1) * init.paginationValue.countOnPage &&
                    filteredItems.value.indexOf(item) < init.paginationValue.page.value * init.paginationValue.countOnPage
            );
        } else {
            return [...filteredItems.value];
        }
    })

    return {
        finalItems: paginatedItems,
        length: lengthBeforePagination,
    };
}