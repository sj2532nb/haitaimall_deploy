import React from 'react';
import axios from 'axios';
import './scss/section9.scss';

export default function Section9Component(){

    const [state, setState] = React.useState({
        photoReview: []
    });

    React.useEffect(()=>{

        axios({
            url: './data/intro/section9.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    photoReview: res.data.photo_review
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    return (
        <section id="section9">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>포토후기</h2>
                    </div>
                    <div className="content">
                        <ul>
                            {
                                state.photoReview.map((item, idx)=>{
                                    return(
                                        <li key={idx}>
                                            <div>
                                                <figure>
                                                    <a href="!#">
                                                        <img src={item.src} alt="" />
                                                    </a>
                                                </figure>
                                                <div className='content-box'>
                                                    <h4 className='review-title'>
                                                        <a href="!#">{item.title}</a>
                                                    </h4>
                                                    <span className='review-content'>{item.comment}</span>
                                                    <p className='review-point'><img src="./img/ico_star5.png" alt="" /></p>
                                                    <div className="writer-info">
                                                        <span className='writer-name'>{item.name}</span>
                                                        <span className='write-date'>{item.date}</span>
                                                    </div>
                                                </div>
                                                <div className="product-link">
                                                    <a href="!#">
                                                        <img src={item.product_img} alt="" />
                                                        <span>{item.product_name}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="more-btn-box">
                        <button type='button'>리뷰 더보기 +</button>
                    </div>
                </div>
            </div>
        </section>
    );
};