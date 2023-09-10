import React from 'react';
import './scss/footer.scss';

export default function FooterComponent(){
    return (
        <footer id="footer">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <div className="logo">
                                <a href="!#"><img src="./img/5eb422f3ebeda26d05179ff4fc36063b_xYyJzJGTZE_3_bottom.jpg" alt="" /></a>
                            </div>
                            <div className="row1">
                                <span>04352 서울특별시 용산구 한강대로72길 3 (남영동) 해태제과</span>
                                <span>대표 : 신정훈</span>
                                <span>전화 : 02-3158-4790</span>
                                <br />
                                <span>상호 : 해태몰 </span>
                                <span>사업자등록번호 : 106-85-27639</span>
                                <span>통신판매업 신고 제00258호 <a href="!#">[사업자정보확인]</a></span>
                                <br />
                                <span>개인정보보호책임자 : <a href="!#">박병건(htmall@ht.co.kr)</a></span>
                            </div>
                            <div className="row2">
                                <strong>반품주소지 : </strong><span>경기 고양시 일산동구 장대길 16-1  (장항동)</span>
                            </div>
                            <div className="row3">
                                <h3>KCP 구매안전서비스 <a href="!#">서비스 가입사실 확인</a></h3>
                                <p>현금 등으로 결제시 저희 쇼핑몰이 가입한 PG에스크로 구매안전 서비스를 이용하실 수 있습니다.</p>
                            </div>
                            <div className="row4">
                                <span>Copyright © </span><strong>Haitai Confectionary</strong><span> . All rights reserved.</span>
                            </div>
                            <div className="row5">
                                <a href="!#"><span>Facebook</span></a>
                                <a href="!#"><span>Instagram</span></a>
                                <a href="!#"><span>Youtube</span></a>
                                <a href="!#"><span>Blog</span></a>
                            </div>
                        </div>
                        <div className="right">
                            <ul className='right-col1'>
                                <li><a href="!#">이용약관</a></li>
                                <li><a href="!#"><strong>개인정보취급방침</strong></a></li>
                                <li><a href="!#">이용안내</a></li>
                            </ul>
                            <ul className='right-col2'>
                                <li><a href="!#">공지사항</a></li>
                                <li><a href="!#">Q&A</a></li>
                                <li><a href="!#">고객센터</a></li>
                            </ul>
                            <ul className='right-col3'>
                                <li><strong>02-3158-4790</strong></li>
                                <li>AM 11:00 - PM 16:00</li>
                                <li>토, 일, 공휴일 휴무</li>
                            </ul>
                            <ul className='right-col4'>
                                <li>입금계좌안내</li>
                                <li><span>하나은행</span> 611-023955-709</li>
                                <li>예금주 : 해태몰</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};