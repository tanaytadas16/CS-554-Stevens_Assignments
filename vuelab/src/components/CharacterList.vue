<template>
    <div>
        <h1>Characters List</h1>
        <h1>total:{{ total }}</h1>
        <!-- <div>{{ characters }}</div> -->
        <ul>
            <li v-for="(character, index) in characters" :key="index">
                <router-link
                    :to="{ name: 'character', params: { id: character.id } }"
                    >{{ character.name }}</router-link
                >
            </li>
        </ul>
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
// console.log(`${baseUrl}/characters?${keyHash}`);
export default {
    name: 'CharacterList',
    data() {
        return {
            total: Number,
            characters: [],
        };
    },
    mounted() {
        axios
            .get(`${baseUrl}/characters?${keyHash}`)
            .then((response) => {
                console.log(response);
                this.characters = response.data.data.results;
                this.total = response.data.data.total;
            })
            .catch((err) => {
                console.log(err);
            });
    },

    methods: {
        log() {
            console.log(this.characters);
        },
    },
};
</script>
<style scoped>
ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
</style>
