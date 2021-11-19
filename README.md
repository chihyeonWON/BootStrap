# React와 BootStrap으로 Front-end Web 만들기

## 실습 프로젝트 구성

타입스크립트를 사용하는 users라는 이름의 리액트 프로젝트를 생성한다. 터미널에서 다음 명령을 실행한다.

```typescript
npx create-react-app users --template typescript
```

이 명령을 실행한 위치에 users 디렉터리가 만들어지고, 관련된 프로젝트 파일들이 만들어진다. 다음은 create-react-app이 생성해준 package.json의 내용이다.

```typescript
{
  "name": "users",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "typescript": "^4.1.2",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

이제 VSCode 터미널에서 프로젝트 디렉터리로 이동 후 package.json에 설정한 다음 명령을 실행한다.

```typescript
npm strat
```

create-react-app으로 만든 프로젝트는 npm start 명령만으로 웹 브라우저가 자동으로 실행되면서 http://localhost:3000 주소에 접속한다. 모든 것이 정상이면 다음 화면을 볼 수 있다.
![react](https://user-images.githubusercontent.com/58906858/142576784-f12ab9ed-6c0c-498a-85de-5ba639585217.jpg)

## App.tsx 파일 수정

리액트의 소스코드는 src 디렉터리에 있어야한다. create-react-app으로 만든 프로젝트는 항상 src 디렉터리에 있는 App.tsx라는 이름의 파일이 있다. 이제 이 파일을 열어서 다음 내용으로 바꾼다.

src/App.tsx
```typescript
import React from 'react'

const App: React.FC = () => {
  const user = {name:'Jack', age: 32}
  return (
    <div className='App'>{
      JSON.stringify(user)
    }</div>
  )
}

export default App
```
저장하면 수정된 내용이 자동으로 컴파일되어 웹 브라우저 화면에 반영된다.

## JSX란?
JSX(Javascript XML)는 페이스북이 만든 간단한 프로그래밍 언어이다. JSX 언어는 자바스크립트의 확장 기능 형태로 동작한다.
앞의 코드에서 06~08 행에 해당되는 내용이 JSX이다.

```typescript
<div className='App'>{
  JSON.stringify(user)
 }</div>
 ```
 
 보통 JSX 코드가 있는 자바스크립트 파일은 확장자를 .jsx를 사용한다. 그런데 개발언어가 타입스크립트이면 .tsx를 사용한다. 앞에서 App.tsx 파일의 확장자가 .ts가 아닌것은 이 내용이 반영된 결과이다. JSX 코드가 있는 파일은 반드시 첫 줄에 React라는 심벌을 import 문으로 불러오는 코드가 있어야 한다.
 ```typescript
 import React from 'react'
 ```
 
 ## 컴포넌트란?
 
 JSX 코드는 아무 곳에서나 사용할 수 없고, 리액트가 컴포넌트(Component)라고 부르는 함수의 반환값으로만 사용할 수 있다. 다음 코드에서 App이 컴포넌트의 한 예이다. 이 함수는 JSX 코드를 반환한다. 보통 JSX 코드는 컴파일러를 혼란스럽게 하지 않도록 소괄호로 감싸준다.
 
 ```typescript
 const App: React.FC = () => {
  return (
    <div className='App'></div>
  )
}
```

## API 서버에서 실제 데이터 가져오기

expressAPI 프로젝트에서 개발한 API 서버를 동작시키고 이번 절의 프로젝트에서 접속해 실제 데이터를 가져온다. expressAPI 디렉터리를 대상으로 VSCode를 실행하고 터미널을 열어 npm start 명령으로 서버를 동작시킨다. 그런 다음 이번 절에서 생성한 프로젝트의 src 디렉터리에 다음과 같은 내용으로 IUser.ts 파일을 작성한다.

src/IUser.ts
```typescript
export interface IUser {
    _id: string
    name: string
    eamil: string
    sentence: string
    profession: string
    birthday: Date
}
```

그리고 다시 src 디렉터리에 다음과 같은 내용의 getDataPromise.ts 파일을 작성한다. 

src/getDataPromise.ts
```typescript
import {IUser} from './IUser'

type GetDataPromiseCallBack = (a: IUser[]) => void 
export const getDataPromise = (fn: GetDataPromiseCallBack) => (skip:number, limit:number) =>
    fetch(`http://localhost:4000/users/${skip}/${limit}`)
    .then(res => res.json())
    .then(fn)
```

마지막으로 App.tsx 파일의 내용을 다음처럼 수정한후 저장하면 방금 실행한 웹 브라우저에 수정 내용이 반영된다.

src/App.tsx
```typescript
import React from 'react'
import {IUser} from './IUser'
import { getDataPromise } from './getDataPromise'

const App: React.FC = () => {
  getDataPromise((users: IUser[]) => console.log('users', users))(0, 1)
  return(
    <div className='App'>please open console window</div>
  )
}

export default App  
```

## useState 함수 사용하기

다음 코드에서 문제점이 있다면 서버에서 수신한 users값을 컴포넌트에서 사용할 수 없고 단지 콜백 함수 내부에서만 사용할 수 있다는 점이다.
```typescript
const App: React.FC = () => {
  getDataPromise((users: IUser[]) => console.log('users', users))(0, 1)
  return(
    <div className='App'>please open console window</div>
  )
}
```

리액트는 이러한 문제를 해결할 수 있도록 useState 함수를 제공한다.
```typescript
import React, {useState} from 'react'
```
useState 함수는 배열에 적용한 비구조화 할당 구문을 사용해 다음처럼 데이터를 users와 users를 변경할 수 있는 setUsers 함수를 얻게 해준다. useState의 입력 매개변수인 빈 배열[]은 users에 초깃값으로 사용된다.
```typescript
const [users, setUsers] = useState<IUser []>([])
```

App.tsx 내용에 useState로 얻은 users와 setUsers를 실제로 사용하는 08행의 코드를 추가한다.

src/App.tsx
```typescript
import React, {useState} from 'react'
import {IUser} from './IUser'
import { getDataPromise } from './getDataPromise'

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  getDataPromise((receivedUsers: IUser[]) => {
    setUsers([...users, ...receivedUsers])
  })(0, 1)
  return (
      <div className='App'>
        {JSON.stringify(users)}
      </div>
  )
}

export default App  
```

## useEffect 함수 사용하기

앞에서 구현한 App.tsx파일에 문제점은 App 컴포넌트가 웹 브라우저에 의해 새로 고침될 때마다 호출된다. 이를 해결하기 위해 useEffect 함수를 사용한다.
```typescript
import React, {useState, useEffect} from 'react'
```

useEffect 함수는 다음과 같은 형태로 사용한다.
```typescript
useEffect(() => {
  // 구현 내용
}, [])
```

이제 코드를 다음처럼 수정해서 실행해 보면 웹 브라우저 화면은 바뀌지 않지만, getDataPromise는 App 컴포넌트가 처음 그려질때(렌더링) 딱 한번만 실행된다.

src/App.tsx
```typescript
import React, {useState, useEffect} from 'react'
import {IUser} from './IUser'
import { getDataPromise } from './getDataPromise'

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    getDataPromise((receivedUsers: IUser[]) => {
      setUsers([...users, ...receivedUsers])
    })(0, 1)
  }, [])
  return (
      <div className='App'>
        {JSON.stringify(users)}
      </div>
  )
}

export default App  
```

## 서버에서 데이터 계속 가져오기

이제 버튼을 하나 추가해 누를 때마다 서버에서 데이터를 계속 가져오는 내용을 구현한다.

src/App.tsx
```typescript
import React, {useState, useEffect} from 'react'
import {IUser} from './IUser'
import { getDataPromise } from './getDataPromise'

const App: React.FC = () => {
  const limit = 1
  const [skip, setSkip] = useState(0)
  const [users, setUsers] = useState<IUser[]>([])
  const onClick = () => {
    getDataPromise((receivedUsers: IUser[]) => {
      setSkip(skip + limit)
      setUsers([...users, ...receivedUsers])
    })(skip, limit)
  }
  useEffect(onClick,[])
  return (
      <div className='App'>
        <p>
          <button onClick={onClick}>more data...</button>
          </p>
        <p>
          {JSON.stringify(users)}
        </p>
        {JSON.stringify(users)}
      </div>
  )
}

export default App  
```


