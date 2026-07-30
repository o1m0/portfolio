import { notFound } from "next/navigation"
import WorkForm from "@/components/admin/WorkForm"
import { getWork } from "@/lib/content"

export default async function EditWorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) notFound()

  return (
    <div>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        {work.title} を編集
      </h1>
      <WorkForm work={work} />
    </div>
  )
}
