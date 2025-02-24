---
tags:
  - JAVA
---
# ArrayList

ArrayList는 java.util에서 동적 메모리를 제공하는 배열 형태의 클래스이다.

일반 배열은 메모리 공간을 지정하면 변경이 불가하지만 ArrayList는 동적으로 메모리 할당할 수 있어서 추가할 요소의 개수가 불분명할 때 사용이 용이하다.

## 주의사항
ArrayList의 요소 타입은 Object이기 때문에 기본 타입을 추가할 수 없다. 또한 Generic을 지정하여 요소의 형변환을 제한할 수 있기 때문에 안정적인 코드작성이 가능하다.

하지만 객체타입으로의 변환이 필요한 경우가 아닐때 ArrayList를 남용하면 기본타입을 변환하는 과정에서 인스턴스를 생성, 메모리 점유율을 높일 수 있기 때문에 최대한 성능 이슈를 고려하여 사용해야한다.

## 문법
#### ArrayList 객체 생성
``` java
ArrayList<E> arrList = new ArrayList<E>();
```
> generic 타입인 E는 element의 약자로 ArrayList 인스턴스에 추가될 요소의 타입을 지정할 수 있다.

#### ArrayList 객체 생성 예시
``` java
ArrayList<String> stringList = newArrayList<String>();
```
> 이 경우에 generic 타입으로 String이 지정되었으므로 stringList에는 요소로 String 타입만 올 수 있다.

#### 요소 추가
``` java
stringList.add("문자열");
integerList.add(1);
```
> 여기서 "문자열"은 그 자체로 객체 타입이므로 형변환 없이 리스트에 요소로 추가되지만 int 타입의 1은 기본 타입이기 때문에 Auto boxing이 일어나게 된다. 즉 다음 코드와 같이 처리된다.

#### 요소 추가시 발생하는 Auto-boxing
``` java
integerList.add(new Integer(1));
```

#### 요소 추출
``` java
arrList.get(index);
```
 >리스트 내의 순서, index 값을 기준으로 해당 순서에 있는 값을 추출한다.

  
#### 요소 삭제
``` java
arrList.remove(index);
```
> 요소 추출과 동일하게 index 값을 기준으로 리스트 내의 요소를 삭제할 수 있다.

#### 리스트 크기 조회
``` java
arrList.size();
```

# Map
  Map은 key 값을 기준으로 매핑된 value를 요소로 가질 수 있는 자료형을 의미한다.
  java.util에서 제공하는 Map 형태의 클래스 중 HashMap 클래스에 대해 살펴보자.
  
## 문법
#### 객체의 생성
``` java
HashMap <K, V> hashMap = new HashMap <K, V> ();
```
  > Generic 타입으로 K: key, V: value 타입이 정의되어있다. 이경우 Map 객체내에 추가될 요소의 key 값은 K위치에 들어갈 타입으로, value 값은 V위치에 들어갈 타입으로 제한한다.
  
#### 객체의 생성 예시
``` java
HashMap<int, String> hashMap = new HashMap<int, String>();
```
  >이 경우 key에 들어갈 타입은 int 타입으로, value에 들어갈 타입은 String 타입으로 제한할 수 있다.

#### 요소 추가
  > Map 자료구조는 key는 중복을 허용하지 않기 때문에 동일한 key값을 넣으면 나중에 추가된 요소로 덮어써짐을 주의하자!
``` java
hashMap.put(1, "문자열1");
// {1: "문자열1"}

hashMap.put(2, "문자열1"); 
// {1: "문자열1", 2: "문자열1"}

hashMap.put(1, "문자열2");
// {1: "문자열2", 2: "문자열1"}
```
  
#### key값을 기준으로 value 추출
``` java
hashMap.get(key);
```
  
#### key들만 추출
``` java
Set<int> keys = hashMap.keySet();
```
  