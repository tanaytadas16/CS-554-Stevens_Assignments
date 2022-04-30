<template>
    // class="col-xs-12 col-sm-6 col-md-4"
    <div class="card-container">
        <q-card class="my-card">
            <img
                v-if="character.thumbnail"
                :src="character.thumbnail.path + '/portrait_uncanny.jpg'"
                alt="Not Found"
                onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'"
            />

            <q-card-section>
                <div class="text-h6">{{ character.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none"> </q-card-section>
        </q-card>
    </div>
</template>
<script>
export default {
    props: { character: { name: 'name', thumbnail: 'thumbnail' } },
};
</script>
<style scoped>
.my-card {
    width: 100%;
    max-width: 250px;
}
.card-container {
    margin: auto;
}
</style>
