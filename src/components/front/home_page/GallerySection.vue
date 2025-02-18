<template>
  <div class="gallery-section section-padding">
    <div class="d-flex ga-6 justify-center flex-wrap">
      <div class="box position-relative">
        <img src="@/assets/images/organic-juice.jpg" alt="" />
        <p class="text roboto position-absolute">Organic Juice</p>
      </div>
      <div class="box position-relative">
        <img src="@/assets/images/organic-food.jpg" alt="" />
        <p class="text roboto position-absolute">Organic Food</p>
      </div>
      <div class="box position-relative">
        <img src="@/assets/images/nuts-cookis.jpg" alt="" />
        <p class="text roboto position-absolute">Nuts Cookis</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-section {
  user-select: none;
  background-color: #f1f8f4;
  .box {
    min-width: 400px;
    flex: 1;
    max-width: 34vw;
    img {
      width: 100%;
    }
    p {
      color: $arapawa;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px 40px;
      border-radius: 12px;
      font-weight: 500;
    }
  }
}
</style>
