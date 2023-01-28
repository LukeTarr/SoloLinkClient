type ViewBucket = {
    date: string
    totalViews?: number
}

type AnalyticsDTO = {
    username: string
    buckets: ViewBucket[]
    title?: string,
    error?: string
}


export default AnalyticsDTO;