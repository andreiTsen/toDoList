import type { Todo } from "../types/types";

const BASE_URL = "http://localhost:3001/tasks";

export async function getTasks() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        console.log("Полученные данные:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return null;
    }
}

export async function addTask(newTask: Omit<Todo, "id">) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo = await response.json();
        console.log("Добавленная задача:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        return null;
    }
}

export async function updateTask(id: number, updates: Partial<Omit<Todo, "id">>) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo = await response.json();
        console.log("Обновленная задача:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        return null;
    }
}

export async function deleteTask(id: number) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        return false;
    }
}
