---
date: 2025-02-04
tags:
  - Git
---

> 푸쉬할 수 없는 브랜치에서 작업을 했을 때 변동 사항을 다른 브랜치로 가져간 뒤 PR를 날려야하는 경우가 있다. 작업한 양이 많은 경우 아래 방법을 통해 최대한 작업 내용의 손실을 줄일 수 있도록 하자.


# 방법1 : 변경 사항을 다른 브랜치에서  적용

> 현재 작업 중인 브랜치에서 새로운 브랜치를 생성합니다. 이 새로운 브랜치에서 변경 사항을 커밋하고 PR을 날린다.

## 1. 새 브랜치 만들기

```Shell
# 현재 브랜치에서 새로운 브랜치로 체크아웃 
git checkout -b new-branch
```


## 2. 변경 사항 커밋하기

> 현재 브랜치에서 작업한 내용이 아직 커밋되지 않았다면, 새 브랜치에서 그 변경 사항을 커밋


```bash
# 변경된 파일을 스테이지에 추가 
git add .  

# 변경 사항 커밋 
git commit -m "변경 사항 설명"
```


## 3. 원격 리포지토리로 푸시하기

> 새로 생성한 브랜치에서 변경 사항을 원격 리포지토리로 푸시한다.

```bash
# 새로운 브랜치를 원격 리포지토리로 푸시 
git push origin new-branch`
```


## 4. GitHub에서 PR 생성

1. GitHub에서 원격 리포지토리로 이동
2. `new-branch` 브랜치로 PR을 생성
3. PR을 열고 리뷰어에게 요청

---

# 추가 방법: 변경 사항을 다른 브랜치로 옮기기 (만약 변경 사항이 커밋된 경우)

> 만약 변경 사항이 이미 커밋된 상태에서 현재 브랜치에서 변경 사항을 다른 브랜치로 옮기고 싶다면, `git cherry-pick`을 사용할 수 있습니다.

## 1.  원래 브랜치에서 커밋 확인

> 현재 작업 중인 브랜치에서 커밋한 변경 사항 중 이동 시킬 커밋 ID를 확인한다.

```bash
# 커밋 로그 확인 
git log
```


## 2. 새 브랜치로 체크아웃

> 새로운 브랜치를 생성하고 해당 브랜치로 체크아웃한다.

```bash
git checkout -b new-branch
```

## 3. `cherry-pick`으로 커밋 적용

> `cherry-pick`을 사용하여 이전 브랜치에서 커밋한 변경 사항을 새 브랜치에 적용한다.

```bash
# 이전 브랜치의 커밋을 새 브랜치로 가져오기
git cherry-pick <커밋ID>
```

## 4️. 푸시하기

> 변경 사항을 새로운 브랜치에 적용한 후, 원격 리포지토리로 푸시한다.

```bash
git push origin new-branch
```



---
# 참고문헌

- 

---
# 연결문서

- 