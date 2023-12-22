wrwa<script setup lang="ts">
const props = defineProps({
  error: Object
})

</script>

<template>
  <div class="grid h-screen place-items-center">
        <div class="text-center w-1/5">
            <center>
                <img width="200" src="/img/2936983.png"/>
            </center>
            <h2 class="text-5xl font-semibold mt-4 mb-4">Ошибка #{{ error?.statusCode }}</h2>
            <p class="text-slate-500 text-xl mb-8">При выполнении запроса произошла ошибка: {{ error?.message }}</p>
            <UIButton :click_action="() => clearError({ redirect: '/' })" button_type="success" size="xl">Назад</UIButton>
        </div>
  </div>
</template>