import { getWork } from '@/lib/api'
import { Work } from '@/types'

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const work: Work = await getWork(Number(id))
    
    return (
        <div>
            <h1>{work.Title}</h1>
            <p>{work.Description}</p>
        </div>
    )
}