import { computed } from "vue";
import { useRoute } from "vue-router";

const pagination = () => {
  const route = useRoute();
  const shouldShowPagination = computed(() => {
    return (
      !loading.value &&
      totalPage.value > 1 &&
      (route.query.page ? Number(route.query.page) <= totalPage.value : true)
    );
  });
  return { shouldShowPagination };
};
export default pagination;
