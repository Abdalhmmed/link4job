<script setup>
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref } from 'vue';

const UserStore = useUserStore()


const props = defineProps({
    employee: {
        type: Number,
        required: true,
        default: () => ({
            user_id: 0
        })
    }
})

const theEmployee = ref({
    id: 1,
    name: 'error',
    role: 'error'
});


onMounted( async () => {
    theEmployee.value = await UserStore.fetchUserById(props.employee);
});



</script>

<template>
    <img :src="'https://picsum.photos/50?emp'+theEmployee.id" class="rounded-circle me-3 border shadow-sm" alt="User" width="45" height="45">
    <div>
    <h6 class="mb-0">
        <div class="fw-semibold text-dark text-decoration-none hover-primary">
            {{ theEmployee.name }}
        </div>
        </h6>
        <small class="text-secondary">{{ theEmployee.role }}</small>
    </div>
</template>