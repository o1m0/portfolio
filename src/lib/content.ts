import { getCollection } from 'astro:content';

// 作品：order が小さい順 → 開始日が新しい順（getCollection の順番は保証されないので必ず並べる）
export async function getWorks() {
  return (await getCollection('works')).sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      b.data.startedAt.valueOf() - a.data.startedAt.valueOf(),
  );
}

// 記事：新しい順。本番（npm run build）では draft: true を除き、開発サーバーでは下書きも出す
export async function getPosts() {
  return (await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}
