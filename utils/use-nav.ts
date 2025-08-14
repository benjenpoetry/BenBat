import { DefaultTheme } from 'vitepress';
import { Struct } from './use-struct';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getTextByCode } from './use-md';

export function genNav (structs: Struct[]): DefaultTheme.NavItem[] {
    const nav: DefaultTheme.NavItem[] = [];
    for (let i = 0; i < structs.length; i++) {
        const struct = structs[i];
        if (struct.items) {
            continue;
        }
        const file = struct.link.slice(1);
        const link = struct.link.slice(0, -3);
        if (link.includes('-')) {
            continue;
        }
        const md = readFileSync(resolve(__dirname, '..', file)).toString();
        const text = getTextByCode(md);
        nav.push({ link, text });
    }
    return nav;
}
