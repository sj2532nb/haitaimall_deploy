import React from 'react';
import $ from 'jquery';
import './scss/top_modal.scss';

export default function TopModalComponent({topModalClose}){

    const onClickTopModalClose=(e)=>{
        e.preventDefault();
        topModalClose('yes', 1); // yes,  1일 쿠키 전달
    }

    React.useEffect(()=>{

        const $slideWrap = $('#topModal .slide-wrap');
        let cnt=0;
        let setId=0;

        function mainSlide(){
            $slideWrap.stop().animate({top: `${-100*cnt}%`}, 200, function(){
                if(cnt>=1) cnt=0;
                if(cnt<0) cnt=1;
                $slideWrap.stop().animate({top: `${-100*cnt}%`},0);
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

    },[]);


    return (
        <div id="topModal">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul className="slide-wrap">
                                    <li className="slide slide2"><a href="!#"><img src="./img/top_banner_agree.jpg" alt="" /></a></li>
                                    <li className="slide slide1"><a href="!#"><img src="./img/top_banner_agree.jpg" alt="" /></a></li>
                                    <li className="slide slide2"><a href="!#"><img src="./img/top_banner_agree.jpg" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a onClick={onClickTopModalClose} className='top-modal-close-btn' href="!#"><img src="./img/icon-close.svg" alt="" /></a>
        </div>
    );
};