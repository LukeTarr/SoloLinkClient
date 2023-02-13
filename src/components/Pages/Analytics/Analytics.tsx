import React, {useState} from "react";
import {useQuery} from "react-query";
import {useRecoilValue} from "recoil";
import {tokenAtom} from "../../../stateAtoms";
import AnalyticsDTO from "../../../data/AnalyticsDTO";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type DataPoint = {
    views: number
}

const Analytics = () => {
    const [content, setContent] = useState({} as AnalyticsDTO);
    const [error, setError] = useState("");
    const [weeklyRange, setWeekylRange] = useState()
    const token = useRecoilValue(tokenAtom);


    const contentQuery = useQuery("analytics", getAnalytics, {
            refetchOnWindowFocus: false,
            onSettled: (res) => {

                // Custom Error
                if (res?.error) {
                    setError(res.error);
                    return;
                }
                // Generic Server Error
                if (res?.title) {
                    setError(res.title);
                    return;
                }
                // Success
                if (res?.username) {
                    setContent(res);
                    return;
                }
            },
        }
    );

    async function getAnalytics(): Promise<AnalyticsDTO> {
        let res;
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/PageView/GetMyAnalytics`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch {
            return {title: "Server Error"} as AnalyticsDTO;
        }

        return await res.json();
    }

    const renderGraph = () => {

        let data = [] as any;

        content.buckets.map((b, i) => {
            if (new Date(b.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                data.push({name: b.date.split("T")[0], views: b.totalViews, uv: i, pv: i});
            }

        })

        let sorted = data.sort((a: { name: string }, b: { name: string }) => {
            return new Date(b.name).valueOf() - new Date(a.name).valueOf();
        }).reverse();

        return (
            <div className="w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sorted}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="views" fill="#313f85"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

        )

    }

    const totalViews = () => {
        let sum = 0;
        content.buckets.map(b => {
            if (b.totalViews) {
                sum += b.totalViews
            }
        })
        return sum;
    }

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 rounded-3xl shadow-2xl">

                {content?.username ? (
                    <>
                        <h2 className="text-3xl">{content.username}'s Analytics</h2>
                        <div className="w-full"></div>
                        <div>
                            <h2 className="text-center mt-10 mb-10 text-2xl">Weekly View Graph</h2>
                        </div>
                        {renderGraph()}

                        <div>
                            <h2 className="text-center mt-10 mb-10 text-2xl">Total Page Views: {totalViews()}</h2>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl">{error}</h2>
                    </>
                )}
            </div>
        </div>
    );
};

export default Analytics;
