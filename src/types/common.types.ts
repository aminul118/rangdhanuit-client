export type TSearchParams = Record<string, string | string[] | undefined>;

export type TSearchParamsPromise = Promise<TSearchParams>;

export type TParamsPromise<T = { id: string }> = Promise<T>;

export type TSlugParams = { slug: string };

export interface IPageProps<P = Record<string, string>, S = TSearchParams> {
  params: Promise<P>;
  searchParams: Promise<S>;
}

export type ISlugPageProps = IPageProps<TSlugParams>;
