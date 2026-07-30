import WorkForm from "@/components/admin/WorkForm"

export default function NewWorkPage() {
  return (
    <div>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        新しいWork
      </h1>
      <WorkForm />
    </div>
  )
}
