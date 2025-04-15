<script async setup lang="ts">
import { ref } from 'vue';

const { data: recipes } = await useAsyncData('blog', () => queryCollection('recipes')
    .select('id', 'imgs', 'path', 'title', 'categories', 'time', 'ebook').all())
 
let allTempEbooks: string[] = [];
recipes.value?.forEach(recipe => {
    recipe.ebook && Array.isArray(recipe.ebook) && allTempEbooks.push(...recipe.ebook)
});
 
const ebooks = [...new Set(allTempEbooks)];

const currentFilter = ref<{
    ebook?: string[]
}>({
    ebook: ''
});

const filteredRecipes = computed(() => {
    if (!recipes.value) return [];

    return recipes.value.filter(recipe => {
        let matchesEbook = true;

        if (currentFilter.value.ebook) {
            matchesEbook = recipe.ebook?.includes(currentFilter.value.ebook) || false;
        }
        return matchesEbook;
    });
});

</script>

<template>

    <div class="container mb-8">
        <label for="eBook">eBook</label>
        <select v-model="currentFilter.ebook" id="eBook" class="border">
            <option value="" selected>Wszystkie</option>
            <option v-for="ebook in ebooks" :value="ebook">{{ ebook }}</option>
        </select>
    </div>
    <div class="container">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            <NuxtLink v-for="recipe in filteredRecipes" :key="recipe.id" :to="recipe.path" class="rounded-lg">
                <span class="relative block">
                    <img v-if="recipe.imgs?.length" :src="recipe.imgs[0]" loading="lazy"
                    class="aspect-[2/1] sm:aspect-[3/2] object-cover rounded-lg">
                    <div v-else class="w-full aspect-[3/2] bg-slate-100  rounded-lg"></div>
                    <div v-if="recipe.time"  class="absolute top-0 end-0 ps-2 pb-1 rounded-bl-lg bg-white text-xs">{{ recipe.time }}</div>
                </span>

                <!-- <div v-if="recipe.categories">{{ recipe.categories }}</div> -->

                {{ recipe.title }}
            </NuxtLink>
        </div>
    </div>
</template>