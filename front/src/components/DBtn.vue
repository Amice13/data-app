<template>
  <button
    class="diia-btn"
    v-bind:class="{'diia-btn-animated': animated,  'btn-secondary': secondary, 'btn-small': size === 'small' }"
  >
    <a :href="href"><slot></slot></a>
  </button>
</template>

<style>
.diia-btn:disabled {
  background: #000 !important;
  opacity: 0.2 !important;
}
.diia-btn.diia-btn-animated:disabled::before {
  display: none;
}

.diia-btn.btn-secondary {
  background: #000;
  transition: none;
}

.diia-btn.btn-secondary:hover {
  background: linear-gradient(87.92deg,#2833d0,#7179ef 34.8%,#bf98c6 70.37%,#f1acac 118.85%);
}

.diia-btn.btn-secondary::before {
  margin: 2px 0px 2px 2.5px;
  width: calc(100% - 5px);
  height: calc(100% - 4px);
  background: #FFF !important;
  padding: 5px !important;
  opacity: 1;
  border-radius: 40px;
}


.diia-btn.btn-secondary a {
  color: #000;
}

.diia-btn {
  background: #000;
  display: inline-block;
  border-radius: 40px;
  color: #fff;
  border: none;
  position: relative;
  overflow: hidden;
  transition: background-color .5s;
  letter-spacing: -.02em
}

.diia-btn:hover {
  background: 0 0
}

.diia-btn::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  transition: opacity .5s;
  background: linear-gradient(87.92deg,#2833d0,#7179ef 34.8%,#bf98c6 70.37%,#f1acac 118.85%);
}

.diia-btn:hover::before {
  opacity: 1;
}

.diia-btn.btn-small > a {
  font-size: 11px;
  padding: 8px 20px;
}

.diia-btn > a {
  font-size: 13px;
  font-weight: 300;
  font-family: 'eUkraine', Arial;
  position: relative;
  display: block;
  padding: 12px 30px;
  color: #fff;
  z-index: 2;
  text-decoration: none;
}

.diia-btn.diia-btn-animated::before {
  background-image: linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%), linear-gradient(336deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%);
  background-size: 200% 300%;
  animation-timeline: auto;
  animation-range-start: normal;
  animation-range-end: normal;
  transition: all 0.2s ease-in-out 0s;
  animation: 10s ease 0s infinite normal none running granimate;
}

</style>

<script>
export default {
  props: {
    size: {
      type: String
    },
    animated: {
      type: Boolean
    },
    secondary: {
      type: Boolean
    },
    href: {
      type: String,
      default: '#'
    }
  }
}
</script>