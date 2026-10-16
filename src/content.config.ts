import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 項目の意味は docs/design.md の「5. データモデル」を参照
const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    status: z.enum(['開発中', '運用中', '終了']),
    startedAt: z.coerce.date(),
    stack: z.array(z.string()),
    githubUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    relatedWork: reference('works').optional(),
  }),
});

export const collections = { works, blog };
