import React, {useState} from 'react'
import MainCard from "../../MainCard/MainCard";

const About = () => {


    return (
        <div className="flex justify-center items-center">
            <MainCard>
                <h1 className="text-3xl mb-4">About SoloLink</h1>
                <h3>
                    SololLink is an open source project made by <a
                    className="text-blue-800 underline"
                    href={"https://github.com/LukeTarr"}>Luke Tarr.</a>

                    <p className="mt-4">SoloLink is made with:
                        <ul>
                            <li>
                                - .NET 7, C#, ASP .NET Core
                            </li>
                            <li>
                                - Docker
                            </li>
                            <li>
                                - PostgreSQL
                            </li>
                            <li>
                                - React, Vite, Tailwind
                            </li>
                            <li>
                                - Digital Ocean + Netlify
                            </li>
                        </ul>
                    </p>

                    <p className="mt-4">
                        Front-end source code can be found <a
                        className="text-blue-800 underline"
                        href="https://github.com/LukeTarr/SoloLinkClient">here.</a> As well as the server-side source
                        code <a
                        className="text-blue-800 underline"
                        href="https://github.com/LukeTarr/SoloLinkAPI">here.</a>

                    </p>

                    <p className="mt-4">
                        This project was made to expand my technical skillset,
                        but it is 100% functional as a way to consildate all of your
                        useful links for a bio on social media or otherwise.
                    </p>


                </h3>
            </MainCard>
        </div>
    );
}

export default About