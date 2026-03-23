import axios, { AxiosError } from 'axios';
import type {
  FeasibilityResponse,
  GenerateRequest,
  MealPlanResponse,
  Meal,
  SwapRequest,
  RecipeResponse,
} from './types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120_000,
});

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (data && typeof data === 'object' && 'error' in data) {
      return String(data.error);
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. The server may be busy — please try again.';
    }
    if (!error.response) {
      return 'Cannot connect to the server. Please check your connection.';
    }
    return `Server error (${error.response.status}). Please try again.`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred.';
}

export async function validateBudget(
  params: GenerateRequest
): Promise<FeasibilityResponse> {
  try {
    const response = await api.post<FeasibilityResponse>(
      '/mealplan/validate',
      params
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function generateMealPlan(
  params: GenerateRequest
): Promise<MealPlanResponse> {
  try {
    const response = await api.post<MealPlanResponse>(
      '/mealplan/generate',
      params
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function swapMeal(params: SwapRequest): Promise<Meal> {
  try {
    const response = await api.post<{ meal: Meal }>('/mealplan/swap', params);
    return response.data.meal;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function getRecipe(
  dishName: string,
  familySize: number,
  ingredients: string[]
): Promise<RecipeResponse> {
  try {
    const encodedName = encodeURIComponent(dishName);
    const params: Record<string, string> = {
      family_size: String(familySize),
    };
    if (ingredients.length > 0) {
      params.ingredients = ingredients.join(',');
    }
    const response = await api.get<RecipeResponse>(
      `/recipe/${encodedName}`,
      { params }
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
