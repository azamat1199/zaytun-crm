export interface ProcessSettingsCreateDto {
    role: {
        id: string;
    };
    processTemplate:{id:string};
    create: boolean;
    pause: boolean;
    reject: boolean;
}
