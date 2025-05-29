// src/lib/utils/sortFunctions.ts
import type { CollectionEntry } from "astro:content";

// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).valueOf() -
      new Date(a.data.date && a.data.date).valueOf(),
  );
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { data: { weight: any } }) => item.data.weight,
  );
  const withoutWeight = array.filter(
    (item: { data: { weight: any } }) => !item.data.weight,
  );
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) =>
      a.data.weight - b.data.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};

// NUEVA FUNCIÓN: sort by order field (GENÉRICA PARA CUALQUIER COLLECTION CON 'order')
// export const sortByOrder = <
//   T extends keyof import("astro:content").DataEntryMap,
// >(
//   collection: CollectionEntry<T>[],
// ) => {
//   const sortedCollection = [...collection].sort(
//     (a: CollectionEntry<T>, b: CollectionEntry<T>) => {
//       const orderA = (a.data as { order?: number }).order;
//       const orderB = (b.data as { order?: number }).order;

//       if (orderA === orderB) return 0;
//       if (orderA === undefined) return 1; // undefined al final
//       if (orderB === undefined) return -1; // undefined al final

//       return orderA - orderB;
//     },
//   );
//   return sortedCollection;
// };

// Sort by 'order' field, specific for "servicios" collection
export const sortByOrder = (
  collection: CollectionEntry<"servicios">[],
): CollectionEntry<"servicios">[] => {
  // Especificar el tipo de retorno
  const sortedCollection = [...collection].sort(
    (a: CollectionEntry<"servicios">, b: CollectionEntry<"servicios">) => {
      const orderA = a.data.order;
      const orderB = b.data.order;

      if (orderA === orderB) return 0;
      if (orderA === undefined) return 1; // undefined items go to the end
      if (orderB === undefined) return -1; // undefined items go to the end

      return orderA - orderB;
    },
  );
  return sortedCollection;
};
