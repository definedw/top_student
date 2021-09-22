# Top Student Management System By Vue3

### Start

```
# init project
npm install

# development mode
npm run dev

# build mode
npm run build
```

### Module Inlcude

- Vue-Router
- Vuex
- Axios
- Element-Plus

### Dynamic Import Plugin

- vite-plugin-style-import
- vite-plugin-babel-import

### Style Pre-Loader

- Scss
- Postcss && Autoprefixer

### Project Structure

```
   src
    |- assets
         |- fonts
         |- icons
         |- images
         |- styles
    |- components
    |- store
    |- utils
    |- views
    \- App.vue
```

### Server Status Code Table

| Code | Resoponse         |
| ---- | ----------------- |
| 204  | OK                |
| 401  | No Premission     |
| 403  | Invalid Token     |
| 404  | Not Found         |
| 406  | Invalid Operation |
| 500  | System Error      |

### Project optimize

- gzip
- jsx

### Issue

- vite-plugin-babel-import

```
  dynamic import css style error

  Error: [Vite-plugin-babel-import]options.map is not function
```

- vite can't watch `LeftSidebar.vue` file on change.

- Vite components onload problem.
