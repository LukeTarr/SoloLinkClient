export type CategoryDTO = {
        categoryId: number,
        userId: number
        title: string
}

export type LinkDTO = {
        linkId: number,
        categoryId: number,
        url: string,
        title: string
}

export type ContentDTO = {
    username?: string,
    categoryDtos?: [CategoryDTO],
    linkDtos?: [LinkDTO],
    title?: string,
    Error?: string
};