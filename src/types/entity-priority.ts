export const EntityPriorities = [1, 2, 3] as const

export type TEntityPriority = (typeof EntityPriorities)[number]
