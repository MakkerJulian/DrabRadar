import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
type CompareProps = {
    title: string;
    value: string;
    children?: React.ReactNode;
    color?: string;
    overflow?: string;
}
export const CompareCard = ({ title, value, children, color, overflow }: CompareProps) => {
    return (
        <Card sx={{ backgroundColor: color ?? "#c9f0b3", margin: "10px", height: '10vh', width: "20vw", overflow:overflow ?? "hidden"}}>
            <CardContent sx={{ alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5"> {title}:</Typography>
                <Typography variant="h6"> {value}</Typography>
                {children}
            </CardContent>
        </Card>
    )
}