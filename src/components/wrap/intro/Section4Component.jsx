import React from 'react';
import $ from 'jquery';
import './scss/section4.scss';
import axios from 'axios';

export default function Section4Component(){

    const [state, setState] = React.useState({
        sec4Slide:[]
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section4.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    sec4Slide: res.data.sec4_slide
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);

    React.useEffect(()=>{

        const $slideWrap = $('#section4 .slide-wrap');
        const $pageBtn = $('#section4 .page-btn');
        let cnt=0;
        let setId=0;

        function mainSlide(){
            $slideWrap.stop().animate({left: `${-100*cnt}%`}, 0, function(){
                if(cnt>2) cnt=0;
                if(cnt<0) cnt=2;
                $slideWrap.stop().animate({left: `${-100*cnt}%`},0);
            });
            pageNation();
        }

        function prevCount(){
            cnt--;
            mainSlide();
        }

        function nextCount(){
            cnt++;
            mainSlide();
        }

        function autoTimer(){
            clearInterval(setId);
            setId=setInterval(nextCount, 3000);
        }
        autoTimer();

        function pageNation(){
            $pageBtn.removeClass(`on`);
            $pageBtn.eq(cnt>2? 0:cnt).addClass(`on`);
        }

        $pageBtn.each(function(idx){
            $(this).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=idx;
                    mainSlide();
                }
            });
        });

    },[]);


    return (
        <section id="section4">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <div className="slide-container">
                                <div className="slide-view">
                                    <ul className="slide-wrap">
                                        {
                                            state.sec4Slide.map((item, idx)=>{
                                                return(
                                                    <li className="slide slide1" key={idx}>
                                                        <a href="!#">
                                                            <img src={item.src} alt="" />
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="page-btn-box">
                                <a className='page-btn blind on' href="!#">page1</a>
                                <a className='page-btn blind' href="!#">page2</a>
                                <a className='page-btn blind' href="!#">page3</a>
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li><a className='right-top' href="!#"><img src="./img/bn_main1_4.jpg" alt="" /></a></li>
                                <li><a className='right-bottom' href="!#"><img src="./img/bn_main1_5.jpg" alt="" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};