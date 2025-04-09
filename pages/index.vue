<script setup lang="ts">

const { data: posts } = await useAsyncData('blog', () => queryCollection('recipes')
    .select('id', 'imgs', 'path', 'title', 'categories', 'time')
    .all())

</script>

<template>
    <div class="container">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-8">
            <div v-for="recipe in posts" :key="recipe.id" class="">
                <NuxtImg v-if="recipe.imgs?.length" :src="recipe.imgs[0]" width="300" height="200" loading="lazy"/>
                <div v-else class="w-full aspect-[3/2] bg-slate-100"></div>

                <div v-if="recipe.categories">{{ recipe.categories }}</div>
                <div v-if="recipe.time">{{ recipe.time }}</div>

                <div>
                    <NuxtLink :to="recipe.path">{{ recipe.title }}</NuxtLink>
                </div>


            </div>
        </div>
    </div>
</template>