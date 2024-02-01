import { useQuery } from 'react-query';
import { useMutation } from 'react-query';

import { Url } from './UrlBackServices';

// Función personalizada que utiliza useQuery
export function useListarTarea() {
//  console.log(`http://127.0.0.1:8001/api//tasks`);
  return useQuery('listarTarea', async () => {
    const response = await fetch(`http://127.0.0.1:8001/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }

    return response.json();
  });
}


export function useCreateTask() {
  return useMutation(
    async (data) => {
      const response = await fetch(`http://127.0.0.1:8001/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos en la API');
      }

      return response.json();
    },
    {
    }
  );
}
