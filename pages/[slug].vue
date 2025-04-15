<script setup>

const slug = useRoute().params.slug;
const { data: recipe } = await useAsyncData(`${slug}`, () => {
    return queryCollection('recipes').path(`/${slug}`).first();
});

</script>

<template>
    <div class="container xl:max-w-screen-lg print:px-4 print:text-xs">
        <img v-if="recipe.imgs?.length" :src="recipe.imgs[0]" loading="lazy"
            class="aspect-[3/2] print:aspect-[2/1] object-cover rounded-2xl">

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