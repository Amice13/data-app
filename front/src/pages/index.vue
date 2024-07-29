<template>
  <div style="height: vh100;" class="d-flex align-center hero-unit">
    <div>
      <div class="tag bg-red">Hello</div>
    </div>
  </div>
</template>

<style>

.tag {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: -2%;
  padding: 1px 3px;
}

.border-color {
  display: flex;
  padding: 24px 32px;
  color: #000;
  border-image-slice: 1;
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(0deg, #2833d0 .01%, #7179ef 17.19%, #bf98c6 48.44%, #f1acac);
}

.underline-color {
  padding-bottom: 9px;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg,#c3aab2 0,#9ec 57.66%,#80c0c8 76.7%,#4b8bfa 100%);
  border-image-slice: 1
}

.hero-unit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>

<script>
export default {
  data () {
    return {
      tab: undefined
    }
  }
}
</script>
