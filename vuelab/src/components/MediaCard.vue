<template>
    <div class="col">
        <div class="card">
            <img
                v-if="character.thumbnail"
                :src="character.thumbnail.path + '/portrait_uncanny.jpg'"
                class="card-img-top"
                alt="Not Found"
                onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'"
            />
            <div class="card-body">
                <p class="card-title">
                    {{ character.name || character.title }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: { character: { name: 'name', thumbnail: 'thumbnail' } },
};
</script>
<style scoped>
.card-container {
    padding: 10px;
    width: auto;
    margin: 20px;
}
p {
    font-size: 20px;
}
</style>
