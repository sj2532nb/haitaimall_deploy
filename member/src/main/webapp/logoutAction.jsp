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
<title>로그아웃 액션폼</title>
</head>
<body>
	<% session.invalidate(); %>
	<script type="text/javascript">
		alert('로그아웃 성공');
		location.href="./update.jsp";
	</script>
</body>
</html>