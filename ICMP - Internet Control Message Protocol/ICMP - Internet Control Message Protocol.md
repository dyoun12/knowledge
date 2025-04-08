---
date: 2025-03-03
tags:
  - Network
  - Protocol
---
# 개요
> ICMP는 Internet Control Message Protocol의 약자로, 네트워크에서 오류 보고와 진단 기능을 수행하는 프로토콜이다. TCP/IP 프로토콜 스택에서 IP와 함께 동작하며, 네트워크 장비(라우터, 호스트 등)가 서로 상태 정보를 교환할 때 사용된다.

# 주요 특징
- IP 패킷 내부에서 동작, IP 패킷의 오류를 감지하고 보고하는 역할을 수행
- 신뢰성을 보장하지 않고, 데이터를 직접 전송하지 않음
- 비 연결성 프로토콜로 세션을 유지 하지 않고, 독립적인 메세지를 보내는 방식
- 네트워크 상태를 알려주는 단순한 신호 역할

# 메세지 형식
![](Blog/ICMP%20-%20Internet%20Control%20Message%20Protocol/img01.png)
출처 (https://programming119.tistory.com/155#google_vignette)

| **Type** | **Code** | **설명**                                                                       |
| -------- | -------- | ---------------------------------------------------------------------------- |
| 0        | 0        | **Echo Reply (응답)** - `ping` 요청에 대한 응답                                       |
| 3        | 0~15     | **Destination Unreachable (목적지 도달 불가)** - 라우팅 실패, ACL 차단 등                   |
| 5        | 0~3      | **Redirect (경로 변경 안내)** - 더 나은 경로가 있을 때 전달                                   |
| 8        | 0        | **Echo Request (요청)** - `ping` 명령어에서 사용됨                                     |
| 11       | 0~1      | **Time Exceeded (시간 초과)** - TTL(Time To Live) 초과 시 발생 (예: `traceroute`에서 활용) |

# 활용
## 1. `ping`
> 네트워크가 정상적으로 연결되어 있는지 확인하는 가장 기본적인 도구이다. ICMP Echo Request (Type 8)을 보내고, 대상이 Echo Reply (Type 0)로 응답하면 연결이 정상이라는 의미이다.

```sh
ping <Target-IP-Address>
```

## 2. `Traceroute`
> 패킷이 목적지까지 가는 경로를 추적하는 도구이다. 각 라우터에서 패킷의 TTL이 감소하여 0이되면 ICMP Time Exceeded (Type 11) 메세지를 반환하는 원리를 이용한다.

```sh
# Linux / MacOS
traceroute <Target-IP-Address>

# Windows
tracert <Target-IP-Address>
```

# 보안적 고려사항
> ICMP는 대상 Host의 네트워크 상태를 파악할 수 있는 만큼 악용될 우려가 있다.

### 1. Ping Flood (DoS 공격)
> 대량의 ICMP Echo Request를 보내서 서버를 과부하 상태로 만드는 공격.
- 방화벽에서 ICMP 차단 또는 속도 제한 적용.
### 2. Smurf 공격
> 공격자가 ICMP Echo Request를 위조된 IP로 보내고, 응답이 대상에게 폭주하도록 유도하는 공격
- 브로드캐스트 ICMP 트래픽을 제한.

### 3. ICMP Redirect 공격
> ICMP Redirect 메세지를 악용하여 잘못된 라우터를 사요아게 유도한는 공격.
- 신뢰할 수 없는 네트워크에서 ICMP Redirect 메세지 차단.

---
# 참고문헌

- icmp 메세지 유형 - https://programming119.tistory.com/155#google_vignette

---
# 연결문서

- 