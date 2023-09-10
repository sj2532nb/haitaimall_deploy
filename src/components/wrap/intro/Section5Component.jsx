import React from 'react';
import axios from 'axios';
import './scss/section5.scss';

export default function Section5Component(){

    const [state, setState] = React.useState({
        introBest: []
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section5.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    introBest: res.data.intro_best
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    return (
        <section id="section5">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>BEST PRODUCT</h2>
                    </div>
                    <div className="content">
                        <ul>
                            {
                                state.introBest.map((item, idx)=>{
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
                </div>
            </div>
        </section>
    );
};