<template>
    <div class="app">
        <div class="container">
            <home-view />
        </div>
    </div>
</template>

<script>
import HomeView from "@/views/HomeView";

export default {
    name: 'App',
    components: {HomeView},
}
</script>

<style lang="scss" scoped>
.app {
    padding-top: 40px;
    padding-bottom: 40px;
    min-height: 100vh;
    background: var(--background-color);
}
</style>
