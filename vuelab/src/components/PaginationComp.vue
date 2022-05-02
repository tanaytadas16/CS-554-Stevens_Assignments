<template>
    <div>
        <router-link
            :to="{
                name: list,
                params: { page: 0 },
            }"
            class="first-button"
            ><q-btn color="primary" label="first"
        /></router-link>
        <q-btn
            v-if="page > 0"
            color="primary"
            label="Previous"
            @click="prevPage()"
            class="button"
        />
        <q-btn
            v-if="page < Math.floor(total / 20)"
            color="primary"
            label="Next"
            @click="nextPage()"
            class="button"
        />
        <router-link
            :to="{
                name: list,
                params: { page: Math.floor(total / 20) },
            }"
            class="last-button"
            ><q-btn color="primary" label="Last"
        /></router-link>
        <!-- <router-link :to="'/page/' + Math.floor(total / 20)"
            ><q-btn color="primary" label="Last" class="button"
        /></router-link> -->
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            page: this.$route.params.page,
        };
    },
    props: ['total', 'list'],
    setup() {
        return {
            current: ref(''),
        };
    },
    methods: {
        nextPage() {
            this.$router.push({
                params: { page: Number(this.$route.params.page) + 1 },
            });
        },
        prevPage() {
            this.$router.push({
                params: { page: Number(this.$route.params.page) - 1 },
            });
        },
    },
};
</script>
<style scoped>
.button {
    margin: 10px;
}
.first-button {
    padding-right: 10%;
    margin-right: 30%;
    align-items: start;
    justify-content: start;
}
.last-button {
    margin-left: 30%;
    padding-left: 10%;
    align-items: start;
    justify-content: start;
}
</style>
