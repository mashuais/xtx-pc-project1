<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[0].id">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <goods-name :goods="goods"></goods-name>
          <!-- 规格组件 -->
          <goods-sku :goods="goods" @change="changeSku"></goods-sku>
          <!-- 数量选择组件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs :goods="goods"></goods-tabs>
          <!-- 注意事项 -->
          <goods-warn></goods-warn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import { nextTick, ref, watch, provide } from 'vue'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components//goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'

export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsName, GoodsSales, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup() {
    const goods = useGoods()
    // sku改变时候触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    // 选择的数量
    const num = ref(1)
    // 提供goods数据给后代组件使用
    provide('goods', goods)
    return { goods, changeSku, num }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
        // console.log(data)
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
