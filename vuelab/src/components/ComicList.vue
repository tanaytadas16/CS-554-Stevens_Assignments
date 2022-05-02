<template>
    <div class="list">
        <div
            v-if="
                page >= 0 &&
                page <= Math.floor(total / 20) &&
                !isNaN(parseInt(page))
            "
            class="main-content"
        >
            <h1>Comics</h1>
            <PaginationComp :total="total" list="ComicList" />
            <div class="row row-cols-1 row-cols-md-4 g-4 media-card">
                <template v-for="(comics, index) in comics" :key="index">
                    <router-link
                        :to="{
                            name: 'comics',
                            params: { id: comics.id },
                        }"
                    >
                        <MediaCard :character="comics" />
                    </router-link>
                </template>
            </div>
        </div>
        <div v-else-if="loading && !isNaN(parseInt(page))">
            <img :src="loadingImage" alt="loading" class="loading" />
        </div>
        <div v-else>
            <img :src="image" alt="error" class="error" />
        </div>
        <PaginationComp
            v-if="page >= 0 && page < Math.floor(total / 20)"
            :total="total"
            list="ComicList"
        />
    </div>
</template>
<script>
import axios from 'axios';
import MediaCard from './MediaCard.vue';
import PaginationComp from './PaginationComp.vue';
import ErrorImage from '../assets/marvel404.jpg';
import loadingImage from '../assets/loading-gif.gif';
const md5 = require('md5');
const publickey = '0ecac5d6b17a21f2c833ae9bf42214fa';
const privatekey = 'a4c3d3f6cafca2b24870e3a088669a0fb9622935';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public';
const keyHash = 'ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export default {
    name: 'ComicsList',
    data() {
        return {
            image: ErrorImage,
            page: this.$route.params.page,
            total: Number,
            comics: [],
            loading: true,
            loadingImage: loadingImage,
        };
    },
    components: { MediaCard, PaginationComp },
    async created() {
        axios
            .get(`${baseUrl}/comics?${keyHash}&offset=${this.page * 20}`)
            .then((response) => {
                // console.log(response);
                this.loading = false;
                this.comics = response.data.data.results;
                this.total = response.data.data.total;
            })
            .catch((err) => {
                console.log(err);
                this.loading = false;
            });
    },

    methods: {
        log() {
            console.log(this.comics);
        },
    },
    watch: {
        $route() {},
    },
};
</script>
<style scoped>
.list {
    margin: 20px;
}
.media-card > a {
    padding: 30px;
}
img.error {
    width: 100%;
}
</style>
