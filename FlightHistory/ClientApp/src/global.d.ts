declare module '*.module.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare var USE_SAMPLE_DATA: boolean;