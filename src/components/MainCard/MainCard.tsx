import React from 'react'

interface MainCardProps {
}

const MainCard = (props: React.PropsWithChildren<MainCardProps>) => {
    return (
        <div
            className="flex flex-col justify-center items-center m-16 p-16 bg-gray-400 rounded-3xl text-center w-full md:w-1/2 shadow-2xl">
            {props.children}
        </div>
    );
}

export default MainCard