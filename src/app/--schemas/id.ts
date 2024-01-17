export const id_Schema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" }
  },
} as const;

export interface Id_Interface {
  id: string;
}
