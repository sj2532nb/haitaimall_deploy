import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './scss/sub4.scss';

export default function Sub4Component(){

    const [sortBy, setSortBy] = React.useState(false);
    const [state, setState] = React.useState({
        givePresent: [],
        n:0
    });

    React.useEffect(()=>{

        axios({
            url: './data/sub/sub4.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    givePresent: res.data.give_present,
                    n: res.data.give_present.length
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    const onMouseEnterSortBy=(e)=>{
        setSortBy(true);
    }

    const onMouseLeaveSortBy=(e)=>{
        setSortBy(false);
    }

    const onClickSortBy=(e)=>{
        e.preventDefault();
    }


    return (
        <div id='sub4'>
            <div className="container">
                <div className="gap">
                    <div className="event-section">
                        <ul>
                            <li><img src="./img/gift_01.png" alt="" /></li>
                            <li><img src="./img/gift_02.png" alt="" /></li>
                            <li><img src="./img/gift_03.png" alt="" /></li>
                        </ul>
                    </div>
                    <div className="title">
                        <h2>선물하기🎁</h2>
                    </div>
                    <div className="content">
                        <div className="content-title">
                            <div className="category-box">
                                <p><Link to="/sub4" target='_top'>선물하기🎁</Link></p>
                            </div>
                            <p><strong>{state.n}</strong>개</p>
                            <div onMouseLeave={onMouseLeaveSortBy} className="sort-by">
                                <a className={sortBy?'':'on'} onMouseEnter={onMouseEnterSortBy} onClick={onClickSortBy} href="!#"><span>정렬 기준</span></a>
                                {
                                    sortBy && (
                                        <div>
                                            <ul>
                                                <li><a href="!#">신상품</a></li>
                                                <li><a href="!#">상품명</a></li>
                                                <li><a href="!#">낮은가격</a></li>
                                                <li><a href="!#">높은가격</a></li>
                                                <li><a href="!#">인기상품</a></li>
                                                <li><a href="!#">사용후기</a></li>
                                                <li><a href="!#">좋아요</a></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="content-list">
                            <ul>
                                {
                                    state.givePresent.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <a href="!#">
                                                    <figure><img src={item.src} alt="" /></figure>
                                                    <span className='new-img'>{item.new===""?``:<img src="./img/image_custom_316252116938702.png" alt="" />}</span>
                                                    <span className='cart-img'><img src="./img/icon_cart.svg" alt="" /></span>
                                                </a>
                                                <div>
                                                    <h3><a href="!#">{item.title}</a></h3>
                                                    <span className='rate-price'>{item.discount_rate}<em>% </em></span><span className='sale-price'>{item.cost_price}<em>원</em></span><span className='price'>{item.product_price}<em>원</em></span>
                                                    {item.discount_price===""?``:<strong>쿠폰 적용시 <em>{item.discount_price}원</em></strong>}
                                                    {item.sold_out===""?
                                                        <div className="box">
                                                            <b>{item.comment}</b>
                                                            <em>{item.tag1}</em><em>{item.tag2}</em>
                                                        </div>
                                                        :
                                                        <span className='soldout-txt'>{item.sold_out}</span>}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="pagenation">
                        <a href="!#"><img className='prev-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                        <a href="!#">1</a>
                        <a href="!#"><img className='next-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};