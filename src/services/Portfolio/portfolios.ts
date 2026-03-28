import serverFetch from "@/lib/server-fetch";

export const createPortfolio = async (payload: FormData) => {
  return await serverFetch.post('/portfolios/create-portfolio', {
    body: payload,
  });
};

export const getPortfolios = async (query?: Record<string, string>) => {
  return await serverFetch.get('/portfolios', { query });
};

export const getPortfolioById = async (id: string) => {
  return await serverFetch.get(`/portfolios/${id}`);
};

export const updatePortfolio = async (id: string, payload: FormData) => {
  return await serverFetch.put(`/portfolios/${id}`, {
    body: payload,
  });
};

export const deletePortfolio = async (id: string) => {
  return await serverFetch.delete(`/portfolios/${id}`);
};
