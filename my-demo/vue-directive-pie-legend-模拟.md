
```js

import Vue from 'vue'
 
Vue.directive('tooltip-listener', {
  bind (el, binding, vnode) {
    ['click', 'mouseenter', 'mouseleave', 'mousewheel'].forEach(item => {
      el.addEventListener(item, e => {
        if (e.type === 'mousewheel') vnode.context.disabled = true
        if (e.type === 'mouseenter') vnode.context.disabled = e.target.scrollWidth > e.target.offsetWidth ? false : true
        vnode.context.$emit('legendEvent', binding.value, e.type)
      }, true)
    })
  }
})
 
<script>
import {COLORS} from '@/utils'
 
export default {
  name: 'pie-legend',
  props: {
    res: {
      type: Array,
      default () {
        return [
          // {value:335, name:'直接访问直接访问直接访问直接访问直接'},
          // {value:314564564560, name:'邮件营销'},
          // {value:45456456456, name:'联盟广告'},
          // {value:145645635, name:'视频广频广频广频广频广频广频广频广频广频广告'},
          // {value:'2328823.66', name:'搜索引擎'}
        ]
      }
    },
    layoutVertical: {
      type: Boolean,
      default: true
    },
    legendDataShow: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    res (newVal) {
      if (newVal) {
        let arr = [...newVal]
        let total = arr.reduce((total, item) => total += +item.value, 0)
        this.legends = arr.map((item, index) => {
          return {
            name: item.name,
            color: COLORS[index],
            isDisabled: false,
            percent: (+item.value / total * 100).toFixed(2) + '%',
            value: item.value + '万元'
          }
        })
      }
    }
  },
  data () {
    return {
      disabled: false,
      legends: []
    }
  }
}
</script>
 
<template>
  <div class='pie-legend'>
    <ul>
      <li 
        v-for="(item, i) in legends" 
        :key="item.color" 
        @click="legends[i].isDisabled = !legends[i].isDisabled"
        :style="{
          width: layoutVertical ? '100%' : '47%', 
          display: layoutVertical? 'block' : 'inline-block',
          marginRight: layoutVertical? '0' : '3%'}">
        <el-row 
          :gutter="15" 
          justify="space-around" 
          style="margin-top: 20px;">
          <el-col :span="legendDataShow ? 10 : 15">
            <span 
              class="legendColor" 
              :style="{background: item.isDisabled ? '#ccc' : item.color}"
              v-tooltip-listener="item.name">
            </span>
            <el-tooltip 
              :disabled="disabled" 
              effect="dark" 
              :content="item.name"
              placement="top-start" 
              :enterable="false">
              <span 
                class="legendName"
                :style="{color: item.isDisabled ? '#ccc' : '#333'}"
                v-tooltip-listener="item.name">
                {{ item.name }}
              </span>
            </el-tooltip>
          </el-col>
          <el-col :span="legendDataShow ? 7 : 9">
            <span 
              class="legendPercent" 
              :style="{color: item.isDisabled ? '#ccc' : '#666'}"
              v-tooltip-listener="item.name">
              {{ item.percent }}
            </span>
          </el-col>
          <el-col :span="7" v-if="legendDataShow">
            <el-tooltip 
              :disabled="disabled" 
              effect="dark" 
              :content="item.value"
              placement="top-start" 
              :enterable="false">
              <span 
                class="legendData" 
                :style="{color: item.isDisabled ? '#ccc' : '#666'}"
                v-tooltip-listener="item.name">
                {{ item.value }}
              </span>
            </el-tooltip>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>
 
<style>
.pie-legend {
  margin: 0 auto;
  font-size: 12px;
  user-select: none;
}
 
.pie-legend .legendColor {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 6px;
}
.pie-legend .legendColor,
.pie-legend .legendName,
.pie-legend .legendPercent,
.pie-legend .legendData {
  cursor: pointer;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.pie-legend .legendName {
  width: calc(100% - 25px);
}
.pie-legend .legendData,
.pie-legend .legendPercent {
  width: 100%;
}
</style>
```