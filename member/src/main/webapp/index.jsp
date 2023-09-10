<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HOME</title>

<style type="text/css">
	* {
	  margin: 0;
	  padding: 0;
	  vertical-align: middle;
	  box-sizing: border-box;
	}
	
	html, body {
	  width: 100%;
	  height: 100%;
	}
	
	html { /* scroll-behavior: smooth; */
	  overflow-y: auto;
	  overflow-x: hidden;
	}
	
	body {
	  font: normal 14px/1 "Noto Sans KR", "Noto Sans", "Montserrat", "Roboto";
	  color: #626262;
	  background: #fff;
	}
	
	ul {
	  list-style: none;
	}
	
	a {
	  color: #626262;
	  text-decoration: none;
	}
	
	a:link {
	  text-decoration: none;
	  color: #626262;
	}
	
	a:hover {
	  text-decoration: none;
	  color: #000;
	}
	
	a:visited {
	  text-decoration: none;
	  color: #626262;
	}
	
	a:focus {
	  text-decoration: none;
	  color: #d32b55;
	}
	
	h1, h2, h3, h4, h5, h6, b, strong {
	  font-weight: normal;
	}
	
	i, em, address {
	  font-style: normal;
	}
	
	.blind {
	  display: inline-block;
	  text-indent: -10000px;
	  overflow: hidden;
	}
	
	.hide {
	  display: none;
	}
	#header {
	  width: 100%;
	  background: #fff;
	  position: relative;
	  z-index: 999;
	  transition: all 0.3s;
	}
	#header .container {
	  width: 100%;
	  max-width: 1400px;
	  margin: 0 auto;
	}
	#header .container .gap {
	  width: 100%;
	}
	#header .container .gap .content {
	  width: 100%;
	  margin: 0 0 0 8px;
	}
	#header .container .gap .content .row1 {
	  width: 100%;
	  padding: 60px 29px 10px 2px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	#header .container .gap .content .row1 .logo a img {
	  width: 170px;
	  height: 60px;
	}
	#header .container .gap .content .row1 .row1-nav {
	  margin: -4px 0 0 0;
	}
	#header .container .gap .content .row1 .row1-nav ul {
	  display: flex;
	}
	#header .container .gap .content .row1 .row1-nav ul li a {
	  margin: 0 0 0 13px;
	  position: relative;
	}
	#header .container .gap .content .row1 .row1-nav ul li a span {
	  font-size: 14px;
	  line-height: 28px;
	  text-align: center;
	  color: #222;
	  font-family: "Noto Sans KR";
	  font-weight: 300;
	}
	#header .container .gap .content .row1 .row1-nav ul li a i {
	  position: absolute;
	  top: -25px;
	  left: -1px;
	  background: #e4e4e4;
	  padding: 0 7px;
	  line-height: 20px;
	  font-size: 10px;
	  color: #333;
	  border-radius: 7px;
	  animation: point-msg 0.3s infinite alternate;
	}
	#header .container .gap .content .row1 .row1-nav ul li a i::after {
	  content: "";
	  position: absolute;
	  bottom: 0;
	  right: 50%;
	  border: 3px solid #e4e4e4;
	  margin: 0 -3px -3px 0;
	  transform: rotate(45deg);
	}
	#header .container .gap .content .row1 .row1-nav ul li a em {
	  margin: 0 0 0 3px;
	  color: #222;
	  line-height: 28px;
	  font-weight: 300;
	}
	#header .container .gap .content .row2 {
	  width: 100%;
	  padding: 0 0 17px 0;
	  display: flex;
	}
	#header .container .gap .content .row2 .all-menu-btn.on .line1 {
	  top: 24px;
	  transform: rotate(-45deg);
	}
	#header .container .gap .content .row2 .all-menu-btn.on .line2 {
	  transform: translateX(-50px);
	}
	#header .container .gap .content .row2 .all-menu-btn.on .line3 {
	  top: 24px;
	  transform: rotate(45deg);
	}
	#header .container .gap .content .row2 .all-menu-btn a {
	  display: block;
	  width: 50px;
	  height: 50px;
	  margin: 0 0 0 -3px;
	  overflow: hidden;
	  position: relative;
	}
	#header .container .gap .content .row2 .all-menu-btn a span {
	  position: absolute;
	  top: 0;
	  left: 13px;
	  display: block;
	  width: 24px;
	  height: 2px;
	  background: #333;
	  transition: all 0.3s;
	}
	#header .container .gap .content .row2 .all-menu-btn a span.line1 {
	  top: 16px;
	}
	#header .container .gap .content .row2 .all-menu-btn a span.line2 {
	  top: 24px;
	}
	#header .container .gap .content .row2 .all-menu-btn a span.line3 {
	  top: 32px;
	}
	#header .container .gap .content .row2 .row2-nav ul {
	  display: flex;
	}
	#header .container .gap .content .row2 .row2-nav ul li {
	  padding: 9px 0;
	}
	#header .container .gap .content .row2 .row2-nav ul li a {
	  margin: 0 14px;
	}
	#header .container .gap .content .row2 .row2-nav ul li a span {
	  font-size: 20px;
	  color: #222;
	  font-weight: 500;
	  line-height: 32px;
	  font-family: "Noto Sans KR";
	}
	#header .container .gap .content .row2 .search-box {
	  width: 201px;
	  height: 32px;
	  margin: 8px 0 0 413px;
	  border-bottom: 2px solid #000;
	}
	#header .container .gap .content .row2 .search-box form {
	  width: 100%;
	}
	#header .container .gap .content .row2 .search-box form input {
	  width: 169px;
	  height: 32px;
	  padding: 3px 4px;
	  border: 0;
	  border-bottom: 2px solid #000;
	  outline: 0;
	  font-size: 12px;
	  line-height: 24px;
	}
	#header .container .gap .content .row2 .search-box form a i {
	  width: 32px;
	  height: 32px;
	  font-size: 30px;
	  text-align: center;
	}
	h1 {
		text-align: center;
	}
</style>
</head>
<body>
<%
	String userId = null;
	if(session.getAttribute("userId")!=null){
		userId = (String)session.getAttribute("userId");
	}
%>
   <header id="header">
      <div class="container">
          <div class="gap">
              <div class="content">
                  <div class="row1">
                      <div class="logo">
                          <a href='/intro'></a>
                      </div>
                      <div class="row1-nav">
                          <ul>
                              <li><a href='./signUp.jsp'><span>회원가입</span><i>+1,000P</i></a></li>
                              	<%
									if(userId==null){
								%>
                              <li><a href='./signIn.jsp'><span>로그인</span></a></li>
                              	<%
									}
									else{
								%>
							  <li><a href='./logoutAction.jsp'><span>로그아웃</span></a></li>
							    <%
									}
								%>
                              <li><a href="!#"><span>장바구니</span><em>2</em></a></li>
                              <li><a href='./update.jsp'><span>마이페이지</span></a></li>
                              <li><a href="!#"><span>고객센터</span></a></li>
                          </ul>
                      </div>
                  </div>
                  <div class="row2">
                      <div onClick={onClickAllMenuOpen} class={`all-menu-btn ${isAllMenu?'on':''}`}>
                          <a href="!#">
                              <span class='line1'></span>
                              <span class='line2'></span>
                              <span class='line3'></span>
                          </a>
                      </div>
                      <div class="row2-nav">
                          <ul>
                              <li><a href='http://localhost:3000/sub1'><span>NEW & HOT</span></a></li>
                              <li><a href='http://localhost:3000/sub2'><span>골라담기</span></a></li>
                              <li><a href='http://localhost:3000/sub3'><span>선물세트</span></a></li>
                              <li><a href='http://localhost:3000/sub4'><span>선물하기🎁</span></a></li>
                              <li><a href='http://localhost:3000/sub5'><span>캐릭터</span></a></li>
                              <li><a href='http://localhost:3000/sub6'><span>이벤트</span></a></li>
                              <li><a href='http://localhost:3000/sub7'><span>레시피</span></a></li>
                          </ul>
                      </div>
                      <div class="search-box">
                          <form>
                              <input type="text" name='search-form' id='searchForm' placeholder='' />
                              <a href="!#">
                              
                                  <i class='material-icons'></i>
                              </a>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </header>
	<h1>HOME</h1>
</body>
</html>