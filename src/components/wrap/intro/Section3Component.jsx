import React from 'react';
import './scss/section3.scss';
import $ from 'jquery';
import axios from 'axios';

export default function Section3Component(){

    const [state, setState] = React.useState({
        sec3Slide:[]
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section3.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    sec3Slide: res.data.sec3_slide
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    React.useEffect(()=>{

        const $slideWrap = $('#section3 .slide-wrap');
        const $prevBtn = $('#section3 .prev-btn');
        const $nextBtn = $('#section3 .next-btn');
        let cnt=0;
        let setId=0;

        function mainSlide(){
            $slideWrap.stop().animate({left: `${-100*cnt}%`}, 0, function(){
                if(cnt>2) cnt=0;
                if(cnt<0) cnt=2;
                $slideWrap.stop().animate({left: `${-100*cnt}%`},0);
            });
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

    },[]);


    return (
        <section id="section3">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul className="slide-wrap">
                                    {
                                        state.sec3Slide.map((item, idx)=>{
                                            return(
                                                <li className="slide slide1" key={idx}>
                                                    <a href="!#">
                                                        <span>{item.title}</span>
                                                        {item.comment}
                                                        <img src={item.src} alt="" />
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <a className='prev-btn' href="!#"><img src="./img/icon-arrow.svg" alt="" /></a>
                        <a className='next-btn' href="!#"><img src="./img/icon-arrow.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};