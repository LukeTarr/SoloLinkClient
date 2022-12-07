type ContentDTO = {
    username?: string,
    categoryDtos?: [
        {
            categoryId: number,
            userId: number
            title: string
        }
    ],
    linkDtos?: [{
        linkId: number,
        categoryId: number,
        url: string,
        title: string
    }]
    ,
    title?: string,
    Error?: string
};

export default ContentDTO;