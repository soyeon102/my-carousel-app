## 프로젝트 실행

- 패키지 설치

```
$ npm install
```

- 기본 .env설정
  - 이 환경 변수는 [Unsplash API 접근](https://unsplash.com/documentation#authorization)을 위한 인증 키입니다.

```
VITE_ACCESS_KEY=client_id
```

- 서버 실행

```
$ npm run dev
```

<br/>

## 기능 리스트

### 아미지 목록

- [x] Unsplash API를 사용해 이미지 목록 불러오기

### 상단 캐러셀

- [x] API가 내려주는 첫 5개의 이미지를 슬라이드 형태로 보여주는 이미지 캐러셀 구현
- [x] 화살표 버튼을 통해 이미지 넘기기
- [x] 일정 시간이 지나면 자동으로 다음 이미지로 넘어가기
- [x] 현재 보여지는 이미지 도트 표시 추가
- [x] 캐러셀 라이브러리 사용하지 않기

### 세로 이미지 갤러리

- [x] 나머지 25장의 이미지들을 세로 스크롤 방식으로 로드하여 표시
- [x] 각 줄당 이미지는 3개씩, 총 9줄로 구현
- [x] 스크롤 최하단에 닿으면 다음 30장의 랜덤 이미지를 추가

### 모달

- [x] 갤러리의 이미지를 클릭하면 모달창을 띄워 이미지를 확대
- [x] 닫기 버튼 또는 모달 외의 영역을 누르면 해당 모달이 닫힘

### 기타

- [x] 캐러셀 이미지 전환시 애니메이션 활용
- [x] 캐러셀 이미지 좌우 이동을 드래그로 가능
- [x] 반응형으로 구현

<br/>

## Issue

1. `https://api.unsplash.com/photos/random` API 호출 시, 페이지를 변경해도 같은 아이디를 가진 아이템이 중복해서 나타나는 이슈가 있었습니다. 해당 API 특성상 랜덤하게 불러오는 사진으로 인해 불가피하기 필터링을 하여 무한 스크롤을 구현했습니다.

   ```tsx
   // Home.tsx
   const response = await fetch(
     `https://api.unsplash.com/photos/random/?client_id=${
       import.meta.env.VITE_ACCESS_KEY
     }&count=30&page=${page}`
   );
   const result = (await response.json()) as ImageProps[];
   const filteredImages = result.filter(
     (image) => !images.some((item) => item.id === image.id)
   );
   setImages((prev) => [...prev, ...filteredImages]);
   ```

2. `React`와 `vite`로만 구현했지만 svg컴포넌트를 사용, 마우스 호버시 svg의 색상 변경을 위해 `vite-plugin-svgr`패키지를 사용했습니다. 해당 패키지 사용시 타입스크립트 오류가 발생하여 타입스크립트가 패키지 유형을 인식할 수 있도록 `tsconfig`의 `compilerOptions`에 아래 코드를 적용했습니다.

   ```tsx
   // vite.config.ts
   import svgr from "vite-plugin-svgr";
   export default defineConfig({
     plugins: [react(), svgr()],
   });
   ```

   ```tsx
   // tsconfig.app.json
   {
     "compilerOptions": {
       ...
       "types": ["vite-plugin-svgr/client"]
     },

   }
   ```
