<script setup lang="ts">
   
</script>

<template>
    <div class="main-content p-20 bg-blue-100">
        <Header :isLoggedIn="false"/>
        <div class="bg-white p-10 rounded-b-3xl">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
    .main-content {
        min-height: 100vh;
    }
</style>