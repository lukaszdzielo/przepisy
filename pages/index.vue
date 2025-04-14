<script async setup lang="ts">

const { data: recipes } = await useAsyncData('blog', () => queryCollection('recipes')
    .select('id', 'imgs', 'path', 'title', 'categories', 'time', 'ebook').all())

let allTempEbooks: string[] = [];

recipes.value?.forEach(recipe => {
    if (recipe.ebook && Array.isArray(recipe.ebook)) {
        allTempEbooks.push(...recipe.ebook);
    }
});

const ebooks = [...new Set(allTempEbooks)];

</script>

<template>
    <div class="container">
        <select name="" id="" class="border my-4 w-full">
            <option value="">Wszystkie</option>
            <option :value="ebook" v-for="ebook in ebooks">{{ ebook }}</option>
        </select>
    </div>
    <div class="container">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            <NuxtLink v-for="recipe in recipes" :key="recipe.id" :to="recipe.path" class="rounded-lg">
                <img v-if="recipe.imgs?.length" :src="recipe.imgs[0]" loading="lazy"
                    class="aspect-[2/1] sm:aspect-[3/2] object-cover rounded-lg">
                <div v-else class="w-full aspect-[3/2] bg-slate-100  rounded-lg"></div>

                <div v-if="recipe.categories">{{ recipe.categories }}</div>
                <div v-if="recipe.time">{{ recipe.time }}</div>

                {{ recipe.title }}
            </NuxtLink>
        </div>
    </div>
</template>