import serverFetch from "@/lib/server-fetch";
import { ICreatePortfolio, IPortfolio } from "@/types";

export const createPortfolio = async (payload: ICreatePortfolio) => {
  return await serverFetch.post('/portfolios/create-portfolio', {
    body: JSON.stringify(payload),
  });
};

export const getPortfolios = async (query?: Record<string, string>) => {
  return await serverFetch.get('/portfolios', { query });
};

export const updatePortfolio = async (id: string, payload: Partial<IPortfolio>) => {
  return await serverFetch.put(`/portfolios/${id}`, {
    body: JSON.stringify(payload),
  });
};

export const deletePortfolio = async (id: string) => {
  return await serverFetch.delete(`/portfolios/${id}`);
};
