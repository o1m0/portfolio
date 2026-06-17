import { getWorks } from "@/lib/api"
import { Work } from "@/types"

export default async function WorkssPage() {
    const works: Work[] = await getWorks()

        return (
        <div>
            <h1>作品一覧</h1>
            {works.map((work) => (
                <div key={work.ID}>
                    <h2>{work.Title}</h2>
                    <p>{work.Description}</p>
                </div>
            ))}
        </div>
    )
}