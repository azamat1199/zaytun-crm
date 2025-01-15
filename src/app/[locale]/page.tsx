"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import HomeScreen from "@/components/home/HomeScreen";

export default function Home() {
    return (
        <ContentLayout title="Продукты">
            <HomeScreen />
        </ContentLayout>
    );
}
