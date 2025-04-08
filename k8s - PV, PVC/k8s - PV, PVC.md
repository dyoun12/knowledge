---
date: 2025-03-31
tags:
  - Kubernetes
  - Storage
---
# 개요
> Persistent Volume (PV)와 Persistent Volume Claim (PVC)는 Kubernetes에서 **지속적인 스토리지**를 관리하고 사용하는 방법을 제공한다. 이 개념은 **Pod의 라이프사이클과 독립적인 저장소**를 제공하여, Pod가 재시작되거나 이동되어도 데이터를 보존한다.

## PV (Persistent Volume)
> PV는 클러스터 내에서 관리되는 스토리지 리소스이다. Kubernetes가 관리하는 물리적 또는 가상 스토리지를 나타내며, 다양한 스토리지 시스템(예: NFS, iSCSI, AWS EBS, GCE PD 등)을 사용할 수 있다.

- **스토리지 리소스**: PV는 실제로 사용할 수 있는 스토리지 자원을 나타낸다. 이는 물리적인 디스크이거나 클라우드 프로바이더에서 제공하는 블록 스토리지일 수 있다.
- **스코프**: 클러스터 수준에서 존재한다. 즉, 모든 Pod에서 사용될 수 있다.

📌 **특징**:
- **공유 가능**: 여러 Pod가 하나의 PV를 공유.
- **여러 프로토콜 지원**: 다양한 스토리지 프로토콜(iSCSI, NFS, etc.)을 지원.
- **수명**: PV는 클러스터의 스토리지 자원으로, PVC가 삭제되거나 변경되어도 존재하고 유지.

## PVC (Persistent Volume Claim)
> PVC는 사용자가 원하는 스토리지 자원을 요청하는 Kubernetes 리소스로 PVC를 통해 Pod는 필요한 스토리지 크기, 액세스 모드 등의 요구 사항을 지정하고, 이를 통해 PV를 할당받는다.

- **요청**: PVC는 필요한 스토리지 용량, 액세스 모드 등을 명시하여 PV로부터 적절한 스토리지를 요청한다.
- **매핑**: PVC는 해당 요청에 맞는 PV가 존재하면, 그 PV와 **매핑**되어 사용된다.

📌 **특징**:
- **사용자 요청**: 사용자는 PVC를 통해 필요한 스토리지 자원을 요구 가능
- **동적 프로비저닝**: PVC를 통해 요청된 스토리지를 클러스터가 동적으로 프로비저닝 가능
- **수명**: PVC가 삭제되면, 해당 PVC와 연결된 PV도 관리 정책에 따라 삭제 가능

## PV와 PVC의 수명 주기
> PV의 수명은 클러스터 관리자가 정의하며, 보통 스토리지 자원과 관련이 있다. PVC의 수명은 Pod의 수명과 밀접하게 연결되어 있으며, PVC가 삭제되면 연결된 PV도 삭제될 수 있다(정책에 따라 다름).
### **Reclaim Policy**
- **Retain**: PV가 삭제되지 않으며, 수동으로 처리해야 함
- **Recycle**: 데이터를 삭제하고 다시 사용 가능하도록 처리됨
- **Delete**: PVC가 삭제되면, PV도 삭제됨

# 사용 방법
### PV Definetion
> 스토리지 리소스를 클러스터에서 정의할 수 있다. 예를 들어, AWS EBS 볼륨을 사용하는 PV를 정의 하는 것이 가능하다.
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  awsElasticBlockStore:
    volumeID: vol-12345678
    fsType: ext4
```
### PVC Definetion
> Pod에서 사용할 스토리지를 요청할 수 있다. PVC는 요청된 용량과 액세스 모드에 맞는 PV를 찾는 과정을 거친다.
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

## PV - PVC Connetion
> PVC가 생성되면, Kubernetes는 해당 PVC에 맞는 PV를 찾아 연결한다. 만약 적합한 PV가 없다면, 정의 된 정책에 따라 Kubernetes는 동적 프로비저닝을 통해 새로운 PV를 생성할 수도 있다.

---
# 참고문헌

- 

---
# 연결문서

- 