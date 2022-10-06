<template>
    <div class="app container">
        <home-view />
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
    margin-top: 40px;
    margin-bottom: 40px;
}
</style>
