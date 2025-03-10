---
date: 2025-03-03
tags:
  - Network
---
# 개요
> 이더넷(Ethernet)은 유선(Local Area Network, LAN) 네트워크에서 가장 널리 사용되는 통신 규격이다.
- **OSI 7계층의 데이터 링크 계층(Layer 2)과 물리 계층(Layer 1)을 담당**
- **MAC 주소 기반의 통신**을 사용
- DTU = Frame



# 필요성
> 과거에는 컴퓨터끼리 직접 연결(직렬/병렬 포트)하거나, 독점적인 네트워크 기술(토큰 링, FDDI 등)을 사용해야 했다.  

➡ 하지만, **이더넷이 표준화되면서** 다양한 장치들이 같은 네트워크 환경에서 원활하게 통신할 수 있게 됨.


# 주요 특징

## 물리적 구조 (Physical Layer)

- **케이블 유형**
    
    - UTP (Unshielded Twisted Pair, 비차폐 꼬임선)
    - 광섬유 (Fiber Optic)
    - 동축 케이블 (Coaxial Cable, 초창기 이더넷에서 사용)
- **전송 속도**
    
    - 초기 이더넷: 10Mbps
    - **Fast Ethernet**: 100Mbps
    - **Gigabit Ethernet**: 1Gbps
    - **10G, 40G, 100G Ethernet**: 데이터센터 및 고속 네트워크용

## 데이터 링크 계층 (Data Link Layer)
- **MAC 주소(48비트, 6바이트) 기반 통신**
- **프레임(Frame) 단위로 데이터 전송**
- **헤더 + 데이터 + FCS(Frame Check Sequence, 오류 검사)** 구조

**📌 이더넷 프레임 구조**
```
| 프리앰블 | 목적지 MAC | 출발지 MAC | EtherType | 데이터 | FCS |
```

- **프리앰블(Preamble, 7바이트)**: 송수신 동기화
- **목적지 MAC (6바이트)**: 수신 장치의 MAC 주소
- **출발지 MAC (6바이트)**: 송신 장치의 MAC 주소
- **EtherType (2바이트)**: 상위 프로토콜 정보 (예: IPv4=0x0800, IPv6=0x86DD)
- **데이터 (46~1500바이트)**: 실제 전송되는 데이터
- **FCS (4바이트)**: CRC 오류 검출 코드

## CSMA/CD (충돌 감지 및 회피)
> **과거의 이더넷(허브 기반 네트워크)에서는 여러 장치가 하나의 네트워크 매체(공유된 케이블)를 사용**  

➡ 충돌이 발생할 가능성이 높았음

> 이를 해결하기 위해 **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)** 방식 사용

✅ **즉, 송신 전 네트워크 상태를 확인하고, 충돌 발생 시 재전송하는 방식**




# 이더넷의 발전과정
### **1️⃣ 초기 이더넷 (Thicknet & Thinnet)**

- 1980년대, **동축 케이블(Coaxial Cable) 사용**
- 네트워크 전송 속도: **10Mbps**
- 모든 장치가 **버스 토폴로지**에서 공유된 케이블을 통해 통신
- **CSMA/CD 방식 필요 (충돌 발생 가능성 높음)**

### **2️⃣ 스위치 기반 이더넷 (Modern Ethernet)**

- 1990년대 이후, **스위치(Switch) 등장**
- 각 장치가 스위치와 개별적으로 연결됨 (충돌 도메인 분리)
- **CSMA/CD가 필요 없음**
- 전송 속도: **100Mbps → 1Gbps → 10Gbps → 100Gbps**

### **3️⃣ 무선 이더넷 (Wi-Fi, Wireless Ethernet)**

- **유선 대신 무선(802.11) 프로토콜 사용**
- MAC 주소 기반 통신 방식은 동일
- 충돌 감지 대신 **CSMA/CA (Collision Avoidance, 충돌 회피) 사용**
- 데이터 전송 속도: **최신 Wi-Fi 6 (802.11ax) 기준 최대 9.6Gbps**



# 이더넷과 관련된 주요 기술

### **1️⃣ VLAN (가상 LAN, Virtual LAN)**
- **논리적으로 네트워크를 분할하는 기술**
- 같은 물리적 네트워크에서도 서로 다른 네트워크처럼 동작
- **802.1Q 태깅을 사용하여 트래픽을 구분**

### **2️⃣ PoE (Power over Ethernet)**
- **이더넷 케이블을 통해 전력과 데이터를 동시에 공급하는 기술**
- IP 카메라, VoIP 전화기, 무선 액세스 포인트(AP) 등에 사용

### **3️⃣ 이더채널 (EtherChannel)**
- **여러 개의 이더넷 링크를 묶어 하나의 논리적 연결로 사용하는 기술**
- 대역폭 증가 & 이중화 제공

### **4️⃣ MPLS (Multi-Protocol Label Switching)**
- **레이어 2와 레이어 3의 중간 계층에서 동작하는 라우팅 기술**
- 대규모 네트워크에서 **트래픽 우선순위 지정 및 QoS 제공**



# 이더넷의 장점과 단점

### **✅ 장점**
- **전 세계적으로 표준화된 프로토콜 (IEEE 802.3)**
- **구성이 간단하고 확장성이 높음**
- **MAC 주소 기반으로 유연한 네트워크 구성 가능**
- **고속 네트워크(10G, 40G, 100G)까지 지원**

### **❌ 단점**
- **브로드캐스트 트래픽 증가 가능 (VLAN, 라우터 활용 필요)**
- **CSMA/CD 사용 시 충돌 가능성 존재 (현재는 스위치로 해결됨)**
- **거리가 멀어질수록 신호 감쇠 발생 (광케이블로 해결 가능)**


---
# 참고문헌

- 

---
# 연결문서

- 