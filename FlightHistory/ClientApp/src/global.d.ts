/* eslint-disable no-var, @typescript-eslint/naming-convention */

declare module "*.module.scss" {
    const content: { [className: string]: string };
    export default content;
}

declare var USE_SAMPLE_DATA: boolean;
declare var USE_CONSOLE_LOGGING: boolean;
