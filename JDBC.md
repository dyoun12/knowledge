---
date: 2025-02-16
tags:
  - JAVA
  - RDBMS
---
# 개요

> 과거 Java 어플리케이션에서 DB와의 연동이 필요할 때, DB마다 서로 다른 API를 제공하여 개발자들이 벤더사 별  DB에 맞춰 코드를 작성해야 했다. 이를 해결하기 위해  DB 접근 및 사용 방법에 대한 표준을 제시하기 위해 JDBC (Java DataBase Connectivity)가  도입되었다.
> JDBC는 Java 어플리케이션과 관계형 데이터베이스를 연결해주는 표준 인터페이스로, 다양한 DBMS에서도 일관된 코드로 데이터를 처리할 수 있도록 돕는다.

# Class
## 1. ``Driver``
JDBC 에서 정의한 인터페이스에 맞게 벤더사 별로 제공하는 Driver 클래스, 사용할 DBMS의 Driver를 로드함으로써 연결을 간편히 관리할 수 있다.

```java
// JDBC 드라이버 로드, driver 라이브러리 내의 클래스를 명시
Class.forName("com.mysql.cj.jdbc.Driver");
```

## 2. ``Connection``
데이터베이스와 연결을 관리하는 인터페이스, JDBC URL, username, password 등의 정보를 포함해 DBMS에 접속하는 역할을 한다.

```java
// 데이터베이스 연결
String url = "jdbc:mysql://localhost:3306/<databaseName>"
String user = "user"
String pass = "password for user"

// Connection 인스턴스 생성
Connection conn = DriverManager.getConnection(url, user, pass);
```

## 3. ``Statement`` & ``PreparedStatement``
SQL 문을 실행하기 위한 객체이다. PreparedStatement는 SQL문을 미리 컴파일 해두어 성능을 향상시켰다.

- ``stmt.executeQuery(sql)`` : row 조회를 위한 메소드 (``SELECT``, ``SHOW`` 등)  ``ResultSet`` 반환
- ``stmt.executeUpdate(sql)`` :  변동된 row 수를 반환하는 메소드 (INSERT, UPDATE, DELETE 등) 적용 Row 개수 ``int`` 반환 (0 -> 적용된 row가 없다.)

```java
// Statement > SQL문 실행
String sql = "SELECT * FROM users WHERE name='Kim Dae Yeon'";
Statement stmt = conn.createStatement();

ResultSet rs = stmt.executeQuery(sql);
```

```java
// PreparedStatement > SQL문 준비 및 실행
String sql = "SELECT * FROM users WHERE name=?";
PreparedStatement pstmt = conn.prepareStatement(sql);

// 준비된 SQL 문 중 '?' 위치에 들어갈 값을 동적으로 주입
pstmt.setString(1, "Kim Dae Yeon")

ResultSet rs = pstmt.executeQuery();
```

## 4. ResultSet
SQL 문의 실행 결과를 저장하는 객체로, 데이터베이스에서 조회한 레코드를 포함한다. 커서를 이용해서 로우 별로 값을 가져올 수 있다.

```java
// SQL 실행 결과 활용
ResultSet rs = pstmt.executeQuery()

while (rs.next()) {
	System.out.println("user id : " + rs.getInt("id"));
	System.out.println("user name : " + rs.getString("name"));
}
```

#### 출력 :
```plaintext
user id : 2315
user name : Kim Dae Yeon
```

# 주의 사항
> DB와의 연결을 종료하는 것은 리소스 사용량 측면에서 매우 중요한 일이다. 비즈니스 로직에서 DB의 데이터를 활용하는게 끝났다면 ``finally`` 문에서 연결을 종료하여 리소스를 반환하도록 처리해야한다.

#### 자원 반환 순서
DB 내의 데이터를 사용하기 위해 연결했던 순서와 반대로 자원을 반환해야한다. 자원 반환 순서는 다음과 같다.
1. ResultSet
2. Statement
3. Connection

#### 자원 반환 예시
```java
rs.close();
stmt.close();
conn.close();
```

# JDBC 트랜젝션 처리
> JDBC에서는 기본적으로 AutoCommit 모드가 활성화 되어있다. 즉 SELECT 문을 제외한 DDL문을 사용할 때 별도의 commit을 하지 않아도 자동으로 commit을 수행하므로, 트랜젝션 시 rollback을 위해 AutoCommit 옵션을 해제 해야한다.
> 뿐만아니라 자원 반환 시에 Connection Pool에 AutoCommit 모드가 비활성화 되어 반환되지 않도록 주의해서 트랜젝션을 수행해야한다.


```java
try {

	conn.setAutoCommit(false); // 트랜젝션 시작
	
    Statement stmt = conn.createStatement();
    stmt.executeUpdate("UPDATE accounts SET balance = balance - 500 WHERE id = 1");
    stmt.executeUpdate("UPDATE accounts SET balance = balance + 500 WHERE id = 2");

    conn.commit(); // 모든 SQL 실행이 성공하면 커밋

} catch (SQLException e) {

    conn.rollback(); // 오류 발생 시 롤백

} finally {

	conn.setAutoCommit(true); // 트랜젝션 종료
	
	rs.close();
	stmt.close();
	conn.close();
	
}
```

---
# 참고문헌

- https://steady-coding.tistory.com/564
- 

---
# 연결문서

- 