<template>
    <nav class="navbar navbar-dark">
        <div>
            <a class="navbar-brand" href="/"
                ><img class="logo" :src="logo" alt="logo"
            /></a>
        </div>

        <div class="row">
            <a class="nav-link" href="/characters/page/0">Characters </a>

            <a class="nav-link" href="/comics/page/0">Comics</a>

            <a class="nav-link" href="/series/page/0">Series</a>
        </div>
    </nav>
</template>

<script>
import logo from '../assets/marvel-logo.png';
import { fabApple } from '@quasar/extras/fontawesome-v6';

export default {
    setup() {
        return { fabApple, logo };
    },
};
</script>
<style scoped>
.navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
}
.nav-link {
    width: 8%;
    font-size: 22px;
    color: white;
}
.navbar-brand .logo {
    height: 100px;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block;
}
.row {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
}
</style>
