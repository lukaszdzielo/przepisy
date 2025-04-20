<script setup>

const slug = useRoute().params.slug;
const { data: recipe } = await useAsyncData(`${slug}`, () => {
    return queryCollection('recipes').path(`/${slug}`).first();
});

</script>

<template>
    <header class="border-b border-emerald-500 py-2 print:hidden ">
        <div class="container xl:max-w-screen-lg">
            
        <NuxtLink to="/" class="inline-flex py-2 px-5 bg-emerald-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-opacity-75 transition">Powrót do listy</NuxtLink>
    
        </div>
    </header>
    
    <div class="container xl:max-w-screen-lg p-4 print:text-xs pb-16 print:pb-4">
        <img v-if="recipe.imgs?.length" :src="recipe.imgs[0]" loading="lazy" class="aspect-[2/1] print:aspect-[3/1] object-cover rounded-2xl">
        

        <h1 class="text-2xl font-semibold print:text-xl border-b pb-3 my-2 border-emerald-200 print:border-gray-200">{{ recipe.title }}</h1>

        

        <div v-if="recipe.meta.macros" class="border-b border-emerald-200 my-3 print:my-2 pb-3 print:pb-2 print:border-gray-200">
            <ul class="flex flex-wrap gap-x-4 gap-y-2 list-none m-0 p-0 text-xs print:text-[10px]">
                <li v-if="recipe.time"  class="inline-flex items-center gap-2">
                    <Icon name="ic:round-access-alarm" class="w-6 h-6 text-emerald-500 print:text-gray-500" /><strong>{{ recipe.time }}</strong>
                </li>
                <li v-for="(value, key) in recipe.meta.macros" class="bg-emerald-100 print:bg-gray-100 rounded-full py-1 px-3">{{ key.toUpperCase() }}: <strong>{{ value }}</strong></li>
            </ul>
        </div>
            
        <ContentRenderer v-if="recipe" :value="recipe" class="grid grid-cols-8 gap-8" />
        <div v-else>Post not found</div>
    </div>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
    @apply mb-2 font-medium text-xl print:text-base;
}

:is(h1, h2, h3, h4, h5, h6, ul, p)+ :is(h1, h2, h3, h4, h5, h6) {
    @apply mt-4;
}

ul {
    @apply ps-6 list-disc print:ps-4;
}

</style>