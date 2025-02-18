# 목적
- Kafka의 **Transactional Outbox 패턴**을 구현.
- **데이터 순서 보장**과 **컨슈머의 멱등성** 검증.
- 단순한 숫자 증가 방식으로 메시지를 전송하는 애플리케이션 개발.

# Outline
## 시스템 구성
- **Producer**:  다수 유저가 주문을 생성하며 1부터 시작하는 주문 id와 주문 시간이 담긴 데이터를 Kafka 토픽에 전송.
- **Kafka Broker**: 메시지를 컨슈머에게 전달.
- **Consumer**: 받은 숫자를 처리(중복 실행 방지).
- **Database (Outbox Table)**: 트랜잭션이 적용된 Outbox 패턴 구현.

## Outbox 패턴 적용 방식 -> Least Once time 보장
- Producer는 **DB 트랜잭션**을 통해 숫자를 Outbox 테이블에 저장.
- Outbox 테이블의 데이터는 **Kafka로 전송**(별도 프로세스).
- Consumer는 데이터를 받아 **처리 및 검증**.
- 멱등성 보장을 위해 **이미 처리된 메시지는 무시**.

## 데이터 흐름
- Producer가 DB에 `(id, value, processed=false)` 형태로 데이터 저장.
- Outbox 프로세스가 DB에서 `processed=false` 데이터를 Kafka에 publish.
- Consumer가 메시지를 수신하고 **멱등성 검증 후 처리**.
- Consumer가 처리한 데이터는 DB에서 `processed=true`로 변경.

# Scenario
- **Kafka 환경 구성**
    - Docker를 활용하여 Kafka, Zookeeper 실행.
    - Kafka Producer/Consumer 간단한 메시지 전송 테스트.

- **Transactional Outbox 패턴 구현**
    - DB에 Outbox 테이블 생성.
    - Producer가 DB에 데이터를 삽입
    - Debezium이 Outbox 테이블의 변동 사항을 감지
    - Debezium이 변동 데이터를 Kafka로 전송.

- **데이터 순서 보장 검증**
    - Kafka의 `partition key` 활용하여 같은 key의 데이터가 같은 파티션으로 가도록 설정.
    - Consumer의 `auto.offset.reset` 옵션을 설정하여 정확한 순서로 처리.

- **컨슈머의 멱등성 적용방법**
	#### 1. Kafka Consumer에서 "Exactly-Once Processing" 설정**
	- Kafka의 **Transactional Consumer** 기능을 활용하면 **중복 수신 방지**가 가능함.
	- Kafka Consumer가 메시지를 처리한 후, **commit이 완료된 경우에만 오프셋을 갱신**하면 됨.
	- **Kafka의 `enable.auto.commit=false` + `commitSync()` 조합을 사용**하면 Consumer가 처리 완료된 메시지만 커밋 가능.
	
	#### 2. 멱등성 Producer 사용 (`enable.idempotence=true`)**
	- Kafka **Producer에서 `enable.idempotence=true`를 설정하면, 동일한 메시지가 중복 전송되지 않음.**
	- Kafka가 중복된 메시지를 감지하고 **자동으로 중복 제거**해 줌.

- **테스트 및 검증**
    - 메시지 지연, 중복 발생 테스트 진행.
    - Consumer 장애 후 재시작 시 정상적으로 동작하는지 확인.