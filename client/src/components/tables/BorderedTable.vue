<template>
    <div class="bordered_table">
        <div class="titles" v-if="titles">
            <div
                v-for="title in titles"
                :key="title.id"
                :style="{
                  width: title.width + '%',
                }"
            >
                {{ title.name }}
            </div>
        </div>
        <div class="rows">
            <div
                class="row"
                v-for="row in rows"
                :key="row.id"
                @click="this.$emit('select', row)"
            >
                <div
                    v-for="title in titles"
                    :key="title.id"
                    :style="{
                        width: title.width + '%',
                    }"
                    class="column"
                >
                    <div class="content">
                        <span class="content_title"> {{ title.name + ": " }} </span>
                        {{ row[title.id] || "-" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BorderedTable",
    props: {
        titles: {
            type: Array,
            required: false,
        },
        rows: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.bordered_table {
    font-size: 14px;
    font-weight: 400;

    .titles {
        color: var(--secondary-color);
        display: flex;
        padding: 0 20px 15px 20px;
        @include media-md {
            display: none;
        }
    }

    .row {
        display: flex;
        padding: 12px 20px;
        min-height: 40px;
        border: 1px solid var(--border-color);

        @include media-md {
            flex-direction: column;
        }

        &:not(:last-child) {
            margin-bottom: 12px;
        }

        .column {
            padding-right: 15px;
            display: flex;

            @include media-md {
                width: 100%!important;

                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }

            .content {
                display: flex;
                align-items: center;
                color: var(--text-color);

                @include media-md {
                    align-items: flex-start;
                }

                .content_title {
                    margin-right: 5px;
                    color: var(--secondary-color);
                    display: none;

                    @include media-md {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>