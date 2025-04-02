<script setup lang="ts">

const { data: posts } = await useAsyncData('blog', () => queryCollection('recipes').all())

</script>

<template>
    <div>
        <div>index.vue</div>
        <li v-for="post in posts" :key="post.id">
            <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        </li>
    </div>
</template>