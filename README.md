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
