<template>
    <div class="pagination" v-if="length > 1">
        <button
            v-if="labels"
            class="pagination_item prev"
            @click="changePage(modelValue - 1)"
        >
            <arrow-icon /> Предыдущая
        </button>
        <button
            v-for="num in length"
            :key="num"
            @click="changePage(num)"
            class="pagination_item"
            :class="{ active: num === modelValue }"
        >
            {{ num }}
        </button>
        <button
            v-if="labels"
            class="pagination_item next"
            @click="changePage(modelValue + 1)"
        >
            Следующая <arrow-icon />
        </button>
    </div>
</template>

<script>
import {toRefs} from "vue";
import ArrowIcon from "@/assets/img/icons/ArrowIcon";

export default {
    components: {ArrowIcon},
    props: {
        length: {
            type: Number,
            required: true,
        },
        modelValue: {
            type: Number,
            required: true,
        },
        labels: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    emits: {
        "update:modelValue": null,
    },

    setup(props, {emit}) {
        const {modelValue, length} = toRefs(props);

        const changePage = num => {
            if (num >= 1 && num <= length.value && num !== modelValue.value) {
                emit("update:modelValue", num);
            }
        }

        return {
            changePage
        }
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    color: var(--text-color);
    .pagination_item {
        @include flex-center;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        color: var(---text-color);
        min-width: 28px;
        height: 28px;
        padding: 7px;
        border: none;
        background: none;
        &.prev,
        &.next {
            padding: 7px 12px;
            .icon {
                width: 12px;
                height: 12px;
            }
        }
        &.prev .icon {
            transform: rotate(90deg);
            margin-right: 8px;
        }
        &.next .icon {
            transform: rotate(-90deg);
            margin-left: 8px;
        }
        &:hover:not(.active) {
            outline: 1px solid var(--primary-color);
        }
        &.active {
            background: var(--primary-color);
            color: white;
        }
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
}
</style>