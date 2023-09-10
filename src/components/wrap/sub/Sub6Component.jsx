import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './scss/sub6.scss';

export default function Sub6Component(){

    const [state, setState] = React.useState({
        event:[]
    });

    React.useEffect(()=>{

        axios({
            url: './data/sub/sub6.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    event: res.data.event
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    return (
        <div id='sub6'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>이벤트</h2>
                    </div>
                    <div className="main-category">
                        <ul>
                            <li><a href="!#">전체</a></li>
                            <i>|</i>
                            <li><a href="!#">진행중인 이벤트</a></li>
                            <i>|</i>
                            <li><a href="!#">종료된 이벤트</a></li>
                            <i>|</i>
                            <li><a href="!#">당첨자 발표</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <ul>
                            {
                                state.event.map((item, idx)=>{
                                    return(
                                        <li key={idx}>
                                            <a href="!#">
                                                <figure><img src={item.src} alt="" /></figure>
                                            </a>
                                            <div>
                                                <h3><a href="!#">{item.title}</a></h3>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="pagenation">
                            <a href="!#"><img className='prev-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                            <a href="!#">1</a>
                            <a href="!#"><img className='next-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                        </div>
                    </div>
                    <form>
                        <select name="event-search-select" id="eventSearchSelect">
                            <option value="제목">제목</option>
                            <option value="내용">내용</option>
                            <option value="글쓴이">글쓴이</option>
                            <option value="아이디">아이디</option>
                            <option value="별명">별명</option>
                        </select>
                        <input type="text" name='event-search' id='eventSearch' />
                        <button type='button'>찾기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};