---
date: 2025-02-16
tags:
  - OS
  - Linux
---
# 개요
> Swap 메모리란 컴퓨팅 리소스를 구성하는 물리적인 RAM 이 부족한 상황에서 사용될 디스크 공간을 의미한다. 물리 메모리(RAM)의 사용량이 기준치에 달했을 때, 사용량이 적은 데이터를 디스크의 Swap 영역으로 옮김으로써 시스템 다운을 방지하는 역할을 한다.



# 동작 방식
- 시스템이 메모리(RAM)를 전부 사용하면, **사용하지 않는 데이터**를 swap 영역으로 옮긴다.
- 필요한 경우 다시 RAM으로 데이터를 불러오는데, 이 과정에서 속도 저하가 발생한다. (디스크 접근 속도 < RAM 속도)
- swap이 충분하면 ``OOM(Out of Memory)`` 에러를 방지할 수 있지만, 과동한 swap 사용은 성능 저하를 초래할 수 있다.



# Swap의 종류

| 구분     | Swap 파티션      | Swap 파일                |
| ------ | ------------- | ---------------------- |
| 설치 방식  | 별도 파티션으로 생성   | 일반 파일을 Swap 용도로 사용     |
| 크기 조정  | 변경이 어렵다       | 유연하게 조절 가능             |
| 속도     | 약간 빠름         | 다소 느림 (파일 시스템 오버헤드 문제) |
| 설정 난이도 | 설치 시 미리 설정 필요 | 동적으로 설정 가능             |
| 권장 환경  | 서버, 고정 크기 환경  | 데스크톱, 동적 환경            |



# Swap 메모리 활성화
## 1. Swap 파티션
#### 1) 현재 Swap 상태 확인
```bash
# 활성화 된 swap 파티션 확인
swapon --summary

# 메모리 및 swap 용량 확인
free -h

# 디스크 및 파티션 목록 확인
lsblk
```
#### 2) 새로운 Swap 파티션 생성
> 사용할 디스크의 여유 공간을 확인하고 파티션을 생성한 뒤 다음 과정을 따른다.
```bash
sudo fdisk /dev/<사용할 디스크 이름>
```
1. ``n`` 입력 : 새 파티션 생성
2. ``p`` 입력 : 기본(Primary) 파티션 선택
3. 파티션 번호 선택 (기본값 선택 가능)
4. 시작 및 끝 섹터 설정 (기본값으로 하면 전체 여유 공간 사용)
5. ``t`` 입력 : 파티션 유형 변경
6. ``82`` 입력 : Linux Swap 타입 선택
7. ``w`` 입력 : 변경 사항 저장 후 종료
#### 3) Swap 파티션 포맷 및 활성화
```bash
# 파티션 포멧
sudo mkswap /dev/<파티션 이름>

# Swap 활성화
sudo swapon /dev/<파티션 이름>
```

#### 4) 부팅 시 Swap 파티션 자동 마운트
> 부팅할 때 자동으로 swap이 활성화 되도록 /etc/fstab 파일 끝에 해당 설정을 추가하여 수정해야한다.
```bash
sudo vi /etc/fstab
```
##### 파일 끝에 다음 내용 추가 :
```plaintext
/dev/<파티션> none sw 0 0
```
##### 파일 저장 후 설정이 잘 되었는지 확인
```bash
sudo mount -a
```


## 2. Swap 파일
#### 1) Swap 파일 생성
```bash
# 2GB 크기의 swap 파일 생성
sudo fallocate -1 2G /swapfile 

# 보안 강화를 위해 권한 변경
sudo chmod 600 /swapfile

# swap 파일 포멧 설정
shdo mkswap /swapfile
```
#### 2) Swap 활성화
```bash
sudo swapon /swapfile
```
#### 3) 부팅 시 Swap 파일 자동 적용
```bash
sudo vi /etc/fstab
```
##### 파일 끝에 다음 내용 추가 :
```plaintext
/swapfile none sw 0 0
```
##### 파일 저장 후 설정이 잘 되었는지 확인
```bash
sudo mount -a
```




# Swap 메모리 비활성화
## 1. Swap 파티션
#### 1) Swap 비활성화
```bash
sudo swapoff /dev/<파티션 이름>
```
#### 2) Swap 파티션 삭제
```bash
sudo fdisk /dev/<디스크 이름>
```
8. ``d`` 입력 : 파티션 삭제
9. 삭제할 파티션 번호 선택
10. ``w`` 입력 : 저장 후 종료
#### 3) ``etc/fstab``에서 관련 항목 제거
```bash
sudo vi /etc/fstab
```
``/dev/<파티션 이름> none sw 0 0`` 를 삭제한 후 저장



## 2. Swap 파일

#### 1) Swap 비활성화
```bash
sudo swapoff /swapfile
```
#### 2) Swap 파일 제거
```bash
# swap 파일 삭제
sudo rm /swapfile
```
#### 3) ``etc/fstab``에서 관련 항목 제거
```bash
sudo vi /etc/fstab
```
``/swapfile none sw 0 0`` 를 삭제한 후 저장


# Swap 성능 조정
## 1) ``vm.swappiness`` 값 조정 (Swap 사용 빈도 설정)
> ``swappiness`` 값이 클수록 swap을 적극적으로 사용하며, 작을수록 RAM을 우선 사용한다.
```bash
# 기본값 60, 낮추면 swap 사용 줄어듦
sudo sysctl vm.swappiness=10
```
##### 영구 적용을 위한 ``/etc/sysctl.conf`` 수정
```bash
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
```


---
# 참고문헌

- https://willseungh0.tistory.com/13

---
# 연결문서

- 