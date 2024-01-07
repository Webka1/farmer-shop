<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Мои заказы`,
        ogTitle: `${BRAND_NAME} - Мои заказы`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    const { data, error, pending } = useFetch('/api/user/orders/all')

</script>
<template>
    <div>
        <UIPageTitle icon="📋">Мои заказы</UIPageTitle>
        <div class="mt-4">
            <Loading v-if="pending" />
            <UIAlert v-else-if="error || data.error" type="error">{{ error || data.reason }}</UIAlert>
            <div v-else>
                <div v-if="data.orders.length === 0">
                    <ItemsEmpty 
                        class="mt-10" 
                        image="/img/image_8.svg"
                        title="У вас нет заказов"
                        description="Оформите хотя бы один заказ и он появится здесь"
                        button_enabled="true"
                    />
                </div>
                <div v-else>
                    Есть заказы
                </div>
            </div>
        </div>
    </div>
</template>