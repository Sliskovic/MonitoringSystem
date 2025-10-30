export const statusMap: { [key: string]: { color: string; text: string } } = {
  active: { color: "green", text: "Active" },
  warning: { color: "gold", text: "Warning" },
  critical: { color: "red", text: "Critical" },
  inactive: { color: "default", text: "Inactive" },
};
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_LIMIT = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
