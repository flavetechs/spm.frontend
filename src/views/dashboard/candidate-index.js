import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

import { bindActionCreators } from "redux"
//circular
import Circularprogressbar from '../../components/circularprogressbar.js'

// AOS
import AOS from 'aos'
import 'aos'
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
import { NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode, SchemeDirAction, ColorCustomizerAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode } from '../../store/setting/setting'
import { connect } from "react-redux"
import { getAllStudentDashboardCount } from '../../store/actions/dashboard-actions.js'


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



const CandidateIndex = (props) => {

    const location = useLocation();

    const [studentDashboardCountItem, setStudentDashboardCountItem] = useState({});

    useEffect(async () => {
        await getAllStudentDashboardCount()
        setTimeout(() => {
            setStudentDashboardCountItem(JSON.parse(localStorage.getItem('studentDashboardData')));
        }, 3000)
    }, [location.search])

    useEffect(() => {

        AOS.init({
            startEvent: 'DOMContentLoaded',
            disable: function () {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10
        });
        //   customizer
        const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
        const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
        const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
        if (colorcustomizerMode === null) {
            props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
            document.documentElement.style.setProperty('--bs-info', props.cololrinfomode);

        }
        else {
            props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
            document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);

        }

    })

    const chart1 = {
        options: {
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
                    minHeight: 22,
                    maxHeight: 22,
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
    const chart2 = {
        options: {
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
    const chart3 = {
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: false
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
                    minHeight: 20,
                    maxHeight: 20,
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
            <Row>
                <Col md="12" lg="12">
                    <Row className="row-cols-1">
                        <div className="overflow-hidden d-slider1 ">
                            <Swiper className="p-0 m-0 mb-2 list-inline "
                                slidesPerView={5}
                                spaceBetween={32}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev'
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    550: { slidesPerView: 2 },
                                    991: { slidesPerView: 3 },
                                    1400: { slidesPerView: 4 },
                                    1500: { slidesPerView: 5 },
                                    1920: { slidesPerView: 6 },
                                    2040: { slidesPerView: 7 },
                                    2440: { slidesPerView: 8 }
                                }} data-aos="fade-up" data-aos-delay="700"
                            >
                                <SwiperSlide className="card card-slide" >
                                    <div className="card-body">
                                        <div className="progress-widget" >
                                            {/* <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" Linecap='rounded' trailstroke='#ddd' strokewidth="4px" style={{ width: 60, height: 60, }} value={90} id="circle-progress-01" > */}
                                            <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path></svg>
                                            {/* </Circularprogressbar> */}
                                            <div className="progress-detail">
                                                <p className="mb-2">Total Subjects</p>
                                                <h4 className="counter"><CountUp start={0} end={studentDashboardCountItem?.totalSubjects} duration={3} /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" card card-slide" >
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            {/* <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{ width: 60, height: 60, }} value={60} id="circle-progress-02" > */}
                                            <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.3264 2.20966C12.4861 2.06632 12.6973 1.99119 12.9135 2.00082C17.4843 2.13765 21.3044 5.4558 21.9967 9.89063C22.0011 9.91711 22.0011 9.94411 21.9967 9.97059C22.0116 10.1804 21.9407 10.3874 21.7996 10.5458C21.6586 10.7043 21.459 10.801 21.2451 10.8147L13.5656 11.3211C13.3116 11.3436 13.0597 11.26 12.8718 11.0909C12.6839 10.9218 12.5774 10.6828 12.5785 10.4326L12.0623 2.88932V2.76493C12.0717 2.55278 12.1667 2.353 12.3264 2.20966ZM11.7997 13.2936L18.4558 12.8671L18.5011 12.8848C18.7869 12.8895 19.0591 13.0054 19.2579 13.207C19.4566 13.4087 19.5655 13.6795 19.5606 13.9599C19.2984 17.782 16.4962 20.9755 12.6828 21.7982C8.86938 22.621 4.96017 20.8754 3.08778 17.5139C2.53722 16.5457 2.1893 15.4794 2.06445 14.3775C2.01603 14.051 1.99483 13.7212 2.00106 13.3913C2.01368 9.32706 4.90728 5.81907 8.95607 4.9595C9.4462 4.86776 9.93762 5.11248 10.1515 5.55479C10.2047 5.63505 10.2473 5.72164 10.2782 5.81245C10.3541 6.98405 10.4329 8.14455 10.5113 9.30015C10.5732 10.2128 10.6349 11.1223 10.6948 12.0319C10.6917 12.2462 10.7254 12.4594 10.7944 12.6627C10.9569 13.0627 11.3614 13.3165 11.7997 13.2936Z" fill="currentColor"></path></svg>
                                            {/* </Circularprogressbar> */}
                                            <div className="progress-detail">
                                                <p className="mb-2">Total Assessment</p>
                                                <h4 className="counter"><CountUp start={0} end={studentDashboardCountItem?.totalAssessments} duration={3} /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" card card-slide" >
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            {/* <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{ width: 60, height: 60, }} value={70} id="circle-progress-03" > */}
                                            <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.92574 16.39H14.3119C14.7178 16.39 15.0545 16.05 15.0545 15.64C15.0545 15.23 14.7178 14.9 14.3119 14.9H8.92574C8.5198 14.9 8.18317 15.23 8.18317 15.64C8.18317 16.05 8.5198 16.39 8.92574 16.39ZM12.2723 9.9H8.92574C8.5198 9.9 8.18317 10.24 8.18317 10.65C8.18317 11.06 8.5198 11.39 8.92574 11.39H12.2723C12.6782 11.39 13.0149 11.06 13.0149 10.65C13.0149 10.24 12.6782 9.9 12.2723 9.9ZM19.3381 9.02561C19.5708 9.02292 19.8242 9.02 20.0545 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0545 22H8.17327C5.59901 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5099 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4381 9.02 17.8112 9.02316 18.1377 9.02593C18.3917 9.02809 18.6175 9.03 18.8168 9.03C18.9578 9.03 19.1405 9.02789 19.3381 9.02561ZM19.6111 7.566C18.7972 7.569 17.8378 7.566 17.1477 7.559C16.0527 7.559 15.1507 6.648 15.1507 5.542V2.906C15.1507 2.475 15.6685 2.261 15.9646 2.572C16.5004 3.13476 17.2368 3.90834 17.9699 4.67837C18.7009 5.44632 19.4286 6.21074 19.9507 6.759C20.2398 7.062 20.0279 7.565 19.6111 7.566Z" fill="currentColor"></path>
                        </svg>
                                            {/* </Circularprogressbar> */}
                                            <div className="progress-detail">
                                                <p className="mb-2">Class Notes</p>
                                                <h4 className="counter"><CountUp start={0} end={studentDashboardCountItem?.totaldLessonNotes} duration={3} /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" card card-slide" >
                                    <div className="card-body">
                                        <div className="progress-widget">
                                           {/* <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{ width: 60, height: 60, }} value={70} id="circle-progress-03" > */}
                                           <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.92574 16.39H14.3119C14.7178 16.39 15.0545 16.05 15.0545 15.64C15.0545 15.23 14.7178 14.9 14.3119 14.9H8.92574C8.5198 14.9 8.18317 15.23 8.18317 15.64C8.18317 16.05 8.5198 16.39 8.92574 16.39ZM12.2723 9.9H8.92574C8.5198 9.9 8.18317 10.24 8.18317 10.65C8.18317 11.06 8.5198 11.39 8.92574 11.39H12.2723C12.6782 11.39 13.0149 11.06 13.0149 10.65C13.0149 10.24 12.6782 9.9 12.2723 9.9ZM19.3381 9.02561C19.5708 9.02292 19.8242 9.02 20.0545 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0545 22H8.17327C5.59901 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5099 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4381 9.02 17.8112 9.02316 18.1377 9.02593C18.3917 9.02809 18.6175 9.03 18.8168 9.03C18.9578 9.03 19.1405 9.02789 19.3381 9.02561ZM19.6111 7.566C18.7972 7.569 17.8378 7.566 17.1477 7.559C16.0527 7.559 15.1507 6.648 15.1507 5.542V2.906C15.1507 2.475 15.6685 2.261 15.9646 2.572C16.5004 3.13476 17.2368 3.90834 17.9699 4.67837C18.7009 5.44632 19.4286 6.21074 19.9507 6.759C20.2398 7.062 20.0279 7.565 19.6111 7.566Z" fill="currentColor"></path>
                        </svg>
                                            {/* </Circularprogressbar> */}
                                            <div className="progress-detail">
                                                <p className="mb-2">My Notes</p>
                                                <h4 className="counter"><CountUp start={0} end={studentDashboardCountItem?.studentNotes} duration={3} /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                {/* <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{width:60, height:60,}} value={50} id="circle-progress-05" >
                                                <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Net Income</p>
                                                    <h4 className="counter">$<CountUp  start={35} end={150} duration={3}/>K</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                    <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' Linecap='rounded' strokewidth="4px" value={40}  style={{width:60, height:60,}} id="circle-progress-06">
                                                    <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Today</p>
                                                    <h4 className="counter">$<CountUp  start={652} end={4600} duration={3}/></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide">
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.colorprimarymode}  Linecap='rounded' trailstroke='#ddd' strokewidth="4px" width="60px" height="60px" value={30} style={{width:60, height:60,}} id="circle-progress-07" >
                                                    <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Members</p>
                                                    <h4 className="counter"><CountUp  start={2} end={11.2} duration={3} decimals={1}/>M</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide> */}
                                <div className="swiper-button swiper-button-next"></div>
                                <div className="swiper-button swiper-button-prev"></div>
                            </Swiper>
                        </div>
                    </Row>
                </Col>
                <Col md="12" lg="8">
                    <Row>
                        {/* <Col md="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="800">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">$855.8K</h4>
                                            <p className="mb-0">Gross Sales</p>          
                                        </div>
                                        <div className="d-flex align-items-center align-self-center">
                                            <div className="d-flex align-items-center text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                <span className="text-secondary">Sales</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center ms-3 text-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                    <span className="text-secondary">Cost</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <Chart  options={chart1.options} series={chart1.series} type="area"   height="245"  />
                                    </div>
                                </div>
                            </Col> */}
                        {/* <Col md="12" xl="6">
                                <div className="card" data-aos="fade-up" data-aos-delay="900">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Earnings</h4>            
                                        </div>   
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton1" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className=" dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <Chart className="col-md-8 col-lg-8" options={chart2.options} series={chart2.series} type="radialBar"   height="250"  />
                                            <div className="d-grid gap col-md-4 col-lg-4">
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Fashion</span>
                                                    <h6>251K</h6>
                                                </div>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Accessories</span>
                                                    <h6>176K</h6>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                        {/* <Col md="12" xl="6">
                                <div className="card" data-aos="fade-up" data-aos-delay="1000">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Conversions</h4>            
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton3" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <Chart className="d-activity" options={chart3.options} series={chart3.series} type="bar"   height="230"  />
                                    </div>
                                </div>
                            </Col>          */}
                        <Col md="12" lg="12">
                            <div className="overflow-hidden card" data-aos="fade-up" data-aos-delay="600">
                                <div className="flex-wrap card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="mb-2 card-title">Enterprise Clients</h4>
                                        {/* <p className="mb-0">
                                                <svg className ="me-2" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#3a57e8" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                                </svg>
                                                15 new acquired this month
                                            </p>             */}
                                    </div>
                                </div>
                                <div className="p-0 card-body">
                                    <div className="mt-4 table-responsive">
                                        <table id="basic-table" className="table mb-0 table-striped" role="grid">
                                            <thead>
                                                <tr>
                                                    <th>COMPANIES</th>
                                                    <th>CONTACTS</th>
                                                    <th>ORDER</th>
                                                    <th>COMPLETION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={shapes1} alt="profile" />
                                                            <h6>Addidis Sportwear</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="iq-media-group iq-media-group-1">
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">MM</div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>$14,000</td>
                                                    <td>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <h6>60%</h6>
                                                        </div>
                                                        <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={60} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={shapes5} alt="profile" />
                                                            <h6>Netflixer Platforms</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="iq-media-group iq-media-group-1">
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>$30,000</td>
                                                    <td>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <h6>25%</h6>
                                                        </div>
                                                        <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={25} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={shapes2} alt="profile" />
                                                            <h6>Shopifi Stores</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="iq-media-group iq-media-group-1">
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">TP</div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>$8,500</td>
                                                    <td>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <h6>100%</h6>
                                                        </div>
                                                        <Progress softcolors="success" color="success" className="shadow-none w-100" value={100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={shapes3} alt="profile" />
                                                            <h6>Bootstrap Technologies</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="iq-media-group iq-media-group-1">
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">MM</div>
                                                            </Link>
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">TP</div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>$20,500</td>
                                                    <td>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <h6>100%</h6>
                                                        </div>
                                                        <Progress softcolors="success" color="success" className="shadow-none w-100" value={100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={shapes4} alt="profile" />
                                                            <h6>Community First</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="iq-media-group iq-media-group-1">
                                                            <Link to="#" className="iq-media-1">
                                                                <div className="icon iq-icon-box-3 rounded-pill">MM</div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>$9,800</td>
                                                    <td>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <h6>75%</h6>
                                                        </div>
                                                        <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={75} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md="12" lg="4">
                    <Row>
                        <Col md="12" lg="12">
                            <div className="card credit-card-widget" data-aos="fade-up" data-aos-delay="900">
                                <div className="pb-4 border-0 card-header">
                                    <div className="p-4 border border-white rounded primary-gradient-card">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="font-weight-bold">VISA </h5>
                                                <p className="mb-0">PREMIUM ACCOUNT</p>
                                            </div>
                                            <div className="master-card-content">
                                                <svg className="master-card-1" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                                <svg className="master-card-2" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <div className="card-number">
                                                <span className="fs-5 me-2">5789</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5">2847</span>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Card holder</p>
                                            <p className="mb-0">Expire Date</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6>Mike Smith</h6>
                                            <h6 className="ms-5">06/11</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="flex-wrap mb-4 d-flex align-itmes-center">
                                        <div className="d-flex align-itmes-center me-0 me-md-4">
                                            <div>
                                                <div className="p-3 mb-2 rounded bg-soft-primary">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.9303 7C16.9621 6.92913 16.977 6.85189 16.9739 6.77432H17C16.8882 4.10591 14.6849 2 12.0049 2C9.325 2 7.12172 4.10591 7.00989 6.77432C6.9967 6.84898 6.9967 6.92535 7.00989 7H6.93171C5.65022 7 4.28034 7.84597 3.88264 10.1201L3.1049 16.3147C2.46858 20.8629 4.81062 22 7.86853 22H16.1585C19.2075 22 21.4789 20.3535 20.9133 16.3147L20.1444 10.1201C19.676 7.90964 18.3503 7 17.0865 7H16.9303ZM15.4932 7C15.4654 6.92794 15.4506 6.85153 15.4497 6.77432C15.4497 4.85682 13.8899 3.30238 11.9657 3.30238C10.0416 3.30238 8.48184 4.85682 8.48184 6.77432C8.49502 6.84898 8.49502 6.92535 8.48184 7H15.4932ZM9.097 12.1486C8.60889 12.1486 8.21321 11.7413 8.21321 11.2389C8.21321 10.7366 8.60889 10.3293 9.097 10.3293C9.5851 10.3293 9.98079 10.7366 9.98079 11.2389C9.98079 11.7413 9.5851 12.1486 9.097 12.1486ZM14.002 11.2389C14.002 11.7413 14.3977 12.1486 14.8858 12.1486C15.3739 12.1486 15.7696 11.7413 15.7696 11.2389C15.7696 10.7366 15.3739 10.3293 14.8858 10.3293C14.3977 10.3293 14.002 10.7366 14.002 11.2389Z" fill="currentColor"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h5>1153</h5>
                                                <small className="mb-0">Products</small>
                                            </div>
                                        </div>
                                        <div className="d-flex align-itmes-center">
                                            <div>
                                                <div className="p-3 mb-2 rounded bg-soft-info">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z" fill="currentColor"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h5>81K</h5>
                                                <small className="mb-0">Order Served</small>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="mb-4">
                                            <div className="flex-wrap d-flex justify-content-between">
                                                <h2 className="mb-2">$405,012,300</h2>
                                                <div>
                                                <span className="badge bg-success rounded-pill">YoY 24%</span>
                                                </div>
                                            </div>
                                            <p className="text-info">Life time sales</p>
                                        </div> */}
                                    <div className="grid-cols-2 d-grid gap">
                                        <button className="btn btn-primary text-uppercase">SUMMARY</button>
                                        <button className="btn btn-info text-uppercase">ANALYTICS</button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card" data-aos="fade-up" data-aos-delay="500">
                                    <div className="text-center card-body d-flex justify-content-around">
                                        <div>
                                            <h2 className="mb-2">750<small>K</small></h2>
                                            <p className="mb-0 text-secondary">Website Visitors</p>
                                        </div>
                                        <hr className="hr-vertial"/>
                                        <div>
                                            <h2 className="mb-2">7,500</h2>
                                            <p className="mb-0 text-secondary">New Customers</p>
                                        </div>
                                    </div>
                                </div>  */}
                        </Col>
                        {/* <Col md="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="600">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="mb-2 card-title">Activity overview</h4>
                                            <p className="mb-0">
                                                <svg className ="me-2" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#17904b" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
                                                </svg>
                                                16% this month
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2 d-flex profile-media align-items-top">
                                            <div className="mt-1 profile-dots-pills border-primary"></div>
                                            <div className="ms-4">
                                                <h6 className="mb-1 ">$2400, Purchase</h6>
                                                <span className="mb-0">11 JUL 8:10 PM</span>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex profile-media align-items-top">
                                            <div className="mt-1 profile-dots-pills border-primary"></div>
                                            <div className="ms-4">
                                                <h6 className="mb-1 ">New order #8744152</h6>
                                                <span className="mb-0">11 JUL 11 PM</span>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex profile-media align-items-top">
                                            <div className="mt-1 profile-dots-pills border-primary"></div>
                                            <div className="ms-4">
                                                <h6 className="mb-1 ">Affiliate Payout</h6>
                                                <span className="mb-0">11 JUL 7:64 PM</span>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex profile-media align-items-top">
                                            <div className="mt-1 profile-dots-pills border-primary"></div>
                                            <div className="ms-4">
                                                <h6 className="mb-1 ">New user added</h6>
                                                <span className="mb-0">11 JUL 1:21 AM</span>
                                            </div>
                                        </div>
                                        <div className="mb-1 d-flex profile-media align-items-top">
                                            <div className="mt-1 profile-dots-pills border-primary"></div>
                                            <div className="ms-4">
                                                <h6 className="mb-1 ">Product added</h6>
                                                <span className="mb-0">11 JUL 4:50 AM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateIndex)
