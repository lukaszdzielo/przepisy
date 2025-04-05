<script setup lang="ts">

const { data: posts } = await useAsyncData('blog', () => queryCollection('recipes')
    .select('id', 'path', 'title', 'categories', 'time')
    .all())

</script>

<template>
    <div class="container">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            <div v-for="recipe in posts" :key="recipe.id" class="">
                <div>
                    <div class="w-full aspect-[3/2] bg-slate-100"></div>
                    <div>{{ recipe.categories }}</div>
                </div>

                <div>
                    <NuxtLink :to="recipe.path">{{ recipe.title }}</NuxtLink>
                </div>


            </div>
        </div>
    </div>
</template>