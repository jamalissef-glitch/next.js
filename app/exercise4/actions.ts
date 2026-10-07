'use server';

import { revalidatePath } from 'next/cache';

export interface Todo {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormState {
  success?: boolean;
  message?: string;
  error?: string;
}

// Simulated In-Memory Database
let todosDB: Todo[] = [
  {
    id: '1',
    title: 'Learn Next.js 15 Server Actions',
    priority: 'high',
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
];

// 1. Action with Form State (prevState is strongly typed without `any`)
export async function createTodoAction(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const title = formData.get('title') as string | null;
  const rawPriority = formData.get('priority') as string | null;
  
  const priority: 'low' | 'medium' | 'high' = 
    rawPriority === 'low' || rawPriority === 'high' ? rawPriority : 'medium';

  if (!title || title.trim().length === 0) {
    return { success: false, error: 'Todo title cannot be empty!' };
  }

  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    priority,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todosDB.unshift(newTodo);
  revalidatePath('/exercise4');
  return { success: true, message: 'Todo added successfully!' };
}

// 2. Search & Filter Action
export async function getTodosAction(
  searchQuery: string = '',
  statusFilter: string = 'all'
): Promise<Todo[]> {
  let filtered = [...todosDB];

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i');
    filtered = filtered.filter((todo) => regex.test(todo.title));
  }

  if (statusFilter === 'completed') {
    filtered = filtered.filter((todo) => todo.completed);
  } else if (statusFilter === 'active') {
    filtered = filtered.filter((todo) => !todo.completed);
  }

  const priorityMap: Record<'low' | 'medium' | 'high', number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  filtered.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);

  return filtered;
}

// Toggle Single Status Action
export async function toggleTodoAction(id: string): Promise<void> {
  todosDB = todosDB.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
      : todo
  );
  revalidatePath('/exercise4');
}

// 4. Bulk Operations Actions
export async function bulkDeleteAction(ids: string[]): Promise<void> {
  todosDB = todosDB.filter((todo) => !ids.includes(todo.id));
  revalidatePath('/exercise4');
}

export async function bulkToggleStatusAction(
  ids: string[],
  completed: boolean
): Promise<void> {
  todosDB = todosDB.map((todo) =>
    ids.includes(todo.id)
      ? { ...todo, completed, updatedAt: new Date() }
      : todo
  );
  revalidatePath('/exercise4');
}