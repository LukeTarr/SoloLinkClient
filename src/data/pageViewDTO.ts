type ViewDTO = {
    userId: number,
    viewDateTime: string 
}

type AnalyticsDTO = {
    username?: string,
    views?: ViewDTO[],
    title?: string,
    Error?: string
}

export default AnalyticsDTO;