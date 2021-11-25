<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd  HH:mm:ss" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <el-row :gutter="10">
      <el-col :span="16"><div ref="chart1" style="height: 350px"/></el-col>
      <el-col :span="8"><div ref="chart2" style="height: 400px"/></el-col>

    </el-row>
    <hr>
    <el-row :gutter="20">
      <el-col :span="12"><div ref="chart3" style="height: 350px"/></el-col>
      <el-col :span="12"><div ref="chart4" style="height: 350px"/></el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import statisticsApi from '@/api/bill/billStatistics'

export default {
  data() {
    return {
      btnDisabled: false,
      searchObj: {
        begin: '',
        end: ''
      }
    }
  },

  mounted() {
    this.showChart()
  },
  methods: {

    showChart() {
      this.showChart1()
      this.showChart4()
    },

    // 展示图表
    showChart1() {
      statisticsApi.indexReveal(this.searchObj).then(response => {
        this.chart1 = response.data.statList
        this.Chart1(this.chart1)
        this.chart2 = response.data.billType
        this.Chart2(this.chart2)
        this.chart3 = response.data.listRank
        this.Chart3(this.chart3)
        this.chart4 = response.data.listDistribution
        this.Chart4(this.chart4)
      })
    },

    showChart4() {
      this.Chart4()
    },

    Chart1(data1) {
      var option = {
        title: {
          text: '统计图(日)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入', '支出', '中性']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data1[3]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收入',
            type: 'line',
            data: data1[0]
          },
          {
            name: '支出',
            type: 'line',
            data: data1[1]
          },
          {
            name: '中性',
            type: 'line',
            data: data1[2]
          }
        ]
      }
      var myChart = echarts.init(this.$refs.chart1)
      myChart.setOption(option)
    },

    Chart2(data2) {
      // 基于准备好的dom，初始化echarts实例
      this.chart2 = echarts.init(this.$refs.chart2)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '账单消费类型占比图(元)',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: data2,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart2.setOption(option)
    },

    Chart3(data3) {
      var option = {
        title: {
          text: '单笔消费排行榜(元)',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data3[0],
          axisLabel: { interval: 0, rotate: 45 }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data3[1],
          type: 'bar'
        }]
      }
      var myChart = echarts.init(this.$refs.chart3)
      myChart.setOption(option)
    },

    Chart4(data3) {
      var option = {
        title: {
          text: '交易时间分布(笔)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 7,
            color: 'green'
          }, {
            gt: 7,
            lte: 9,
            color: 'red'
          },
          {
            gt: 9,
            lte: 11,
            color: 'green'
          }, {
            gt: 11,
            lte: 13,
            color: 'red'
          },
          {
            gt: 13,
            lte: 18,
            color: 'green'
          }, {
            gt: 18,
            lte: 20,
            color: 'red'
          }, {
            gt: 20,
            color: 'green'
          }]
        },
        series: [
          {
            name: '笔',
            type: 'line',
            smooth: true,
            data: data3,
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [[{
                name: '早餐',
                xAxis: '07:00'
              }, {
                xAxis: '09:00'
              }], [{
                name: '午餐',
                xAxis: '11:00'
              }, {
                xAxis: '13:00'
              }], [{
                name: '晚餐',
                xAxis: '18:00'
              }, {
                xAxis: '20:00'
              }]]
            }
          }
        ]
      }
      var myChart = echarts.init(this.$refs.chart4)
      myChart.setOption(option)
    }
  }
}
</script>
