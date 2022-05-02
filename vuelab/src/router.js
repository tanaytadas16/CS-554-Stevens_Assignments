import { createWebHistory, createRouter } from 'vue-router';
import CharacterList from './components/CharacterList.vue';
import SingleCharacter from './components/SingleCharacter.vue';
import SingleComic from './components/SingleComic.vue';
import SingleSeries from './components/SingleSeries.vue';
import ComicList from './components/ComicList.vue';
import SeriesList from './components/SeriesList.vue';
import HomePage from './components/HomePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'HomePage',
            path: '/',
            component: HomePage,
        },
        {
            path: '/characters/page/:page',
            name: 'CharacterList',
            component: CharacterList,
        },
        {
            path: '/characters/:id',
            name: 'character',
            component: SingleCharacter,
        },
        {
            path: '/comics/page/:page',
            name: 'ComicList',
            component: ComicList,
        },
        {
            path: '/series/page/:page',
            name: 'SeriesList',
            component: SeriesList,
        },
        {
            path: '/comics/:id',
            name: 'comics',
            component: SingleComic,
        },
        {
            path: '/series/:id',
            name: 'series',
            component: SingleSeries,
        },
    ],
});
export default router;
