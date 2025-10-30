import { baseApi } from "./baseApi";

export type Asset = { id: string; name: string; status: string; type: string };

export type PageParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  searchQuery?: string;
  filters?: Record<string, string | number | boolean | undefined>;
};

export type PageResult<T> = {
  data: T[];
  total?: number;
  page: number;
  limit: number;
};

const buildQuery = (pageParams: PageParams = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortDir,
    searchQuery,
    filters,
  } = pageParams;
  const params: Record<string, any> = { _page: page, _limit: limit };
  if (sortBy) params._sort = sortBy;
  if (sortDir) params._order = sortDir;
  if (searchQuery) params.q = searchQuery;
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "")
        params[key] = value;
    });
  }
  return params;
};

const assetTags = {
  list: () => [{ type: "Assets" as const, id: "LIST" }],
  detail: (id: string) => [{ type: "Asset" as const, id }],
};

const transformPagedResponse = <T>(
  response: T[],
  meta: any,
  arg: PageParams = {}
): PageResult<T> => {
  const { page = 1, limit = 10 } = arg;
  const total = Number(
    meta?.response?.headers.get("X-Total-Count") ?? undefined
  );
  return { data: response, total, page, limit };
};

const providesListTags = <T extends { id: string }>(
  result: PageResult<T> | undefined
) => [
  ...assetTags.list(),
  ...(result?.data?.map(({ id }) => ({ type: "Asset" as const, id })) ?? []),
];

export const assetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAssets: builder.query<PageResult<Asset>, PageParams | undefined>({
      query: (pageParams) => ({
        url: "/assets",
        params: buildQuery(pageParams),
      }),
      transformResponse: transformPagedResponse,
      providesTags: providesListTags,
    }),
    getAsset: builder.query<Asset, string>({
      query: (id) => ({ url: `/assets/${id}` }),
      providesTags: (_result, _error, id) => assetTags.detail(id),
    }),
    createAsset: builder.mutation<
      Asset,
      Omit<Asset, "id"> & Partial<Pick<Asset, "id">>
    >({
      query: (body) => ({ url: "/assets", method: "POST", body }),
      invalidatesTags: assetTags.list,
    }),
    updateAsset: builder.mutation<Asset, { id: string; patch: Partial<Asset> }>(
      {
        query: ({ id, patch }) => ({
          url: `/assets/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          ...assetTags.detail(id),
          ...assetTags.list(),
        ],
      }
    ),
    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({ url: `/assets/${id}`, method: "DELETE" }),
      invalidatesTags: assetTags.list,
    }),
  }),
});

export const {
  useListAssetsQuery,
  useGetAssetQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetsApi;
