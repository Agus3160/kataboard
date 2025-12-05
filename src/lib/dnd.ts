import type { UniqueIdentifier } from "@dnd-kit/core";

export type PrefixType = "col" | "task" | "taskContainer";

export const toDndId = (id: number, prefix: PrefixType): string => {
  return `${prefix}_${id}`;
};

export const parseDndId = (id: UniqueIdentifier): [number, PrefixType] => {
  const parsedId = id as string;
  const [type, rawId] = parsedId.split("_");
  if (!type || !rawId) {
    throw new Error(`Invalid DnD id format: ${id}. Expected "type:id"`);
  }
  return [parseInt(rawId), type as PrefixType];
};
