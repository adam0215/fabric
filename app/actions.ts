'use server'

import { createClient } from '@libsql/client'
import { ExtendedColorsSchemaType, ExtendedColorsZodSchema } from './dbSchema'

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function getAllColors(): Promise<ExtendedColorsSchemaType> {
    const { rows } = await client.execute({
        sql: 'SELECT colors.*, color_categories.name AS color_category_name FROM colors JOIN color_categories ON colors.color_category_id = color_categories.id LIMIT 10;',
        args: {},
    })

    return ExtendedColorsZodSchema.parse(rows)
}
