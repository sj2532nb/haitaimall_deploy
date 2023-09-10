<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "member.UserDAO" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:useBean id="UserDTO" class="member.UserDTO" scope="page"/>
<jsp:setProperty name="UserDTO" property="userId"/>
<jsp:setProperty name="UserDTO" property="userPw"/>
<jsp:setProperty name="UserDTO" property="userName"/>
<jsp:setProperty name="UserDTO" property="userHp"/>
<jsp:setProperty name="UserDTO" property="userEmail"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 액션폼</title>
</head>
<body>
<%
	if( UserDTO.getUserId()==null || UserDTO.getUserPw()==null ){
%>
	<script>
		alert("아이디, 비밀번호를 입력해주세요");
		history.go(-1);
	</script>
<%
	}
	else{
		UserDAO userDAO = new UserDAO();
		int result = userDAO.login(UserDTO.getUserId(), UserDTO.getUserPw());
		
		if(result==1){
			session.setAttribute("userId", UserDTO.getUserId());
%>			
			<script>
				alert("로그인 성공");
				location.href="./update.jsp";
			</script>			
<%			
		}		
		else if(result==0){
%>
			<script>			
				alert("비밀번호 불일치");
				history.go(-1);
			</script>
<%			
		}		
		else if(result==-1){
%>		
			<script>
				alert("아이디 불일치");
				history.go(-1);
			</script>
<%			
		}		
		else {
%>		
		<script>				
			alert("데이터베이스 오류");
			history.go(-1);
		</script>
<%			
		}
	}
%>
</body>
</html>