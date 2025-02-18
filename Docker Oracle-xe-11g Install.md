```

# docker 기반 oracle db 설치 
# 이미지 다운로드
docker pull oracleinanutshell/oracle-xe-11g

# 이미지로 설치
docker run -d --name oracle-xe-11g -p 1521:1521 oracleinanutshell/oracle-xe-11g


**sqlplus system/oracle**

-- 일반 계정 생성 : id scott / pw tiger
SQL> create user scott identified by tiger;
User created.

-- scott 계정 관리 권한
SQL> grant connect, resource, dba to scott;
Grant succeeded.

-- 현 로그인 계정에서 scott 계정으로 명령창에서 바로 갈아타기
SQL> connect scott/tiger
Connected.

```
```