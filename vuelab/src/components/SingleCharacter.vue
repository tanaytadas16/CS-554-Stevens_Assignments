<template>
    <div>
        <!-- <div>{{ character }}</div> -->
        <h1>{{ character.name }}</h1>
        <br />

        <img
            v-if="this.image"
            :src="this.image"
            onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'"
        />
        <br />
        <span v-html="this.character.description"></span>
        <br />
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
export default {
    name: 'SingleCharacter',
    data() {
        return {
            id: this.$route.params.id,
            character: {
                name: '',
                description: '',
            },
            image: '',
        };
    },
    methods: {
        getCharacter(id) {
            axios
                .get(`${baseUrl}/characters/${id}?${keyHash}`)
                .then(({ data }) => {
                    this.character = data.data.results[0];
                    this.image =
                        data.data.results[0].thumbnail.path + '/detail.jpg';
                })
                .catch((error) => console.log(error));
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
