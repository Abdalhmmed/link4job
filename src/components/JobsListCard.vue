<script setup>
import { useCompanysStore } from '@/stores/CompanysStore';
import { useJobsStore } from '@/stores/JobsStore';
import { onMounted, ref } from 'vue';
const JobStore = useJobsStore();

const CompanysStore = useCompanysStore()

const props = defineProps({
    job: {
        type: Object,
        required: true,
        default: () => ({
            id: 0,
            company_id: 0,
            title: 'Error',
            description: 'Error description',
            salary: 0,
            currency: 'USD',
            country: '',
            job_type: '',
        })
    }
});

const company = ref([null]);
const shortDescription = (desc) => desc.length > 120 ? desc.slice(0, 120) + '...' : desc;

onMounted( async () => { 
  company.value = await CompanysStore.fetchCompanyById(props.job.company_id)
})
</script>

<template>
  <div class="col-12 mb-3">
    <div class="card h-100 rounded-3 shadow-sm border-0">
      <div class="card-body d-flex align-items-center">

        <!-- صورة الشركه -->
        <div class="ms-3" style="width: 180px; flex-shrink: 0;">
          <img
            :src="company.avatar_url"
            alt="Job Image"
            class="img-fluid rounded-3"
            style="height: 120px; object-fit: cover; width: 100%;"
          />
        </div>

        <div class="flex-grow-1 text-start">
          <h5 class="fw-bold mb-2">
            <i class="bi bi-briefcase-fill me-1"></i>{{ job.title }}
          </h5>

          <p class="text-muted small mb-1">
            <i class="bi bi-building me-1"></i>Company: {{ company.name }}
          </p>

          <p class="text-secondary small mb-2">
            <i class="bi bi-card-text me-1"></i>{{ shortDescription(job.description) }}
          </p>

          <p class="text-muted small mb-3">
            <i class="bi bi-cash-stack me-1"></i>{{ job.salary }} {{ job.currency }} |

            <i class="bi bi-geo-alt-fill me-1"></i>{{ job.country }} |

            <i class="bi bi-clock-fill me-1"></i>{{ job.job_type }}
          </p>

          <button class="btn btn-primary px-4 rounded-pill" @click="JobStore.fetchJobById(job.id)">
            <i class="bi bi-info-circle me-1"></i>Details
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
