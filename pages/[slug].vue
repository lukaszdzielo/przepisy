<script setup>

const slug = useRoute().params.slug;
const { data: recipe } = await useAsyncData(`${slug}`, () => {
    return queryCollection('recipes').path(`/${slug}`).first();
});

</script>

<template>
    <div>
        <!-- <small>
            {{ recipe }}
        </small> -->

        <ContentRenderer v-if="recipe" :value="recipe" />
        <div v-else>Post not found</div>

    </div>
</template>