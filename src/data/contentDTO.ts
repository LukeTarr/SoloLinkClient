export type contentDTO = {
    username?: string,
    categoryDtos?: [
        {
            categoryID: number,
            userId: number
            title: string
        }
    ],
    linkDtos?: [{
        linkId: number,
        categoryID: number,
        url: string,
        title: string
    }]
    ,

    title?: string,
    Error?: string
}