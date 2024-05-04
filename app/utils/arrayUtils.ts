export function groupArrayOfObjects<T, K extends keyof any>(
    array: T[],
    key: (o: T) => K,
) {
    return array.reduce(
        (groups, item) => {
            ;(groups[key(item)] ||= []).push(item)
            return groups
        },
        {} as Record<K, T[]>,
    )
}
