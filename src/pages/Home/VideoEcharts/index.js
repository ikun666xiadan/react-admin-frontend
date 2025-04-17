import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { getVideoData } from "../../../apis/videoData";

// 注册必要的组件
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const VideoEcharts = () => {
  const chartRef = useRef(null); // 使用 useRef 获取 DOM 节点
  const [data,setData] = useState([])
  useEffect(()=>{
    const getData = async ()=>{
      const res = await getVideoData()
      setData(res)
    }
    getData()
  },[])
  useEffect(() => {
    // 初始化图表
    const myChart = echarts.init(chartRef.current);

    // 配置项
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Phone Info",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data
        },
      ],
    };

    // 设置图表配置
    myChart.setOption(option);

    // 组件卸载时销毁图表
    return () => {
      myChart.dispose();
    };
  }, [data]); // 空依赖数组表示只在组件挂载时运行

  return <div ref={chartRef} style={{width:"100%", height: "300px",minHeight: "300px" }} />
};

export default VideoEcharts;