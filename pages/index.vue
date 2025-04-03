<script setup lang="ts">

const { data: posts } = await useAsyncData('blog', () => queryCollection('recipes')
    .select('id', 'path', 'title', 'categories', 'time')
    .all())

</script>

<template>
    <div>
        <div>index.vue</div>
        <div class="recipeList recipeList--list">
            <div v-for="recipe in posts" :key="recipe.id" class="grid__recipe">
                <div>
                    <NuxtLink :to="recipe.path">{{ recipe.title }}</NuxtLink>
                </div>

                <div>{{ recipe.categories }}</div>

            </div>
        </div>
    </div>
</template>

<style>
.recipeList {
    &.recipeList--list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
        flex-wrap: wrap;
        gap: .75rem;
        margin-top: 1rem;
    }
}

.grid__recipe {
    background: lightgray;
    padding: 10px;
}
</style>