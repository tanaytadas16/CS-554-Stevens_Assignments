<template>
    <div class="justify-content-center">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="/">Navbar</a>

            <div class="row">
                <div></div>
            </div>
            <div
                class="justify-content-center collapse navbar-collapse"
                id="navbarNav"
            >
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/characters/page/0"
                            >Characters
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/comics/page/0">Comics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/series/page/0">Series</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li> -->
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { fabApple } from '@quasar/extras/fontawesome-v6';

export default {
    setup() {
        return { fabApple };
    },
};
</script>
<style scoped>
.navbar {
    background-color: black;
}
</style>
