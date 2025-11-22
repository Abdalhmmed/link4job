<script setup>
import { useCompanysStore } from '@/stores/CompanysStore';
import { onMounted, ref, computed } from 'vue';

const CompanysStore = useCompanysStore();

const props = defineProps({
  job: { type: Object, required: true }
});

const company = ref(null);

const shortDescription = (desc) => {
  if (!desc) return '';
  return desc.length > 160 ? desc.slice(0, 160) + '...' : desc;
};

onMounted(async () => {
  if (props.job?.company_id) {
    company.value = await CompanysStore.fetchCompanyById(props.job.company_id) || {};
  }
});
</script>

<template>
  <div class="col-12">
    <div class="card h-100 rounded-3 shadow-sm border-0 jobListCard p-3">
      <div class="d-flex flex-column flex-md-row align-items-start gap-3">
        <div style="width: 180px; flex-shrink: 0;">
          <img
            :src="company?.avatar_url || `https://picsum.photos/seed/company${job.company_id}/400/300`"
            alt="Company"
            class="img-fluid rounded-3"
            style="height: 120px; object-fit: cover; width: 100%;"
          />
        </div>

        <div class="flex-grow-1">
          <h5 class="fw-bold mb-2">
            <i class="bi bi-briefcase-fill me-1"></i>{{ job.title }}
          </h5>

          <p class="text-muted small mb-1">
            <i class="bi bi-building me-1"></i>{{ company?.name || '—' }}
          </p>

          <p class="text-secondary small mb-2">
            <i class="bi bi-card-text me-1"></i>{{ shortDescription(job.description) }}
          </p>

          <p class="text-muted small mb-3">
            <i class="bi bi-cash-stack me-1"></i>{{ job.salary }} {{ job.currency }} |
            <i class="bi bi-geo-alt-fill me-1"></i>{{ job.country }} |
            <i class="bi bi-clock-fill me-1"></i>{{ job.job_type }}
          </p>

          <div>
            <button class="btn btn-primary px-4 rounded-pill" @click="() => $router.push({ name: 'JobPage', params: { id: job.id } })">
              <i class="bi bi-info-circle me-1"></i>تفاصيل
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jobListCard {
  min-height: 140px;
}
</style>
