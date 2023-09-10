import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import IntroComponent from './wrap/IntroComponent';
import Sub1Component from './wrap/sub/Sub1Component';
import Sub2Component from './wrap/sub/Sub2Component';
import Sub3Component from './wrap/sub/Sub3Component';
import Sub4Component from './wrap/sub/Sub4Component';
import Sub5Component from './wrap/sub/Sub5Component';
import Sub6Component from './wrap/sub/Sub6Component';
import Sub7Component from './wrap/sub/Sub7Component';
import SignUpComponent from './wrap/members/SignUpComponent';
import SignInComponent from './wrap/members/SignInComponent';
import MyPageComponent from './wrap/members/MyPageComponent';
import ProductComponent from './wrap/ProductComponent';
import FooterComponent from './wrap/FooterComponent';

export default function WrapComponent(){

    const [topModal, setTopModal] = React.useState({
        key: 'TOPMODALKEY',
        isTopModal: true
    })

    //2. 탑 모달 닫기 함수 => 쿠키설정
    const topModalClose=(value, expires)=>{
        setTopModal({
            ...topModal,
            isTopModal: false  //모달 닫기
        });
        setCookieMethod(value, expires);
    }


    //3. 쿠키 설정(저장)하기 : 탑모달을 닫기 클릭하면  쿠키 설정 저장
    const setCookieMethod=(value, expires)=>{
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + expires ); // 3일간 열리지 않음
        document.cookie = `${topModal.key}=${value}; path=/; expires=${toDay.toUTCString()};`;       
    }

    //4. (언제)쿠키 가져오기 : 설정된 쿠키가 없으면 탑모달은 열린다. 있다면(찾았다면 Found) 닫는다.
    const getCookieMethod=()=>{
        if(document.cookie==='') return;  // 예외처리 

        try{
            const result = document.cookie.split(';');  //  ['SAD=FASD', ' SADFASD=FAS', ' SDFASDFASD=3', ' SDFAS=3']

            let cookie = [];
            result.map((item,idx)=>{
                cookie[idx] = {
                    key: item.split('=')[0].trim(),  // MJ_KURLY_TOPMODAL
                    value: item.split('=')[1].trim() // yes
                }
            });
    
            // 찾기(Found)  key: 'MJ_KURLY_TOPMODAL'
            // 모달닫기 했던 쿠키가 존재하면 
            // 모달닫기를 수행 : 새로고침 하면 또 설정 .... 설정
            cookie.map((item)=>{  
                // if(item.key===topModal.key && item.value==='yes' ){
                if(item.key.includes(topModal.key)===true && item.value.includes('yes')===true ){
                    setTopModal({
                        ...topModal,
                        isTopModal: false
                    }) 
                    // eslint-disable-next-line array-callback-return
                    return;               
                }
            })
        }
        catch(e) {
            console.log('쿠키없음', e);
        }
        

    }

    // 5 
    React.useEffect(()=>{
        getCookieMethod();
    },[topModal.isTopModal]);


    return (
        <div id="wrap">
            {topModal.isTopModal && <TopModalComponent topModalClose={topModalClose}/>}  
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path='/' element={<HeaderComponent/>}>
                        <Route index element={<IntroComponent/>}/>
                        <Route path='/intro' element={<IntroComponent/>}/>
                        <Route path='/sub1' element={<Sub1Component/>}/>
                        <Route path='/sub2' element={<Sub2Component/>}/>
                        <Route path='/sub3' element={<Sub3Component/>}/>
                        <Route path='/sub4' element={<Sub4Component/>}/>
                        <Route path='/sub5' element={<Sub5Component/>}/>
                        <Route path='/sub6' element={<Sub6Component/>}/>
                        <Route path='/sub7' element={<Sub7Component/>}/>
                        <Route path='/signup' element={<SignUpComponent/>}/>
                        <Route path='/signin' element={<SignInComponent/>}/>
                        <Route path='/mypage' element={<MyPageComponent/>}/>
                        <Route path='/product' element={<ProductComponent/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
        </div>
    );
};