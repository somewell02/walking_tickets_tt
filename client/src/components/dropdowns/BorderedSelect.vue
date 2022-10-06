<template>
    <div class="bordered_select">
        <bordered-button
            class="selected_item"
            @click="isActive = !isActive"
            :class="{ active: isActive }"
        >
            {{ prefix ? prefix + " " + selectedTitle.toLowerCase() : selectedTitle }}
            <arrow-icon />
        </bordered-button>
        <div class="options" v-if="isActive">
            <button
                class="option_item"
                v-for="option in options"
                :key="option.id"
                @click="selectOption(option)"
                :class="{ active: option.id === modelValue }"
            >
                {{ option.title }}
            </button>
        </div>
    </div>
</template>

<script>
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import ArrowIcon from "@/assets/img/icons/ArrowIcon";
import {computed, onBeforeUnmount, onMounted, ref, toRefs} from "vue";

export default {
    name: "BorderedSelect",

    components: {
        ArrowIcon,
        BorderedButton,
    },

    props: {
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
        prefix: {
            type: String,
            required: false,
        },
        defaultTitle: {
            type: String,
            required: false,
            default: "Выберете значение",
        },
    },

    emits: {
        "update:modelValue": null,
    },

    setup(props, {emit}) {
        const {modelValue, options, defaultTitle} = toRefs(props);
        const isActive = ref(false);

        const selectedTitle = computed(() => {
            if (modelValue.value && options.value) {
                return options.value.find((option) => option.id === modelValue.value).title;
            } else {
                return defaultTitle.value;
            }
        })

        const selectOption = option => {
            emit("update:modelValue", option.id);
            isActive.value = false;
        }

        const handleMouseClick = e => {
            if (isActive.value && !e.target.classList.contains("selected_item")) {
                isActive.value = false;
            }
        }

        onMounted(() => {
            document.addEventListener("click", handleMouseClick);
        })

        onBeforeUnmount(() => {
            document.removeEventListener("click", handleMouseClick);
        })

        return {
            isActive,
            selectedTitle,
            selectOption
        }
    },
};
</script>
<style lang="scss" scoped>
.bordered_select {
    position: relative;
    min-width: 150px;
    .selected_item {
        width: 100%;
        @include flex-between;
        .icon {
            width: 12px;
            height: 12px;
            margin-left: 15px;
            pointer-events: none;
        }
        &:hover {
            background: none;
        }
        &.active {
            .icon {
                transform: rotate(180deg);
            }
        }
    }
    .options {
        position: absolute;
        top: calc(100% + 7px);
        left: 0;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        max-height: 200px;
        min-width: 100%;
        z-index: 10;
        @include custom-scroll;
        .option_item {
            cursor: pointer;
            width: 100%;
            padding: 10px 20px;
            font-size: 14px;
            margin: 0;
            text-align: left;
            color: var(--text-color);
            border: solid var(--border-color);
            border-width: 0;
            background: none;
            &:not(:first-child) {
                border-width: 1px 0 0 0;
            }
            &:hover,
            &.active {
                background: var(--hover-color);
            }
        }
    }
}
</style>