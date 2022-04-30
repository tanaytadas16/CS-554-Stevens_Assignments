import { createWebHistory, createRouter } from 'vue-router';
import CharacterList from './components/CharacterList.vue';
import SingleCharacter from './components/SingleCharacter.vue';
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
    ],
});
export default router;
