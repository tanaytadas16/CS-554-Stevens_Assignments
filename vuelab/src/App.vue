<template>
    <NavigationComp />
    <div id="app">
        <router-view :key="$route.path" />
    </div>
</template>

<script>
import NavigationComp from './components/NavbarComp.vue';
export default {
    name: 'App',
    components: {
        NavigationComp,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */

    max-width: 100%;
    /* overflow-x: hidden; */
}
</style>
