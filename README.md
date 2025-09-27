# Proyecto React + TypeScript

## LIBRERIAS GENERALES
1. AXIOS - CONSUMO DE API 
2. MATERIAL UI - LIBRERIA DE COMPONENTES
3. ZUSTAND - CONTROL GLOBAL DE ESTADO
4. Tanstack Query - Usado para gestionar las peticiones al api, carga, errores, y obtencion de datos
5. Apex Charts - Renderizar graficos

## Estructura general

El proyecto está organizado en carpetas por funcionalidad:

- **components/**: Componentes reutilizables y específicos.
- **hooks/**: Hooks personalizados para lógica de negocio y API.
- **services/**: Funciones para interactuar con API usando Axios.
- **pages/**: Vistas principales de la aplicación.
- **types/**: Definiciones TypeScript para tipado.
- **utils/**: Funciones utilitarias, helpers, formateadores entre otras cosas.
- **context/**: Contextos globales para manejo de estado.
- **store/**: Store de zustand para manejo global.
- **theme/**: Tema de materiaul ui.

## Flujo de datos con Axios

Las llamadas a la API se gestionan en la carpeta `services/` usando [Axios](https://axios-http.com/):

- Cada servicio exporta funciones para interactuar con endpoints específicos.
- Ejemplo básico de uso:

```typescript
// services/auth/authService.tsx
import axios from 'axios';

export const login = async (credentials: LoginPayload) => {
  const response = await axios.post('/api/login', credentials);
  return response.data;
};
```

## Uso de React Query (`useQuery` y `useMutation`)

Para el manejo de datos asíncronos y cache, se utiliza [React Query](https://tanstack.com/query/latest/docs/framework/react/overview):

- **useQuery**: Para obtener datos (GET).
- **useMutation**: Para enviar datos (POST, PUT, DELETE).

Ejemplo de uso de `useQuery`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { getUser } from 'services/auth/authService';

const { data, isLoading, error } = useQuery(['user', userId], () => getUser(userId));
```

Ejemplo de uso de `useMutation`:

```typescript
import { useMutation } from '@tanstack/react-query';
import { login } from 'services/auth/authService';

const mutation = useMutation(login);

const handleLogin = (credentials) => {
  mutation.mutate(credentials);
};
```

## Validaciones con Zod

Las validaciones de formularios se realizan con [Zod](https://zod.dev/):

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

## Buenas prácticas

- Mantén los componentes pequeños y reutilizables.
- Usa tipado explícito en props y estados.
- Centraliza la lógica de negocio en hooks y servicios.
- Documenta funciones y componentes complejos.
- Maneja errores y estados de carga en la UI.

## Primeros pasos para nuevos desarrolladores

1. Instala dependencias:  
   `npm install`
2. Inicia el proyecto:  
   `npm run dev`
3. Revisa los servicios en `services/` para entender el flujo de datos.
4. Consulta los hooks en `hooks/` para lógica de negocio y API.
5. Explora los componentes en `components/` para la UI.

---

