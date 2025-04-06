<script setup>

const slug = useRoute().params.slug;
const { data: recipe } = await useAsyncData(`${slug}`, () => {
    return queryCollection('recipes').path(`/${slug}`).first();
});

</script>

<template>
    <div class="container xl:max-w-screen-lg print:px-12 print:text-xs">
        <NuxtImg v-if="recipe.imgs?.length" :src="recipe.imgs[0]" width="1200" height="600" />

        <ContentRenderer v-if="recipe" :value="recipe" class="grid grid-cols-6 gap-8" />
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
    @apply ps-6 list-disc;
}
</style>