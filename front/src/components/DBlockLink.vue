<template>
  <div class="d-block-link">
    <a @click="$router.push(href)" target="_blank" rel="nofollow" class="d-block-link-service">
      <slot></slot>
    </a>
  </div>
</template>

<style>

.d-block-link a {
  text-decoration: none;
}

.d-block-link {
    border-top: 2px solid #000
}

.d-block-link .services-byletter_title a {
    font-size: 18px;
    line-height: 28px;
    font-weight: 400
}

@media (max-width: 991px) {
    .d-block-link .services-byletter_title a {
        font-size:13px;
        line-height: 18px
    }
}

.d-block-link:last-child {
    border-bottom: 2px solid #000
}

.d-block-link-quest {
    cursor: pointer
}

.d-block-link-service,.d-block-link-quest {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 45px 100px 45px 0;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: -0.02em;
    color: #000;
    transition: padding .4s, background .4s
}

@media (min-width: 992px) and (max-width: 1279px) {
    .d-block-link-service,.d-block-link-quest {
        padding:35px 80px 35px 0
    }
}

@media (max-width: 991px) {
    .d-block-link-service,.d-block-link-quest {
        font-size:16px;
        line-height: 28px;
        padding: 15px 25px 15px 0;
        min-height: auto
    }
}

.d-block-link-service:before,.d-block-link-quest:before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -12px;
    right: 3px;
    width: 24px;
    height: 24px;
    transition: 0.2s ease-in-out;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuMDAwMSAzSDExLjAwMDFWMTFMMyAxMVYxM0gxMS4wMDAxVjIxSDEzLjAwMDFWMTNIMjFWMTFMMTMuMDAwMSAxMVYzWiIgZmlsbD0iYmxhY2siIC8+Cjwvc3ZnPg==")
}

@media (max-width: 991px) {
    .d-block-link-service:before,.d-block-link-quest:before {
        width:16px;
        height: 16px;
        margin-top: -8px
    }
}

.d-block-link-service.active:before,.d-block-link-quest.active:before {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMSAxMVYxM0wzIDEzTDMgMTFMMjEgMTFaIiBmaWxsPSJibGFjayIgLz4KPC9zdmc+")
}

.d-block-link-service:hover:not(.active),.d-block-link-quest:hover:not(.active) {
    padding-left: 35px;
    background: #000;
    color: #fff
}

@media (max-width: 991px) {
    .d-block-link-service:hover:not(.active),.d-block-link-quest:hover:not(.active) {
        padding-left:25px
    }
}

.d-block-link-service:hover:not(.active):before,.d-block-link-quest:hover:not(.active):before {
    right: 35px;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuMDAwMSAzSDExLjAwMDFWMTFMMyAxMVYxM0gxMS4wMDAxVjIxSDEzLjAwMDFWMTNIMjFWMTFMMTMuMDAwMSAxMVYzWiIgZmlsbD0id2hpdGUiIC8+Cjwvc3ZnPg==")
}

@media (max-width: 991px) {
    .d-block-link-service:hover:not(.active):before,.d-block-link-quest:hover:not(.active):before {
        right:15px
    }
}

.d-block-link-service:before {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xIDExLjYwNjVMMjIuMjU4NyAxMS42NTJNMjIuMjU4NyAxMS42NTJMMTEuNjA2NyAxTTIyLjI1ODcgMTEuNjUyTDExLjY1MjEgMjIuMjU4NiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIC8+Cjwvc3ZnPg==")
}

.d-block-link-service:hover:not(.active):before {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xIDExLjYwNjVMMjIuMjU4NyAxMS42NTJNMjIuMjU4NyAxMS42NTJMMTEuNjA2NyAxTTIyLjI1ODcgMTEuNjUyTDExLjY1MjEgMjIuMjU4NiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiAvPgo8L3N2Zz4=")
}

.d-block-link-link {
    max-width: 50%;
    flex: 0 1 50%;
    margin-bottom: 25px;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.02em;
    color: #000
}

.d-block-link-link-box {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px
}

@media (max-width: 991px) {
    .d-block-link-link-box {
        margin-bottom:15px
    }
}

@media (max-width: 767px) {
    .d-block-link-link {
        max-width:100%;
        flex: 0 1 100%;
        font-size: 13px;
        line-height: 18px
    }
}

@media (max-width: 991px) {
    .d-block-link-link {
        margin-bottom:15px
    }
}

.d-block-link-link:nth-child(even) {
    padding-left: 15px
}

@media (max-width: 767px) {
    .d-block-link-link:nth-child(even) {
        padding-left:0
    }
}

.d-block-link-link:nth-child(odd) {
    padding-right: 15px
}

@media (max-width: 767px) {
    .d-block-link-link:nth-child(odd) {
        padding-right:0
    }
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
  props: {
    href: {
      type: String,
      default: '#'
    }
  }
}
</script>
