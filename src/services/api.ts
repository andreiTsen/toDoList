import type { Todo } from "../types/types";
const BASE_URL = 'myProjectBD.json';

export async function getTasks() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: { tasks: Todo[] } = await response.json();
        console.log('Полученные данные:', data.tasks);
        return data.tasks;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}
