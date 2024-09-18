const info = (message:string, data:any = '') => {
    console.log(`[INFO] ${message}`, data);
};

const error = (message:string, error:any) => {
    console.error(`[ERROR] ${message}`, error);
};

export default {
    info,
    error,
};
