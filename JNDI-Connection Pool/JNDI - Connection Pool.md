---
date: 2025-02-25
tags:
  - JAVA
  - RDBMS
  - WAS
  - Tomcat
---
# 1. JNDI란?
> **JNDI(Java Naming and Directory Interface)**는 **Java에서 네이밍 서비스와 디렉터리 서비스를 제공하는 API**이다.

- 데이터베이스 연결, 원격 객체 접근, 메시징 서비스 등 **리소스를 쉽게 조회**할 수 있도록 설계됨.
- J2EE (현재 Jakarta EE) 환경에서 **데이터베이스 Connection Pool (DataSource)을 관리**할 때 주로 사용됨.
- 애플리케이션이 **환경 독립적인 방식으로 자원을 찾고 사용할 수 있도록 도와준다**.



# 2. JNDI가 필요한 이유
### 환경 독립성
애플리케이션에서 **데이터베이스 연결 정보를 직접 관리하지 않고**, JNDI를 통해 환경 설정을 분리할 수 있다. 
> 개발 환경(dev), 테스트 환경(test), 운영 환경(prod) 등의 변경이 용이함.

### 리소스 재사용 및 관리 용이
JNDI를 사용하면 데이터베이스 커넥션 풀(Connection Pool)을 쉽게 설정하고 관리 가능하다.
> JNDI를 통해 미리 설정된 DataSource를 참조

### 보안성 강화
> DB 접속 정보를 소스 코드에서 직접 관리하지 않으므로 **비밀번호, URL 등의 정보 노출 방지**



# 3. JNDI 기본 개념
> JNDI는 **Java 애플리케이션에서 네이밍 서비스(LDAP, DNS, RMI, CORBA 등)와 디렉터리 서비스에 접근할 수 있도록 지원**한다.
- **네이밍 서비스**: 특정 이름(name)에 특정 객체(object)를 매핑하는 서비스
- **디렉터리 서비스**: 계층적인 구조를 통해 네이밍 서비스를 확장
## JNDI 주요 객체

| 객체               | 설명                           |
| ---------------- | ---------------------------- |
| `InitialContext` | JNDI 네이밍 서비스를 조회하기 위한 기본 클래스 |
| `Context`        | 네이밍 서비스에 접근하는 인터페이스          |
| `DateSource`     | JNDI를 통해 조회하는 데이터베이스 연결 객체   |



# 4. JNDI 데이터베이스 연결 설정
## DB 벤더 사 드라이버 세팅
### mysql connector-j 
https://downloads.mysql.com/archives/c-j/
8.0.33, platform-independent, zip파일 다운로드 압축해제 후 폴더 내에 `.jar`파일을 `/src/WEB-INF/lib/`에 옮긴다.
![[Pasted image 20250205150006.png]]

## Tomcat에서 JNDI DataSource 설정 방법
> `META-INF/context.xml` (또는 `server.xml`) 파일에서 `DataSource`를 정의한다.

```xml
<Resource name="jdbc/MyDB" 
          auth="Container"
          type="javax.sql.DataSource"
          driverClassName="com.mysql.cj.jdbc.Driver"
          url="jdbc:mysql://localhost:3306/mydb"
          username="root"
          password="password"
          maxTotal="20"
          maxIdle="10"
          maxWaitMillis="3000"/>
```

## `web.xml`에서 JNDI 리소스 참조 추가

```xml
<resource-ref>
    <description>MySQL DataSource</description>
    <res-ref-name>jdbc/MyDB</res-ref-name>
    <res-type>javax.sql.DataSource</res-type>
    <res-auth>Container</res-auth>
</resource-ref>
```

## Java 코드에서 JNDI를 이용하여 DB 연결
```java
import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class JndiUtil {
    public static void main(String[] args) {
        try {
            // 1. JNDI 컨텍스트 생성
            Context ctx = new InitialContext();

            // 2. JNDI에서 DataSource 검색
            DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/MyDB");

            // 3. DB 연결
            try (Connection conn = ds.getConnection()) {
                System.out.println("DB 연결 성공!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



---
# 참고문헌

- 

---
# 연결문서

- 