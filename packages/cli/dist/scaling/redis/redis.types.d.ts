export type RedisClientType = N8nRedisClientType | BullRedisClientType;
type N8nRedisClientType = 'subscriber(n8n)' | 'publisher(n8n)' | 'cache(n8n)';
type BullRedisClientType = 'subscriber(bull)' | 'client(bull)' | 'bclient(bull)';
export {};
