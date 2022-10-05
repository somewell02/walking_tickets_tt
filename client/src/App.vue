<template>
    <div></div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        const url = new URL("http://localhost:3000/api/tickets");
        const res = fetch(url.toString()).then(data => data.json());
        res.then(data => {
            console.log(data)
        })
    }
}
</script>
