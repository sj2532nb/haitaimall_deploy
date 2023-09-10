package member;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {
	
	private Connection conn;
	private PreparedStatement ps;
	private ResultSet rs;
	
	public UserDAO() {
		try {
			String DBURL = "jdbc:mysql://localhost:3306/user";
			String DBID = "root";
			String DBPW = "1234";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DBURL, DBID, DBPW);
		} 
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
	
	// 회원가입
	public int signup(UserDTO userDTO) {
		// SQL INSERT INTO user
		String SQL = "INSERT INTO user(userId, userPw, userName, userHp, userEmail)  VALUES(?, ?, ?, ?, ?)";
		try {
			PreparedStatement ps = conn.prepareStatement(SQL);
			ps.setString(1, userDTO.getUserId());
			ps.setString(2, userDTO.getUserPw());
			ps.setString(3, userDTO.getUserName());
			ps.setString(4, userDTO.getUserHp());
			ps.setString(5, userDTO.getUserEmail());
			return ps.executeUpdate();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return -1; // 가입오류 이미 입력된 아이디 입니다.
	}
	
	// 로그인
	public int login(String userId, String userPw) {
		String SQL = "SELECT userPw FROM user WHERE userId=?";
		try {
			PreparedStatement ps = conn.prepareStatement(SQL);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			if(rs.next()) {  // 아이디 검증 완료 됐을때
				if(rs.getString(1).equals(userPw)) {  // 비밀번호 검증
					return 1;  // 비밀번호 일치(비밀번호 검증 완료)
				}
				else {
					return 0;  // 비밀번호 불일치(비밀번호 검증 실패)
				}
			}
			return -1;  // 아이디 불일치(아이디 검증 실패)
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return -2;  // 데이터베이스 오류
	}
	
	// 수정
	public int update(UserDTO userDTO) {
		String SQL = "UPDATE user SET userPw=?, userName=?, userHp=?, userEmail=? WHERE userId=?";
		try {
			PreparedStatement ps = conn.prepareStatement(SQL);
			ps.setString(1, userDTO.getUserPw());
			ps.setString(2, userDTO.getUserName());
			ps.setString(3, userDTO.getUserHp());
			ps.setString(4, userDTO.getUserEmail());
			ps.setString(5, userDTO.getUserId());
			return ps.executeUpdate();
		} 
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return -1;
	}
	
	// 개인정보조회
	public UserDTO getJoin(String userId) {
		UserDTO userDTO = new UserDTO();
		String SQL = "SELECT * FROM user WHERE userId=?";
		try {
			PreparedStatement ps = conn.prepareStatement(SQL);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			if(rs.next()) {
				userDTO.setUserId(rs.getString("userId"));
				userDTO.setUserPw(rs.getString("userPw"));
				userDTO.setUserName(rs.getString("userName"));
				userDTO.setUserHp(rs.getString("userHp"));
				userDTO.setUserEmail(rs.getString("userEmail"));
			}
		} 
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return userDTO;
	}
	
	// 삭제
	public int delete(String userId, String userPw) {
		String SQL = "DELETE FROM user WHERE userId=? AND userPw=?";
		try {
			PreparedStatement ps = conn.prepareStatement(SQL);
			ps.setString(1, userId);
			ps.setString(2, userPw);
			return ps.executeUpdate();
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return -1;
	}
}














