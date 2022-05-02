<template>
    <div v-if="loading && !isNaN(Number(id))">
        <img :src="loadingImage" alt="loading" class="loading" />
    </div>

    <div v-else-if="isError || isNaN(Number(id))">
        <img :src="ErrorImage" alt="error" class="error" />
    </div>
    <div v-else-if="!isError">
        <br />
        <h1>{{ character.name }}</h1>
        <br />
        <img
            v-if="this.image"
            :src="this.image"
            alt="character"
            onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'"
        />
        <br />
        <span v-html="this.character.description"></span>
        <br />

        <div class="row">
            <div class="col">
                <div className="contentlinks">
                    <h2>
                        <u> Featured in Series:</u>
                    </h2>

                    <div>
                        <ul
                            v-for="(eachSeries, index) in this.character.series
                                .items"
                            :key="index"
                        >
                            <li>
                                <a
                                    :href="
                                        '/series/' +
                                        eachSeries.resourceURI.split('/').pop()
                                    "
                                    class="link-primary"
                                    >{{ eachSeries.name }}</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col">
                <div className="contentlinks">
                    <h3>
                        <u> Featured in Comics:</u>
                    </h3>

                    <div>
                        <ul
                            v-for="(eachComic, index) in this.character.comics
                                .items"
                            :key="index"
                        >
                            <li>
                                <a
                                    :href="
                                        '/comics/' +
                                        eachComic.resourceURI.split('/').pop()
                                    "
                                    class="link-primary"
                                    >{{ eachComic.name }}</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
const md5 = require('md5');
const publickey = '0ecac5d6b17a21f2c833ae9bf42214fa';
const privatekey = 'a4c3d3f6cafca2b24870e3a088669a0fb9622935';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public';
const keyHash = 'ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
import ErrorImage from '../assets/marvel404.jpg';
import loadingImage from '../assets/loading-gif.gif';

export default {
    name: 'SingleCharacter',
    data() {
        return {
            id: this.$route.params.id,
            character: {
                name: '',
                description: '',
                series: { items: [] },
                comics: { items: [] },
            },
            image: '',
            isError: false,
            ErrorImage: ErrorImage,
            loading: true,
            loadingImage: loadingImage,
        };
    },
    methods: {
        async getCharacter(id) {
            axios
                .get(`${baseUrl}/characters/${id}?${keyHash}`)
                .then(({ data }) => {
                    this.loading = false;
                    this.character = data.data.results[0];
                    this.image =
                        data.data.results[0].thumbnail.path + '/detail.jpg';
                })
                .catch((error) => {
                    console.log(error);
                    this.isError = true;
                    this.loading = false;
                });
        },
    },
    created() {
        this.getCharacter(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getCharacter(this.$route.params.id);
        },
    },
};
</script>
<style scoped>
img {
    margin-bottom: 40px;
}
span {
    padding: 15px;
    text-align: center;
    font-size: 30px;
}
.contentlinks {
    margin: 10%;
    padding: 20px;
    border: 3px solid black;
    border-radius: 10%;
    box-sizing: content-box;
}
li {
    list-style: none;
}
img.error {
    width: 100%;
}
img {
    border-radius: 1%;
}
</style>
