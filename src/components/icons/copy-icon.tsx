import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function CopyIcon(props: Props) {
    const { color = "#344054", size = 20, className } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M13.3327 10.574V15.0656C13.3327 17.0156 12.0327 18.3073 10.091 18.3073H4.90768C2.96602 18.3073 1.66602 17.0156 1.66602 15.0656V8.59063C1.66602 6.64063 2.96602 5.34896 4.90768 5.34896H8.09935M13.3327 10.574C13.3327 9.71563 12.991 8.89062 12.3827 8.28229L10.391 6.29896C9.78268 5.69062 8.95768 5.34896 8.09935 5.34896M13.3327 10.574V14.6073H15.091C17.0327 14.6073 18.3327 13.3073 18.3327 11.3656V6.87396C18.3327 6.01563 17.991 5.19063 17.3827 4.58229L15.391 2.59062C14.7827 1.98229 13.9577 1.64062 13.0993 1.64062H9.90768C7.96602 1.64062 6.66602 2.94063 6.66602 4.88229V5.34896H8.09935"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
