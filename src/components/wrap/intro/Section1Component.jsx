import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import './scss/section1.scss';

export default function Section1Component(){

    const [state, setState] = React.useState({
        sec1Slide: []
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section1.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    sec1Slide: res.data.sec1_slide
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);

    React.useEffect(()=>{

        const $slideWrap = $('#section1 .slide-wrap');
        const $prevBtn = $('#section1 .prev-btn');
        const $nextBtn = $('#section1 .next-btn');
        const $pageBtn = $('#section1 .page-btn');
        let cnt=0;
        let setId=0;

        function mainSlide(){
            $slideWrap.stop().animate({left: `${-100*cnt}%`}, 200, function(){
                if(cnt>=2) cnt=0;
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

        $prevBtn.on({
            click(e){
                clearInterval(setId);
                e.preventDefault();
                prevCount();
            }
        })

        $nextBtn.on({
            click(e){
                clearInterval(setId);
                e.preventDefault();
                nextCount();
            }
        })

        function pageNation(){
            $pageBtn.removeClass(`on`);
            $pageBtn.eq(cnt>=2? 0:cnt).addClass(`on`);
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
        <section id="section1">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul className="slide-wrap">
                                    {
                                        state.sec1Slide.map((item, idx)=>{
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
                        <a className='prev-btn' href="!#"><img src="./img/prev_arrow_btn.png" alt="" /></a>
                        <a className='next-btn' href="!#"><img src="./img/next_arrow_btn.png" alt="" /></a>
                        <div className="page-btn-box">
                            <a className='page-btn blind on' href="!#">page1</a>
                            <a className='page-btn blind' href="!#">page2</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};