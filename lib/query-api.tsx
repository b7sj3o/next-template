import { Article, FormRequest, Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// Статьи
  export function useGetArticles() {
    return useQuery<Article[]>({
      queryKey: ['articles'],
      queryFn: async () => {
        const articles = await fetch('/api/v1/articles');
        const data = await articles.json();
        return data.data;
      }
    })
  }

// Проекты
export function useGetProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const articles = await fetch('/api/v1/projects');
      const data = await articles.json();
      return data.data;
    }
  })
}

// Заявки
export function useGetRequests() {
  return useQuery<FormRequest[]>({
    queryKey: ['requests'],
    queryFn: async () => {
      const articles = await fetch('/api/v1/requests');
      const data = await articles.json();
      return data.data;
    }
  })
}