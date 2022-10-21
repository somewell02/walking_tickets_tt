<template>
    <main>
        <h1>Пешие прогулки в горы</h1>
        <div class="table_modifications">
            <div class="filters_wrap">
                <div class="filters_icon">
                    <filter-icon/>
                </div>
                <bordered-select
                    v-model="filterValue.field"
                    :options="TICKETS_FILTER.fields"
                    default-title="Выберете поле"
                />
                <bordered-select
                    v-model="filterValue.option"
                    :options="TICKETS_FILTER.options"
                    default-title="Выберете условие"
                />
                <text-input
                    v-model="filterValue.value"
                    class="filter_value_inp"
                    placeholder="Введите значение"
                />
                <bordered-button class="clear_btn" @click="clearFilters">
                    Сбросить
                </bordered-button>
            </div>
            <div class="sorts_wrap">
                <bordered-select
                    v-model="sortValue"
                    :options="TICKETS_SORT.options"
                    prefix="Сортировка:"
                />
            </div>
        </div>
        <bordered-table
            v-if="finalTicketsLength"
            :titles="TICKETS_TABLE"
            :rows="finalTickets"
            @delete="deleteTicketFromDb"
            class="tickets_table"
        />
        <div class="pagination_wrap">
            <div class="count_title">
                Найдено {{ finalTicketsLength }} билетов
            </div>
            <filled-pagination
                :length="paginationLength"
                v-model="page"
            />
        </div>
    </main>
</template>

<script>
import BorderedTable from "@/components/tables/BorderedTable";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import TextInput from "@/components/inputs/TextInput";
import FilterIcon from "@/assets/img/icons/FilterIcon";
import BorderedButton from "@/components/buttons/BorderedButton";
import FilledPagination from "@/components/paginations/FilledPagination";

import {computed, onMounted, reactive, ref} from "vue";
import {deleteTicket, getTickets} from "@/data/tickets/ticket-api";
import {useList} from "@/use/list";
import {TICKETS_TABLE, TICKETS_SORT, TICKETS_FILTER, TICKETS_PAGINATION} from "@/data/tickets/ticket-options";

export default {
    name: "HomeView",
    components: {
        FilledPagination,
        BorderedButton,
        FilterIcon,
        TextInput,
        BorderedSelect,
        BorderedTable
    },
    setup() {
        const tickets = ref([]);
        const sortValue = ref("default");
        const filterValue = reactive({
            field: "",
            option: "",
            value: ""
        })

        const clearFilters = () => {
            filterValue.field = "";
            filterValue.option = "";
            filterValue.value = "";
        }

        const page = ref(1);

        onMounted(async () => {
            tickets.value = await getTickets();
        })

        const modifiedTickets = computed(() => tickets.value.map(ticket => {
            ticket.distanceUnit = ticket.distanceUnit || "км";
            ticket.distanceDisplay = ticket.distance + " " + ticket.distanceUnit;

            ticket.dateDisplay = new Date(ticket.date).toLocaleDateString("ru");

            return ticket;
        }))

        const deleteTicketFromDb = async id => {
            deleteTicket(id).then(() => {
                tickets.value = tickets.value.filter(ticket => ticket.id !== id);
            });
        }

        const {
            finalItems: finalTickets,
            length: finalTicketsLength,
        } = useList({
            items: modifiedTickets,
            sortValue,
            filterValue,
            paginationValue: {
                page: page,
                countOnPage: TICKETS_PAGINATION.countOnPage,
            }
        });

        const paginationLength = computed(() => Math.ceil(finalTicketsLength.value / TICKETS_PAGINATION.countOnPage))

        return {
            modifiedTickets,
            finalTickets,
            sortValue,
            filterValue,
            clearFilters,
            deleteTicketFromDb,
            page,
            finalTicketsLength,
            paginationLength,
            TICKETS_TABLE,
            TICKETS_SORT,
            TICKETS_FILTER,
            TICKETS_PAGINATION,
        }
    }
}
</script>

<style lang="scss">
.table_modifications {
    margin-top: 60px;
    @include flex-between;

    @include media-xl {
        flex-direction: column-reverse;
    }

    .filters_wrap {
        display: flex;

        @include media-xl {
            margin-top: 20px;
        }

        @include media-md {
            flex-direction: column;
            width: 100%;
            & > *:not(:last-child) {
                margin-bottom: 10px;
            }
        }

        & > *:not(:last-child) {
            margin-right: 10px;
            @include media-md {
                margin-right: 0;
            }
        }

        .filters_icon {
            height: 40px;
            padding: 12px 20px;
            border: solid 1px var(--border-color);
            @include flex-center;
        }

        .clear_btn {
            @include flex-center;

            &:hover {
                background: none;
            }
        }

        .filter_value_inp {
            max-width: 200px;
            @include media-md {
                max-width: none;
            }
        }
    }

    .sorts_wrap {
        @include media-md {
            width: 100%;
        }
    }
}

.tickets_table {
    margin-top: 30px;
}

.pagination_wrap {
    margin-top: 30px;
    @include flex-between;

    @include media-md {
        flex-direction: column-reverse;
    }

    .count_title {
        color: var(--text-color);
        font-size: 14px;
        @include media-md {
            margin-top: 20px;
        }
    }
}
</style>