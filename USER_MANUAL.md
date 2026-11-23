# User Manual

## 1. Login Page

![Login Page](file:///C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_E3/huertohogar-app/src/assets/login.png)

**Número 1** – *Login Page*.

- **Título**: Login Interface.
- **Imagen**: Shows the login form with fields for username and password.
- **Nota**: The token is stored in `localStorage` after successful authentication.

## 2. Product List

![Product List](file:///C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_E3/huertohogar-app/src/assets/product-list.png)

**Número 2** – *Product List View*.

- **Título**: Lista de productos.
- **Imagen**: Displays the product cards with name, price, and stock.
- **Nota**: Only authenticated users can see this page.

## 3. Product Form (Create / Edit)

![Product Form](file:///C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_E3/huertohogar-app/src/assets/product-form.png)

**Número 3** – *Formularío de Producto*.

- **Título**: Crear / Editar producto.
- **Imagen**: Shows the reusable form used for both creating and editing products (`POST` and `PUT`).
- **Nota**: Uses `useParams` to detect edit mode and pre‑populate fields.

## 4. 401 Error Handling

![401 Error](file:///C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_E3/huertohogar-app/src/assets/401.png)

**Número 4** – *Manejo de sesión expirada*.

- **Título**: Redirección tras 401.
- **Imagen**: The interceptor clears the session and redirects to `/login`.
- **Nota**: Ensures the user must re‑authenticate.
