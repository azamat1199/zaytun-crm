import React, { useEffect } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import "./underline-tabs.css";
import cx from "classnames";

const UnderlineTabs = ({ data, onChange, color = "primary", ...props }) => {
    const [activeTab, setActiveTab] = React.useState(data[0]);

    useEffect(() => {
        if (onChange) onChange(activeTab);
    }, [activeTab]);

    return (
        <Tabs {...props} value={activeTab.value}>
            <TabsHeader
                className="underline-tabs-header"
                indicatorProps={{
                    className: `border-${color} underline-tabs-header-indicator`,
                }}
            >
                {data.map((item) => (
                    <Tab
                        key={item.value}
                        value={item.value}
                        onClick={() => setActiveTab(item)}
                        className={cx(
                            "text-sm py-[11px] px-0 min-w-max w-auto transition ease",
                            {
                                [`text-${color} font-semibold`]:
                                    activeTab.value === item.value,
                            },
                        )}
                    >
                        {item.label}
                    </Tab>
                ))}
                <div className="w-full absolute border-b-2 bottom-1" />
            </TabsHeader>
        </Tabs>
    );
};

export default UnderlineTabs;
