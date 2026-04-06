import type { FilterItem, Todo } from "../types/types";

const TASKS_URL = "http://localhost:3001/tasks";
const FILTERS_URL = "http://localhost:3001/filters";

export async function getTasks() {
    try {
        const response = await fetch(TASKS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        console.log("Полученные задачи:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при получении задач:", error);
        return null;
    }
}

export async function getFilters() {
    try {
        const response = await fetch(FILTERS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FilterItem[] = await response.json();
        console.log("Полученные фильтры:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при получении фильтров:", error);
        return null;
    }
}

export async function addTask(newTask: Omit<Todo, "id">) {
    try {
        const response = await fetch(TASKS_URL, {
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

export async function updateTask(id: string, updates: Partial<Omit<Todo, "id">>) {
    try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
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

export async function deleteTask(id: string) {
    try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
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
