<template>
    <input type="text" :value="modelValue.toString() ?? ''" @input="updateInput"/>
</template>

<script>
export default {
    name: "TextInput",
    props: {
        modelValue: {
            type: [String, Number],
            required: true,
        },
    },
    emits: {
        "update:modelValue": null,
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>
input {
    width: 100%;
    padding: 0 20px;
    height: 40px;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: var(--text-color);
    border: 1px solid var(--input-color);

    &:focus {
        border: 2px solid var(--input-color);
        padding: 0 19px;
    }

    &::placeholder {
        color: var(--secondary-color);
    }
}
</style>