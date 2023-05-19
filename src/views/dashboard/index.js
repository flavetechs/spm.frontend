import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

import { bindActionCreators } from "redux"
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
import {
    NavbarstyleAction,
    getDirMode,
    getcustomizerMode,
    getcustomizerprimaryMode,
    getcustomizerinfoMode,
    SchemeDirAction,
    ColorCustomizerAction,
    getNavbarStyleMode,
    getSidebarActiveMode,
    SidebarActiveStyleAction,
    getDarkMode,
    ModeAction,
    SidebarColorAction,
    getSidebarColorMode,
    getSidebarTypeMode,
} from '../../store/setting/setting'
import { connect } from "react-redux"
import { getUserDetails, hasAccess, NavPermissions } from '../../utils/permissions.js'
import { getAllDashboardCount } from '../../store/actions/dashboard-actions.js'
import HowTo from '../howto.js'
import AppSetupProgress from '../app-setup-progress.js'


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
        feature: 'session'
    };
}
const mapDispatchToProps = dispatch => (
    {
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
        ),
    }
)


const Index = (props) => {
    const location = useLocation();
    const [dashboardCount, setDashboardCount] = useState({});

    const [userDetail, setGetUserDetail] = useState({});
    React.useEffect(() => {
        getUserDetails().then((result) => {
            setGetUserDetail(result);
        })
    }, []);

    useEffect(async () => {
        await getAllDashboardCount().then(res => {
            setTimeout(() => {
                const dash = JSON.parse(localStorage.getItem('dashboardCount'));
                dash && setDashboardCount(dash);

            }, 3000)

        })

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


    });


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
                                {hasAccess(NavPermissions.totalEnrolledStudent) && (
                                    <SwiperSlide className="card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget" >
                                                <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.1583 8.23285C16.1583 10.5825 14.2851 12.4666 11.949 12.4666C9.61292 12.4666 7.73974 10.5825 7.73974 8.23285C7.73974 5.88227 9.61292 4 11.949 4C14.2851 4 16.1583 5.88227 16.1583 8.23285ZM11.949 20C8.51785 20 5.58809 19.456 5.58809 17.2802C5.58809 15.1034 8.49904 14.5396 11.949 14.5396C15.3802 14.5396 18.31 15.0836 18.31 17.2604C18.31 19.4362 15.399 20 11.949 20ZM17.9571 8.30922C17.9571 9.50703 17.5998 10.6229 16.973 11.5505C16.9086 11.646 16.9659 11.7748 17.0796 11.7946C17.2363 11.8216 17.3984 11.8369 17.5631 11.8414C19.2062 11.8846 20.6809 10.821 21.0883 9.21974C21.6918 6.84123 19.9198 4.7059 17.6634 4.7059C17.4181 4.7059 17.1835 4.73201 16.9551 4.77884C16.9238 4.78605 16.8907 4.80046 16.8728 4.82838C16.8513 4.8626 16.8674 4.90853 16.8889 4.93825C17.5667 5.8938 17.9571 7.05918 17.9571 8.30922ZM20.6782 13.5126C21.7823 13.7296 22.5084 14.1727 22.8093 14.8166C23.0636 15.3453 23.0636 15.9586 22.8093 16.4864C22.349 17.4851 20.8654 17.8058 20.2887 17.8886C20.1696 17.9066 20.0738 17.8031 20.0864 17.6833C20.3809 14.9157 18.0377 13.6035 17.4315 13.3018C17.4055 13.2883 17.4002 13.2676 17.4028 13.255C17.4046 13.246 17.4154 13.2316 17.4351 13.2289C18.7468 13.2046 20.1571 13.3847 20.6782 13.5126ZM6.43711 11.8413C6.60186 11.8368 6.76304 11.8224 6.92063 11.7945C7.03434 11.7747 7.09165 11.6459 7.02718 11.5504C6.4004 10.6228 6.04313 9.50694 6.04313 8.30913C6.04313 7.05909 6.43353 5.89371 7.11135 4.93816C7.13284 4.90844 7.14806 4.86251 7.12746 4.82829C7.10956 4.80127 7.07553 4.78596 7.04509 4.77875C6.81586 4.73192 6.58127 4.70581 6.33593 4.70581C4.07951 4.70581 2.30751 6.84114 2.91191 9.21965C3.31932 10.8209 4.79405 11.8845 6.43711 11.8413ZM6.59694 13.2545C6.59962 13.268 6.59425 13.2878 6.56918 13.3022C5.9621 13.6039 3.61883 14.9161 3.91342 17.6827C3.92595 17.8034 3.83104 17.9061 3.71195 17.889C3.13531 17.8061 1.65163 17.4855 1.19139 16.4867C0.936203 15.9581 0.936203 15.3457 1.19139 14.817C1.49225 14.1731 2.21752 13.73 3.32156 13.512C3.84358 13.385 5.25294 13.2049 6.5656 13.2292C6.5853 13.2319 6.59515 13.2464 6.59694 13.2545Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                <div className="progress-detail">
                                                    <p className="mb-2">Students</p>
                                                    <h4 className="counter"><CountUp start={0} end={dashboardCount?.totaldStudent} duration={3} /></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}

                                {hasAccess(NavPermissions.totalStaff) && (
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.2124 7.76241C14.2124 10.4062 12.0489 12.5248 9.34933 12.5248C6.6507 12.5248 4.48631 10.4062 4.48631 7.76241C4.48631 5.11865 6.6507 3 9.34933 3C12.0489 3 14.2124 5.11865 14.2124 7.76241ZM2 17.9174C2 15.47 5.38553 14.8577 9.34933 14.8577C13.3347 14.8577 16.6987 15.4911 16.6987 17.9404C16.6987 20.3877 13.3131 21 9.34933 21C5.364 21 2 20.3666 2 17.9174ZM16.1734 7.84875C16.1734 9.19506 15.7605 10.4513 15.0364 11.4948C14.9611 11.6021 15.0276 11.7468 15.1587 11.7698C15.3407 11.7995 15.5276 11.8177 15.7184 11.8216C17.6167 11.8704 19.3202 10.6736 19.7908 8.87118C20.4885 6.19676 18.4415 3.79543 15.8339 3.79543C15.5511 3.79543 15.2801 3.82418 15.0159 3.87688C14.9797 3.88454 14.9405 3.90179 14.921 3.93246C14.8955 3.97174 14.9141 4.02253 14.9396 4.05607C15.7233 5.13216 16.1734 6.44206 16.1734 7.84875ZM19.3173 13.7023C20.5932 13.9466 21.4317 14.444 21.7791 15.1694C22.0736 15.7635 22.0736 16.4534 21.7791 17.0475C21.2478 18.1705 19.5335 18.5318 18.8672 18.6247C18.7292 18.6439 18.6186 18.5289 18.6333 18.3928C18.9738 15.2805 16.2664 13.8048 15.5658 13.4656C15.5364 13.4493 15.5296 13.4263 15.5325 13.411C15.5345 13.4014 15.5472 13.3861 15.5697 13.3832C17.0854 13.3545 18.7155 13.5586 19.3173 13.7023Z" fill="currentColor">

                                                    </path>
                                                </svg>
                                                <div className="progress-detail">
                                                    <p className="mb-2">Teachers</p>
                                                    <h4 className="counter"><CountUp start={0} end={dashboardCount?.totalStaff} duration={3} /></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                                {hasAccess(NavPermissions.totalSubjects) && (
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                {/* <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" Linecap='rounded' trailstroke='#ddd' strokewidth="4px" style={{ width: 60, height: 60, }} value={90} id="circle-progress-01" > */}
                                                <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path></svg>
                                                {/* </Circularprogressbar> */}
                                                <div className="progress-detail">
                                                    <p className="mb-2">Subjects</p>
                                                    <h4 className="counter"><CountUp start={0} end={dashboardCount?.totalSubjects} duration={3} /></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                                {hasAccess(NavPermissions.totalClasses) && (
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M13.3051 5.88243V6.06547C12.8144 6.05584 12.3237 6.05584 11.8331 6.05584V5.89206C11.8331 5.22733 11.2737 4.68784 10.6064 4.68784H9.63482C8.52589 4.68784 7.62305 3.80152 7.62305 2.72254C7.62305 2.32755 7.95671 2 8.35906 2C8.77123 2 9.09508 2.32755 9.09508 2.72254C9.09508 3.01155 9.34042 3.24276 9.63482 3.24276H10.6064C12.0882 3.2524 13.2953 4.43736 13.3051 5.88243Z" fill="currentColor"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.164 6.08279C15.4791 6.08712 15.7949 6.09145 16.1119 6.09469C19.5172 6.09469 22 8.52241 22 11.875V16.1813C22 19.5339 19.5172 21.9616 16.1119 21.9616C14.7478 21.9905 13.3837 22.0001 12.0098 22.0001C10.6359 22.0001 9.25221 21.9905 7.88813 21.9616C4.48283 21.9616 2 19.5339 2 16.1813V11.875C2 8.52241 4.48283 6.09469 7.89794 6.09469C9.18351 6.07542 10.4985 6.05615 11.8332 6.05615C12.3238 6.05615 12.8145 6.05615 13.3052 6.06579C13.9238 6.06579 14.5425 6.07427 15.164 6.08279ZM10.8518 14.7459H9.82139V15.767C9.82139 16.162 9.48773 16.4896 9.08538 16.4896C8.67321 16.4896 8.34936 16.162 8.34936 15.767V14.7459H7.30913C6.90677 14.7459 6.57311 14.4279 6.57311 14.0233C6.57311 13.6283 6.90677 13.3008 7.30913 13.3008H8.34936V12.2892C8.34936 11.8942 8.67321 11.5667 9.08538 11.5667C9.48773 11.5667 9.82139 11.8942 9.82139 12.2892V13.3008H10.8518C11.2542 13.3008 11.5878 13.6283 11.5878 14.0233C11.5878 14.4279 11.2542 14.7459 10.8518 14.7459ZM15.0226 13.1177H15.1207C15.5231 13.1177 15.8567 12.7998 15.8567 12.3952C15.8567 12.0002 15.5231 11.6727 15.1207 11.6727H15.0226C14.6104 11.6727 14.2866 12.0002 14.2866 12.3952C14.2866 12.7998 14.6104 13.1177 15.0226 13.1177ZM16.7007 16.4318H16.7988C17.2012 16.4318 17.5348 16.1139 17.5348 15.7092C17.5348 15.3143 17.2012 14.9867 16.7988 14.9867H16.7007C16.2885 14.9867 15.9647 15.3143 15.9647 15.7092C15.9647 16.1139 16.2885 16.4318 16.7007 16.4318Z" fill="currentColor"></path>
                                                </svg>
                                                <div className="progress-detail">
                                                    <p className="mb-2">Total Class</p>
                                                    <h4 className="counter"><CountUp start={0} end={dashboardCount?.totalClass} duration={2} /></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}

                                <SwiperSlide className=" card card-slide" >
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            {/* <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{ width: 60, height: 60, }} value={60} id="circle-progress-02" > */}
                                            <svg width="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.3264 2.20966C12.4861 2.06632 12.6973 1.99119 12.9135 2.00082C17.4843 2.13765 21.3044 5.4558 21.9967 9.89063C22.0011 9.91711 22.0011 9.94411 21.9967 9.97059C22.0116 10.1804 21.9407 10.3874 21.7996 10.5458C21.6586 10.7043 21.459 10.801 21.2451 10.8147L13.5656 11.3211C13.3116 11.3436 13.0597 11.26 12.8718 11.0909C12.6839 10.9218 12.5774 10.6828 12.5785 10.4326L12.0623 2.88932V2.76493C12.0717 2.55278 12.1667 2.353 12.3264 2.20966ZM11.7997 13.2936L18.4558 12.8671L18.5011 12.8848C18.7869 12.8895 19.0591 13.0054 19.2579 13.207C19.4566 13.4087 19.5655 13.6795 19.5606 13.9599C19.2984 17.782 16.4962 20.9755 12.6828 21.7982C8.86938 22.621 4.96017 20.8754 3.08778 17.5139C2.53722 16.5457 2.1893 15.4794 2.06445 14.3775C2.01603 14.051 1.99483 13.7212 2.00106 13.3913C2.01368 9.32706 4.90728 5.81907 8.95607 4.9595C9.4462 4.86776 9.93762 5.11248 10.1515 5.55479C10.2047 5.63505 10.2473 5.72164 10.2782 5.81245C10.3541 6.98405 10.4329 8.14455 10.5113 9.30015C10.5732 10.2128 10.6349 11.1223 10.6948 12.0319C10.6917 12.2462 10.7254 12.4594 10.7944 12.6627C10.9569 13.0627 11.3614 13.3165 11.7997 13.2936Z" fill="currentColor"></path></svg>
                                            {/* </Circularprogressbar> */}
                                            <div className="progress-detail">
                                                <p className="mb-2">Assessment</p>
                                                <h4 className="counter"><CountUp start={0} end={dashboardCount?.totalAssessments} duration={3} /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <div className="swiper-button swiper-button-next"></div>
                                <div className="swiper-button swiper-button-prev"></div>
                            </Swiper>
                        </div>
                    </Row>
                </Col>
                <Col md="12" lg="8">
                    <Row>
                        <Col md="12" >
                            <AppSetupProgress />
                        </Col>
                        <Col md="12" xl="6">
                            <div className="card" data-aos="fade-up" data-aos-delay="900">
                                <div className="flex-wrap card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Students</h4>
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
                                        <Chart className="col-md-8 col-lg-8" options={chart2.options} series={chart2.series} type="radialBar" height="250" />
                                        <div className="d-grid gap col-md-4 col-lg-4">
                                            <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Enrolled</span>
                                                    <h6>0</h6>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Unenrolled</span>
                                                    <h6>0</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md="12" lg="4">
                    <Row>
                        <Col md="12">
                            <HowTo />
                        </Col>


                    </Row>
                </Col>


            </Row>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
