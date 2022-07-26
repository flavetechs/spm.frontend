import React, {useEffect} from 'react'
import { Row,Col,Dropdown,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {bindActionCreators} from "redux"
//circular
import Circularprogressbar from '../../components/circularprogressbar.js'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from '../../components/progress.js'
//img
import shapes1 from '../../assets/images/shapes/01.png'
import shapes2 from '../../assets/images/shapes/02.png'
import shapes3 from '../../assets/images/shapes/03.png'
import shapes4 from '../../assets/images/shapes/04.png'
import shapes5 from '../../assets/images/shapes/05.png'

//Count-up
import CountUp from 'react-countup';
// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode,  getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"
import AdminDashboard from '../../components/smp-dashboard/admin-dashboard.js'

  
// install Swiper modules
SwiperCore.use([Navigation]);

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})



const Index = (props) => {


    // useEffect(() => {
    // AOS.init({
    //     startEvent: 'DOMContentLoaded',
    //     disable:  function() {
    //       var maxWidth = 996;
    //       return window.innerWidth < maxWidth;
    //     },
    //     throttleDelay: 10,
    //     once: true,
    //     duration: 700,
    //     offset: 10
    //   });
    // //   customizer
    // const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
    // const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
    // const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
    // if(colorcustomizerMode===null){
    //     props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
    //     document.documentElement.style.setProperty('--bs-info', props.cololrinfomode );
       
    // }
    // else{
    //     props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
    //     document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
            
    // }
    
      
    // })

    const chart1={
        options : {
            chart: {
                fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: false,
                }
            },
            colors: [props.colorprimarymode, props.cololrinfomode],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            yaxis: {
                show: true,
                labels: {
                show: true,
                minWidth: 19,
                maxWidth: 19,
                style: {
                    colors: "#8A92A6",
                },
                offsetX: -5,
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
            labels: {
                minHeight:22,
                maxHeight:22,
                show: true,
                style: {
                    colors: "#8A92A6",
                },
            },
            lines: {
                show: false  //or just here to disable only x axis grids
            },
            categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"]
         },
            grid: {
                show: false,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "vertical",
                    shadeIntensity: 0,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: .4,
                    opacityTo: .1,
                    stops: [0, 50, 80],
                    colors: [props.colorprimarymode, props.cololrinfomode]
                }
            },
            tooltip: {
                enabled: true,
            },
    },
        series: [{
            name: 'total',
            data: [94, 80, 94, 80, 94, 80, 94]
        }, {
            name: 'pipline',
            data: [72, 60, 84, 60, 74, 60, 78]
        }]
        
        
    }
    
  //chart2
    const chart2 ={
        options : {
        colors: [props.colorprimarymode, props.cololrinfomode],
        plotOptions: {
            radialBar: {
            hollow: {
                margin: 10,
                size: "50%",
            },
            track: {
                margin: 10,
                strokeWidth: '50%',
            },
            dataLabels: {
                show: false,
            }
            }
        },
        labels: ['Apples', 'Oranges'],
        },
        series: [55, 75],
    }
    const chart3={
        options : {
            chart: {
            stacked: true,
            toolbar: {
                show:false
                }
            },
            colors: [props.colorprimarymode, props.cololrinfomode],
            plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '28%',
                endingShape: 'rounded',
                borderRadius: 5,
            },
            },
            legend: {
            show: false
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
            },
            xaxis: {
            categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W'],
            labels: {
                minHeight:20,
                maxHeight:20,
                style: {
                colors: "#8A92A6",
                },
            }
            },
            yaxis: {
            title: {
                text: ''
            },
            labels: {
                minWidth: 19,
                maxWidth: 19,
                style: {
                    colors: "#8A92A6",
                },
            }
            },
            fill: {
            opacity: 1
            },
            tooltip: {
            y: {
                formatter: function (val) {
                return "$ " + val + " thousands"
                }
            }
            }
        },
        series: [{
            name: 'Successful deals',
            data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35,]
        }, {
            name: 'Failed deals',
            data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55]
        }]
    }
        return (
            <>
               <AdminDashboard
               darkMode={props.darkMode} 
               customizerMode={props.customizerMode} 
               cololrinfomode={props.cololrinfomode} 
               colorprimarymode={props.colorprimarymode} 
               schemeDirMode={props.schemeDirMode} 
               sidebarcolorMode={props.sidebarcolorMode} 
               sidebarTypeMode={props.sidebarTypeMode} 
               sidebaractivestyleMode={props.sidebaractivestyleMode} 
               navbarstylemode={props.navbarstylemode}

               ModeAction={ModeAction}
               SchemeDirAction={SchemeDirAction}
               SidebarColorAction={SidebarColorAction}
               SidebarActiveStyleAction={SidebarActiveStyleAction}
               NavbarstyleAction={NavbarstyleAction}
               ColorCustomizerAction={ColorCustomizerAction}
               />
            </>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Index)

