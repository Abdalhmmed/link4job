<script setup>
import { useCompanysStore } from '@/stores/CompanysStore';
import { onMounted, ref, computed } from 'vue';

const CompanysStore = useCompanysStore();

const props = defineProps({
  job: { type: Object, required: true }
});

const company = ref(null);
const companyName = computed(() => company.value?.name || '—');

const shortDescription = (desc) => {
  if (!desc) return '';
  return desc.length > 120 ? desc.slice(0, 120) + '...' : desc;
};

onMounted(async () => {
  if (props.job?.company_id) {
    company.value = await CompanysStore.fetchCompanyById(props.job.company_id) || null;
  }
});
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100 rounded-3 shadow-sm border-0 jobGridCard p-3">
      <div class="d-flex flex-column h-100">
        <h5 class="fw-bold text-center mb-2">
          <i class="bi bi-briefcase-fill me-2"></i>{{ job.title }}
        </h5>

        <p class="text-muted small mb-2 text-center">
          <i class="bi bi-building me-1"></i>الشركة: {{ companyName }}
        </p>

        <p class="text-secondary small flex-grow-1 mb-3">
          <i class="bi bi-card-text me-1"></i>{{ shortDescription(job.description) }}
        </p>

        <ul class="list-unstyled small text-muted mb-3">
          <li><i class="bi bi-cash-stack me-1"></i>الراتب: {{ job.salary }} {{ job.currency }}</li>
          <li><i class="bi bi-geo-alt-fill me-1"></i>موقع العمل: {{ job.country }}</li>
          <li><i class="bi bi-clock-fill me-1"></i>نوع العمل: {{ job.job_type }}</li>
        </ul>

        <div class="text-center mt-auto">
          <router-link :to="{name: 'JobPage', params: { id: job.id }}" class="btn btn-primary px-4 rounded-pill">
            <i class="bi bi-info-circle me-1"></i>تفاصيل
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jobGridCard {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}
</style>
