import { useQuery } from 'react-query';
import { useMutation } from 'react-query';

import { Url } from './UrlBackServices';

export function useListarTarea() {
  //  console.log(`http://127.0.0.1:8001/api//tasks`);
  // console.log(Url);
  return useQuery('listarTarea', async () => {

    const response = await fetch(`${Url}tasks`, {
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
      const response = await fetch(`${Url}tasks`, {
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

export function useDeleteTask() {
  return useMutation(
    async (taskId) => {
      const response = await fetch(`${Url}tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),

      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea en la API');
      }

      // Devuelve un objeto para manejar la respuesta del servidor
      return { success: true, message: 'Tarea eliminada con éxito' };
    },
    {
    }
  );
}

export function useUpdateTask() {
  return useMutation(
    async (taskId) => {
      const response = await fetch(`${Url}tasks/${taskId}`
        , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskId),

        });
      console.log("response");
      console.log(response);

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea en la API');
      }

      // Devuelve un objeto para manejar la respuesta del servidor
      return { success: true, message: 'Tarea actualizada con éxito' };
    },
    {
    }
  );
}

