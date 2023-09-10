import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './scss/section2.scss';

export default function Section2Component(){

    const [state, setState] = React.useState({
        introNew: []
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section2.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    introNew: res.data.intro_new
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);

    
    return (
        <section id="section2">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>신상품</h2>
                    </div>
                    <div className="content">
                        <ul>
                            {
                                state.introNew.map((item, idx)=>{
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
                                                <b>{item.comment}</b>
                                                <em>{item.tag1}</em><em>{item.tag2}</em>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="more-btn-box">
                        <Link to="/sub1" target='_top'>더보기 +</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};