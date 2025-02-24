---
tags:
  - JAVA
---
# 개요
> 배열은 다수의 데이터를 각각 `index`와 대응하여 관리하는 자료구조로 객체로 생성되는 참조 타입에 해당한다. 

# 문법
## 배열의 생성

```java
// 3개의 인덱스를 가진 배열 생성
int[] intArray = new int[3];

// 요소를 직접 추가하는 방식의 배열 생성
int[] intArray = {1, 2, 3}
```

>배열 객체 생성 시 객체 내에 인덱스 값에 대응되는 값들로 공간을 초기화하고 `length` 라는 이름의 변수를 자동으로 생성한다.

```java
// 배열의 크기
int[] intArray = new int[5];

// intArray.length -> 5
```

## 배열 내의 요소 추출

> 배열 내 요소에 접근하기 위해서는 `index`값을 기준으로 접근이 가능하다.

객체의 생성자를 `arg` 없이 호출할 경우 `numeric` 타입의 경우 `0 | 0.0` 으로 초기화 되고, 이밖에 경우 `null` 값으로 초기화 된다.

```java
int[] intArray1 = {1, 2, 3}
// intArray1[0] -> 1,
// intArray1[1] -> 2,
// intArray1[2] -> 3

int[] intArray2 = new int[3]
// intArray2[0] -> 0,
// intArray2[1] -> 0,
// intArray2[2] -> 0
```

## `Array`와 `ArrayList`의 차이

객체를 생성할 시에 저장 공간을 정적으로 명시해야 하는 `Array`와 달리 `ArrayList`의 경우 동적으로 메모리가 할당되어 추가해야 할 요소의 개수가 불명확하거나 리스트의 수정이 잦을 경우 용이하게 사용 가능하다.

> 단, `ArrayList`는 요소는 참조 타입의 변수만 가능하다. 즉 `String`, `Integer`, `Float` 등 객체 형태로 wrapping 된 변수를 추가하도록 만들어져 있기 때문에 원시 타입을 다루는 과정에서 꼭 객체 변수로 변환 해야 하는 경우가 아니라면 리소스가 낭비될 수 있으니 주의하자.
