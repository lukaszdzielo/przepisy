<template>
    <button @click="logout" class="print:hidden">Wyloguj</button>


    <div>content</div>


    <!-- <NuxtLayout>
        <NuxtPage class="py-4" />
    </NuxtLayout> -->
</template>

<script setup>
const emit = defineEmits(['logout']);
const logout = () => emit('logout');
</script>