# RecipesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

- Run `ng serve` or `npm start` for a dev server.
- Navigate to `http://localhost:4200/`. 

## Configuration

1. Add `environment.ts` and `environment.prod.ts` files to `src/environments` folder.
2. Fill `environament.ts` like this:  
```typescript
    export const environment = {  
        production: false,
        isAdminApp: false,  
        apiUrl: 'http://localhost:3000'  
    };
```
3. Fill `environment.prod.ts` like this:
```typescript
    export const environment = {  
        production: true,
        apiUrl: 'your api production url'
    };
```
